import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type InsightPost = Tables<"insight_posts">;

export function useInsights() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["insights"],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from("insight_posts")
        .select("*")
        .eq("status", "published")
        .not("published_at", "is", null)
        .lte("published_at", now)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as InsightPost[];
    },
    refetchInterval: 30000, // Fallback: refresh every 30 seconds
  });

  // Subscribe to realtime updates
  useEffect(() => {
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
          // Invalidate and refetch on any change
          queryClient.invalidateQueries({ queryKey: ["insights"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
}

export function useInsightBySlug(slug: string) {
  return useQuery({
    queryKey: ["insight", slug],
    queryFn: async () => {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from("insight_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .not("published_at", "is", null)
        .lte("published_at", now)
        .maybeSingle();

      if (error) throw error;
      return data as InsightPost | null;
    },
    enabled: !!slug,
  });
}
