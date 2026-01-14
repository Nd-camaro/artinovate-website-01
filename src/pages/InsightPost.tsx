import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollPath } from "@/components/ScrollPath";
import { MarkdownContent } from "@/components/MarkdownContent";
import { InsightCTA } from "@/components/InsightCTA";
import { useInsightPost } from "@/hooks/useInsightPosts";
import { Helmet } from "react-helmet-async";

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, notFound } = useInsightPost(slug);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-4 w-24 bg-secondary/60 rounded" />
                <div className="h-10 w-3/4 bg-secondary/60 rounded" />
                <div className="h-4 w-1/2 bg-secondary/40 rounded" />
                <div className="space-y-3 pt-8">
                  <div className="h-4 bg-secondary/30 rounded" />
                  <div className="h-4 bg-secondary/30 rounded" />
                  <div className="h-4 w-5/6 bg-secondary/30 rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not found state
  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Post not found</h1>
              <p className="text-muted-foreground mb-8">
                This post doesn't exist or isn't available yet.
              </p>
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Insights
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Check if CTA should be shown
  const showCTA =
    (post as any).cta_enabled &&
    (post as any).cta_text &&
    (post as any).cta_url;

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title} | ArtiNovate Insights</title>
        {(post.meta_description || post.excerpt) && (
          <meta
            name="description"
            content={post.meta_description || post.excerpt || ""}
          />
        )}
        {post.canonical_url && <link rel="canonical" href={post.canonical_url} />}
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <ScrollPath />

        <main className="pt-28 md:pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <Link
                  to="/insights"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Insights
                </Link>
              </motion.div>

              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-10"
              >
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formattedDate}
                    </span>
                  )}
                  {post.reading_time && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.reading_time} min read
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-foreground">
                  {post.title}
                </h1>

                {/* Excerpt as lead */}
                {post.excerpt && (
                  <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </motion.header>

              {/* Featured image */}
              {post.featured_image_url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-10 rounded-xl overflow-hidden"
                >
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <MarkdownContent content={post.content} />

                {/* CTA */}
                {showCTA && (
                  <InsightCTA
                    text={(post as any).cta_text}
                    url={(post as any).cta_url}
                  />
                )}
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
