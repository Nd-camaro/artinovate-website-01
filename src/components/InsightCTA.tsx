import { useScheduling } from "@/contexts/SchedulingContext";
import { ExternalLink } from "lucide-react";

interface InsightCTAProps {
  text: string;
  url: string;
}

const CALENDLY_PATTERNS = [
  "calendly.com",
  "/schedule",
  "/book",
  "booking",
];

export function InsightCTA({ text, url }: InsightCTAProps) {
  const { openScheduler } = useScheduling();

  const isSchedulingLink = CALENDLY_PATTERNS.some((pattern) =>
    url.toLowerCase().includes(pattern)
  );
  const isExternal = url.startsWith("http://") || url.startsWith("https://");

  const handleClick = (e: React.MouseEvent) => {
    if (isSchedulingLink) {
      e.preventDefault();
      openScheduler();
    }
  };

  return (
    <div className="mt-10 pt-8 border-t border-border/30">
      <div
        className="p-6 rounded-[16px] bg-secondary/60 border border-primary/15"
        style={{
          boxShadow: "0 0 40px -15px hsl(var(--primary) / 0.15)",
        }}
      >
        <a
          href={isSchedulingLink ? "#" : url}
          onClick={handleClick}
          target={isExternal && !isSchedulingLink ? "_blank" : undefined}
          rel={isExternal && !isSchedulingLink ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-opacity duration-200 group"
        >
          <span className="border-b border-primary/40 group-hover:border-primary/70 transition-colors pb-0.5">
            {text}
          </span>
          {isExternal && !isSchedulingLink && (
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          )}
        </a>
      </div>
    </div>
  );
}
