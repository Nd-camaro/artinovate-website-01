import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { ScrollPath } from "@/components/ScrollPath";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useInsightBySlug } from "@/hooks/useInsights";
import { useScheduling } from "@/contexts/SchedulingContext";

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: insight, isLoading, error } = useInsightBySlug(slug || "");
  const { openScheduler } = useScheduling();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
            <div className="animate-pulse">
              <div className="h-4 w-32 bg-muted rounded mb-8" />
              <div className="h-10 w-full bg-muted rounded mb-4" />
              <div className="h-10 w-3/4 bg-muted rounded mb-8" />
              <div className="flex gap-4 mb-12">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not found or not published - redirect to insights
  if (error || !insight) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <ScrollPath />
      
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-6 lg:px-12 max-w-3xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link 
              to="/insights"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
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
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {insight.title}
            </h1>
            
            {insight.excerpt && (
              <p className="text-lg text-muted-foreground mb-6">
                {insight.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {insight.published_at && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(insight.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              )}
              {insight.reading_time && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {insight.reading_time} min read
                </span>
              )}
            </div>
          </motion.header>

          {/* Featured image */}
          {insight.featured_image_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <img
                src={insight.featured_image_url}
                alt={insight.title}
                className="w-full rounded-lg"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: insight.content }}
          />

          {/* CTA Section */}
          {insight.cta_enabled && insight.cta_text && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 p-8 rounded-lg bg-card/30 border border-border/50"
            >
              <h3 className="text-xl font-semibold mb-4">{insight.cta_text}</h3>
              {insight.cta_url ? (
                <Button variant="hero" asChild>
                  <a href={insight.cta_url} target="_blank" rel="noopener noreferrer">
                    Learn more
                  </a>
                </Button>
              ) : (
                <Button variant="hero" onClick={openScheduler}>
                  Book a strategy call
                </Button>
              )}
            </motion.div>
          )}
        </article>

        {/* Bottom CTA */}
        <section className="mt-16 py-16 bg-graphite/30">
          <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Ready to explore autonomous systems?
              </h2>
              <p className="text-muted-foreground mb-6">
                Book a strategy call to discuss how AI automation could work for your organization.
              </p>
              <Button variant="hero" size="default" onClick={openScheduler}>
                Book a strategy call
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
