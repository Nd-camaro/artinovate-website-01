import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Loader2 } from "lucide-react";
import { useScheduling } from "@/contexts/SchedulingContext";

const CALENDLY_URL = "https://calendly.com/artinovate01/ai-powered-website-consultation";

export function SchedulingModal() {
  const { isOpen, closeScheduler } = useScheduling();
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeScheduler();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeScheduler]);

  // Reset loading state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIframeLoaded(false);
    }
  }, [isOpen]);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    setIframeLoaded(true);
  }, []);

  // Handle overlay click - close modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeScheduler();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          onClick={handleOverlayClick}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl lg:max-w-3xl bg-graphite border border-primary/20 rounded-[16px] shadow-xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 md:p-6 border-b border-border/30 flex-shrink-0">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground">
                  Schedule a strategy call
                </h2>
                <span className="font-mono text-xs text-muted-foreground mt-1 block">
                  Calendly scheduling
                </span>
              </div>
              <button
                onClick={closeScheduler}
                className="p-2 -mr-2 -mt-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 relative overflow-auto min-h-[400px] md:min-h-[500px]">
              {/* Loading state */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-graphite z-10"
                  >
                    <Loader2 className="w-6 h-6 text-muted-foreground animate-spin mb-3" />
                    <span className="font-mono text-sm text-muted-foreground">
                      Loading scheduler
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Calendly iframe - only renders when modal is open */}
              <iframe
                src={CALENDLY_URL}
                onLoad={handleIframeLoad}
                className={`w-full h-full min-h-[400px] md:min-h-[500px] border-0 transition-opacity duration-300 ${
                  iframeLoaded ? "opacity-100" : "opacity-0"
                }`}
                title="Schedule a strategy call with ArtiNovate"
                allow="payment"
              />
            </div>

            {/* Footer with fallback */}
            <div className="p-4 border-t border-border/30 flex-shrink-0">
              <p className="text-xs text-muted-foreground text-center">
                If the scheduler does not load,{" "}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  open Calendly in a new tab
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
