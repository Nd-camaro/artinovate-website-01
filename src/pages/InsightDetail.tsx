import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useDocumentHead } from "@/hooks/useDocumentHead";

import { ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useScheduling } from "@/contexts/SchedulingContext";

interface CTAConfig {
  text?: string;
  url?: string;
  buttonText?: string;
}

export default function InsightDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { openScheduler } = useScheduling();

  const { data: insight, isLoading, error } = useQuery({
    queryKey: ["insight_post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("insight_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Parse CTA config safely - handle both JSON objects and plain text
  const parseCTAConfig = (config: unknown): CTAConfig | null => {
    if (!config) return null;
    
    // Already an object with expected structure
    if (typeof config === 'object' && config !== null) {
      return config as CTAConfig;
    }
    
    // String that might be JSON or plain text
    if (typeof config === 'string') {
      const trimmed = config.trim();
      // Only try to parse if it looks like JSON (starts with { or [)
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          return JSON.parse(trimmed) as CTAConfig;
        } catch {
          // Failed to parse - treat as plain text CTA
          return { text: config };
        }
      }
      // Plain text - use as CTA text directly
      return { text: config };
    }
    
    return null;
  };

  const jsonLd = useMemo(() => {
    if (!insight) return null;

    let faqSchema = null;
    if (insight.faq_json_ld) {
      if (typeof insight.faq_json_ld === 'string') {
        try { faqSchema = JSON.parse(insight.faq_json_ld); } catch { /* ignore */ }
      } else {
        faqSchema = insight.faq_json_ld as object;
      }
    }

    return faqSchema || null;
  }, [insight]);

  const headReady = useDocumentHead({
    title: insight?.meta_title ?? undefined,
    description: insight?.meta_description ?? undefined,
    canonicalUrl: insight?.canonical_url ?? undefined,
    jsonLd,
  }, !!insight && !isLoading && !error);

  const ctaConfig = parseCTAConfig(insight?.cta_config);

  if (isLoading || (!!insight && !error && !headReady)) {
    return (
      <div className="min-h-screen bg-background" aria-hidden="true" />
    );
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
            <Link 
              to="/insights" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
            <h1 className="text-2xl font-semibold">Insight not found</h1>
            <p className="text-muted-foreground mt-4">
              This insight may have been removed or is not yet published.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": insight.title,
            "description": insight.excerpt || insight.content?.split('.')[0] || "",
            "image": insight.featured_image_url || "",
            "datePublished": insight.published_at || "",
            "dateModified": insight.published_at || "",
            "author": {
              "@type": "Organization",
              "name": "ArtiNovate",
              "url": "https://www.artinovate.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ArtiNovate",
              "logo": {
                "@type": "ImageObject",
                "url": "https://artinovate.com/assets/artinovate-logo-BsiajO-W.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.artinovate.com/insights/${insight.slug}`
            }
          })
        }}
      />
      <Navigation />

      <main className="pt-24 pb-16 lg:pb-24">
        <article className="container mx-auto px-6 lg:px-12 max-w-3xl">
          {/* Back link */}
          <Link 
            to="/insights" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {insight.reading_time && (
                <span className="font-mono text-xs text-primary">
                  {insight.reading_time} min read
                </span>
              )}
              {insight.published_at && (
                <span className="text-xs text-muted-foreground">
                  {new Date(insight.published_at).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {insight.title}
            </h1>
            {insight.excerpt && (
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                {insight.excerpt}
              </p>
            )}
          </header>

          {/* Featured image */}
          {insight.featured_image_url && (
            <div className="relative mb-10 -mx-6 lg:-mx-12 xl:-mx-24">
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
                <img
                  src={insight.featured_image_url}
                  alt={insight.title}
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
            </div>
          )}

          {/* Article content */}
          <div className="prose-insight">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold tracking-tight mt-12 mb-6 text-foreground">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-5 text-foreground">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold tracking-tight mt-8 mb-4 text-foreground">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-medium mt-6 mb-3 text-foreground">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-base leading-relaxed text-secondary-foreground mb-6">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-secondary-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-secondary-foreground">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed pl-2">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary/50 pl-6 py-1 my-6 italic text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => {
                  const isExternal = href?.startsWith('http');
                  return (
                    <a
                      href={href}
                      className="text-primary hover:text-primary/80 transition-colors"
                      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {children}
                    </a>
                  );
                },
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
                code: ({ children }) => (
                  <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-primary">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted rounded-lg p-4 overflow-x-auto mb-6 text-sm">
                    {children}
                  </pre>
                ),
                hr: () => (
                  <hr className="border-border/50 my-10" />
                ),
                img: ({ src, alt }) => (
                  <img 
                    src={src} 
                    alt={alt || ''} 
                    className="rounded-lg my-8 w-full"
                    loading="lazy"
                  />
                ),
              }}
            >
              {insight.content}
            </ReactMarkdown>
          </div>

          {/* Inline CTA from cta_config - opens scheduling modal */}
          {ctaConfig?.text && (
            <aside 
              onClick={openScheduler}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openScheduler();
                }
              }}
              className="mt-12 p-6 md:p-8 bg-graphite/50 border border-primary/10 rounded-lg cursor-pointer transition-colors hover:bg-graphite/70 hover:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <p className="text-base md:text-lg leading-relaxed text-foreground">
                {ctaConfig.text}
              </p>
              <span className="inline-flex items-center gap-2 mt-4 text-primary font-medium">
                <Calendar className="w-4 h-4" />
                {ctaConfig.buttonText || "Schedule a consultation"} →
              </span>
            </aside>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
