import { useEffect } from "react";
import type { ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouter,
} from "@tanstack/react-router";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SchedulingModal } from "@/components/SchedulingModal";
import { ChatWidget } from "@/components/ChatWidget";
import { SchedulingProvider } from "@/contexts/SchedulingContext";
import { reportLovableError } from "@/lib/lovable-error-reporting";

import appStyles from "@/styles.css?url";

const SITE_TITLE = "AI-Powered Digital Presence for Web3 | ArtiNovate";
const SITE_DESCRIPTION =
  "AI-powered digital presence for Web3 and digital asset companies. ArtiNovate helps firms publish expertise, engage visitors and capture qualified intent.";
const OG_IMAGE =
  "https://id-preview--41a2ddcc-3761-4568-9d39-a329bd85bd62.lovable.app/og-image.png";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.artinovate.com/#organization",
  name: "ArtiNovate",
  url: "https://www.artinovate.com",
  logo: "https://artinovate.com/assets/artinovate-logo-BsiajO-W.png",
  description:
    "AI automation agency building autonomous digital presence systems for Web3 protocols, DeFi funds, DAOs, and blockchain firms.",
  areaServed: "Global",
  priceRange: "$5000–$15000",
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://artinovate.com/" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=League+Gothic&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appStyles },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
    ],
  }),
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFound,
});

function RootNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-8">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
}

function RootErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold"
          >
            Try again
          </button>
          <button
            onClick={() => router.navigate({ to: "/" })}
            className="px-6 py-3 rounded-md border border-border font-semibold"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <RootShell>
      <QueryClientProvider client={queryClient}>
        <SchedulingProvider>
          <TooltipProvider>
            <ScrollRestoration />
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>
                <Outlet />
              </main>
              <Footer />
              <SchedulingModal />
              <ChatWidget />
            </div>
          </TooltipProvider>
        </SchedulingProvider>
      </QueryClientProvider>
    </RootShell>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
