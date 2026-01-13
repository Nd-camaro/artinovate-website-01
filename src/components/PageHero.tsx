import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface PageHeroProps {
  image: string;
  label?: string;
  headline: string;
  subheading?: string;
  scrollTarget?: string;
}

export function PageHero({ image, label, headline, subheading, scrollTarget }: PageHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Hero background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt="" 
          className="w-full h-full object-cover object-top"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/50" />
        {/* Bottom gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 via-35% to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20 pt-20">
        <div className="max-w-3xl">
          {/* Label */}
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="label-mono text-primary mb-4 block">{label}</span>
            </motion.div>
          )}

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 leading-[0.95]"
          >
            {headline}
          </motion.h1>

          {/* Subheading */}
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground font-light"
            >
              {subheading}
            </motion.p>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {scrollTarget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href={scrollTarget} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronDown className="w-4 h-4 scroll-indicator" />
          </a>
        </motion.div>
      )}

      {/* Connecting line */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/0 via-primary to-primary origin-top"
      />
    </section>
  );
}
