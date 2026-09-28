import { supabase } from "@/integrations/supabase/client";

export async function fetchPublishedInsights() {
  const { data, error } = await supabase
    .from("insight_posts")
    .select("id, slug, title, excerpt, featured_image_url, reading_time, published_at")
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export type InsightSummary = Awaited<ReturnType<typeof fetchPublishedInsights>>[number];
