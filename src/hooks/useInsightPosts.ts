import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type InsightPost = Tables<"insight_posts"> & {
  cta_text?: string | null;
  cta_url?: string | null;
  cta_enabled?: boolean | null;
};

export function useInsightPosts() {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    const now = new Date().toISOString();
    
    const { data, error: fetchError } = await supabase
      .from("insight_posts")
      .select("*")
      .eq("status", "published")
      .not("published_at", "is", null)
      .lte("published_at", now)
      .order("published_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setPosts([]);
    } else {
      setPosts((data as InsightPost[]) || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("insight_posts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "insight_posts",
        },
        () => {
          // Refetch on any change to ensure publish rules are applied
          fetchPosts();
        }
      )
      .subscribe();

    // Fallback: refetch every 30 seconds
    const interval = setInterval(fetchPosts, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
}

export function useInsightPost(slug: string | undefined) {
  const [post, setPost] = useState<InsightPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    const fetchPost = async () => {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from("insight_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .not("published_at", "is", null)
        .lte("published_at", now)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
        setPost(null);
      } else {
        setPost(data as InsightPost);
        setNotFound(false);
      }
      setLoading(false);
    };

    fetchPost();

    // Subscribe to realtime updates for this specific post
    const channel = supabase
      .channel(`insight_post_${slug}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "insight_posts",
          filter: `slug=eq.${slug}`,
        },
        () => {
          fetchPost();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  return { post, loading, notFound };
}
