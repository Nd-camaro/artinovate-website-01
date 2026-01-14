import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { ScrollPath } from "@/components/ScrollPath";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { InsightCard } from "@/components/InsightCard";
import { useInsightPosts } from "@/hooks/useInsightPosts";
import heroImage from "@/assets/hero-insights.jpg";
import { useScheduling } from "@/contexts/SchedulingContext";
import { FileText } from "lucide-react";

export default function Insights() {
  const { openScheduler } = useScheduling();
  const { posts, loading, error } = useInsightPosts();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <ScrollPath />
      
      <main>
        <PageHero 
          image={heroImage}
          label="Insights"
          headline="Insights on AI automation and digital systems"
          subheading="For founders, operators, and decision makers"
          scrollTarget="#content"
        />

        {/* Insights Grid */}
        <section id="content" className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Loading state */}
            {loading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-border/50 rounded-xl bg-card/20 p-6 animate-pulse"
                  >
                    <div className="aspect-[16/9] bg-secondary/40 rounded-lg mb-4" />
                    <div className="h-4 w-24 bg-secondary/40 rounded mb-3" />
                    <div className="h-6 w-3/4 bg-secondary/40 rounded mb-3" />
                    <div className="h-4 bg-secondary/30 rounded mb-2" />
                    <div className="h-4 w-2/3 bg-secondary/30 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Unable to load insights. Please try again later.
                </p>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && posts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/40 mb-6">
                  <FileText className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">No published insights yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're working on some great content. Check back soon for insights on AI automation and digital systems.
                </p>
              </motion.div>
            )}

            {/* Posts grid */}
            {!loading && !error && posts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                  <InsightCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Inline CTA */}
        <section className="py-16 lg:py-24 bg-graphite/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Want to discuss your specific situation?
              </h2>
              <p className="text-muted-foreground mb-6">
                Book a strategy call to explore how autonomous systems could work for your organization.
              </p>
              <Button variant="hero" size="default" className="h-10 px-6 text-sm" onClick={openScheduler}>
                Book a strategy call
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 lg:py-20 bg-background border-t border-border/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="label-mono text-primary mb-3 block">Stay Updated</span>
              <h3 className="text-xl font-semibold mb-4">
                Occasional insights on AI automation
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                No spam. Unsubscribe anytime.
              </p>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 bg-card/50 border border-border/50 rounded-md text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <Button variant="minimal" size="default" className="h-10 px-5 text-sm">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
