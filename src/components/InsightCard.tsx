import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type InsightPost = Tables<"insight_posts">;

interface InsightCardProps {
  post: InsightPost;
  index: number;
}

export function InsightCard({ post, index }: InsightCardProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link
        to={`/insights/${post.slug}`}
        className="block h-full"
      >
        <div className="h-full border border-border/50 rounded-xl bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Thumbnail */}
          {post.featured_image_url && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Metadata */}
            <div className="flex items-center gap-3 mb-3">
              {post.reading_time && (
                <span className="font-mono text-xs text-primary uppercase">
                  {post.reading_time} min read
                </span>
              )}
              {formattedDate && (
                <span className="text-xs text-muted-foreground">
                  {formattedDate}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors leading-snug">
              {post.title}
            </h3>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
            )}

            {/* Read more */}
            <span className="inline-flex items-center gap-1.5 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
