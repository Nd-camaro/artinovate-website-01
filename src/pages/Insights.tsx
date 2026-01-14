import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { ScrollPath } from "@/components/ScrollPath";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-insights.jpg";
import { ArrowRight } from "lucide-react";
import { useScheduling } from "@/contexts/SchedulingContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Insights() {
  const { openScheduler } = useScheduling();

  const { data: insights = [], isLoading } = useQuery({
    queryKey: ["insight_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("insight_posts")
        .select("*")
        .eq("status", "published")
        .not("published_at", "is", null)
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

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
            {isLoading ? (
              // Neutral reserved space while loading - no content claims
              <div className="min-h-[200px]" />
            ) : !insights || insights.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground text-lg">
                  No insights published yet. Check back soon.
                </p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {insights.map((insight, index) => (
                  <motion.article
                    key={insight.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link 
                      to={`/insights/${insight.slug}`}
                      className="group block h-full"
                    >
                      <div className="h-full flex flex-col border border-border/50 rounded-lg bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        {/* Featured Image */}
                        {insight.featured_image_url && (
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent z-10" />
                            <img
                              src={insight.featured_image_url}
                              alt={insight.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="eager"
                            />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col">
                          <div className="flex items-center gap-3 mb-4">
                            {insight.reading_time && (
                              <span className="font-mono text-xs text-primary">
                                {insight.reading_time} min read
                              </span>
                            )}
                            {insight.published_at && (
                              <span className="text-xs text-muted-foreground">
                                {new Date(insight.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors leading-snug">
                            {insight.title}
                          </h3>
                          {insight.excerpt && (
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                              {insight.excerpt}
                            </p>
                          )}
                          <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                            Read more <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
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
