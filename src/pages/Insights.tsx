import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { ScrollPath } from "@/components/ScrollPath";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-insights.jpg";
import { ArrowRight, FileText } from "lucide-react";
import { useScheduling } from "@/contexts/SchedulingContext";
import { useInsights } from "@/hooks/useInsights";

export default function Insights() {
  const { openScheduler } = useScheduling();
  const { data: insights, isLoading, error } = useInsights();

  const hasInsights = insights && insights.length > 0;

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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-64 p-6 border border-border/50 rounded-lg bg-card/20 animate-pulse"
                  >
                    <div className="h-4 w-24 bg-muted rounded mb-4" />
                    <div className="h-6 w-full bg-muted rounded mb-3" />
                    <div className="h-4 w-full bg-muted rounded mb-2" />
                    <div className="h-4 w-3/4 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  Unable to load insights. Please try again later.
                </p>
              </div>
            ) : hasInsights ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <div className="h-full p-6 border border-border/50 rounded-lg bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-4">
                          {insight.reading_time && (
                            <span className="font-mono text-xs text-primary">
                              {insight.reading_time} min read
                            </span>
                          )}
                          {insight.published_at && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(insight.published_at).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {insight.title}
                        </h3>
                        {insight.excerpt && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {insight.excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Read more <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-card/50 flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  No insights published yet
                </h3>
                <p className="text-muted-foreground max-w-md">
                  We're working on sharing valuable content. Check back soon for insights on AI automation and digital systems.
                </p>
              </motion.div>
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
