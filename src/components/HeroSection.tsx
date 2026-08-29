import { useEffect, useState, useRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroLoopWebm from "@/assets/hero-loop.webm.asset.json";
import heroLoopMp4 from "@/assets/hero-loop.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import { useScheduling } from "@/contexts/SchedulingContext";

const SESSION_KEY = "artinovate_typewriter_played";

// Fixed headline line + rotating category terms
const HEADLINE_FIXED = "Digital Presence";
const ROTATING_TERMS = ["Web3", "Digital Assets", "Tokenization", "Fintech"];
const HOLD_MS = 2000;
const OUT_MS = 260;

// Glass-cube break: each character is split into 4 clipped quadrant fragments
const QUADRANTS = [
  { cls: "frag-tl", dx: -1, dy: -1 },
  { cls: "frag-tr", dx: 1, dy: -1 },
  { cls: "frag-bl", dx: -1, dy: 1 },
  { cls: "frag-br", dx: 1, dy: 1 },
];

/** Deterministic per-fragment variance (-2..2) so motion is identical every cycle */
const fragVariance = (charIndex: number, quadIndex: number) =>
  ((charIndex * 7 + quadIndex * 13) % 5) - 2;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface CrystallineTermProps {
  active: boolean;
}

/**
 * Rotating cyan category term. Between transitions the word is completely
 * static and sharp; on change it breaks into per-character glass cube
 * fragments that scatter, then the next term's fragments assemble in
 * (~260ms out + ~300ms in).
 */
const CrystallineTerm = ({ active }: CrystallineTermProps) => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("in");

  useEffect(() => {
    if (!active || prefersReducedMotion()) return;

    let outTimer: ReturnType<typeof setTimeout>;
    const holdTimer = setTimeout(() => {
      setPhase("out");
      outTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_TERMS.length);
        setPhase("in");
      }, OUT_MS);
    }, HOLD_MS);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
    };
  }, [active, index]);

  const longest = ROTATING_TERMS.reduce((a, b) => (b.length > a.length ? b : a));
  const term = ROTATING_TERMS[index];

  return (
    <span className="relative inline-block text-primary align-top">
      {/* Reserve width of the longest term so the headline never reflows */}
      <span className="invisible" aria-hidden="true">
        {longest}
      </span>
      <span className="absolute inset-0 whitespace-nowrap" aria-live="polite">
        {term.split("").map((char, i) => {
          const glyph = char === " " ? "\u00A0" : char;
          return (
            <span key={`${index}-${i}`} className="glass-char">
              {/* Invisible glyph reserves the character's exact space */}
              <span className="invisible">{glyph}</span>
              {QUADRANTS.map((q, qi) => {
                const v = fragVariance(i, qi);
                const dist = 3 + ((i * 3 + qi * 5) % 4); // 3..6px scatter
                const rot = 10 + ((i * 5 + qi * 7) % 7); // 10..16deg
                const style = {
                  "--dx": q.dx * (dist + v),
                  "--dy": q.dy * (dist - v * 0.5),
                  "--rx": q.dy * rot,
                  "--ry": q.dx * -rot,
                  animationDelay: `${i * 12 + qi * 20}ms`,
                } as CSSProperties;
                return (
                  <span
                    key={qi}
                    aria-hidden="true"
                    className={`glass-frag ${q.cls} ${
                      phase === "out" ? "is-out" : "is-in"
                    }`}
                    style={style}
                  >
                    {glyph}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
};


interface TypewriterProps {
  lines: string[];
  isActive: boolean;
  onComplete?: () => void;
  skipAnimation?: boolean;
}

const Typewriter = ({
  lines,
  isActive,
  onComplete,
  skipAnimation = false,
}: TypewriterProps) => {
  const fullText = lines.join("\n");
  const [displayedText, setDisplayedText] = useState(skipAnimation ? fullText : "");
  const [cursorVisible, setCursorVisible] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (skipAnimation || !isActive || hasCompletedRef.current) {
      if (skipAnimation) setDisplayedText(fullText);
      return;
    }

    setCursorVisible(true);
    let currentIndex = 0;
    const chars = fullText.split("");

    const typeNextChar = () => {
      if (currentIndex <= chars.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
        
        // Pause slightly longer at line breaks
        const currentChar = chars[currentIndex - 1];
        const baseSpeed = 65;
        const variance = Math.random() * 15 - 7;
        const delay = currentChar === "\n" ? 250 : baseSpeed + variance;
        
        setTimeout(typeNextChar, delay);
      } else {
        hasCompletedRef.current = true;
        setCursorVisible(false);
        onComplete?.();
      }
    };

    const startDelay = setTimeout(typeNextChar, 100);
    return () => clearTimeout(startDelay);
  }, [fullText, isActive, onComplete, skipAnimation]);

  // Split displayed text back into lines
  const displayedLines = displayedText.split("\n");

  return (
    <span className="relative">
      {/* Invisible text to reserve exact space for each line */}
      {lines.map((line, idx) => (
        <span key={`reserve-${idx}`} className="block invisible" aria-hidden="true">
          {line}
        </span>
      ))}
      {/* Visible typed text overlay */}
      <span className="absolute inset-0">
        {displayedLines.map((line, idx) => (
          <span key={`typed-${idx}`} className="block">
            {line}
            {/* Cursor on the last line being typed */}
            {idx === displayedLines.length - 1 && (
              <motion.span
                className="inline-block w-[2px] h-[0.75em] bg-primary/80 ml-0.5 align-middle rounded-xs"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: cursorVisible ? [0.4, 0.8, 0.4] : 0,
                }}
                transition={
                  cursorVisible
                    ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.4, ease: "easeOut" }
                }
              />
            )}
          </span>
        ))}
      </span>
    </span>
  );
};

/**
 * Decorative full-bleed hero background.
 * Poster paints instantly (LCP-safe); the seamless muted loop fades in on top
 * once it can play. Skipped entirely for reduced-motion / save-data / 2G users.
 */
const HeroVideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [enableVideo, setEnableVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const lowBandwidth =
      connection?.saveData === true ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g";

    if (prefersReducedMotion || lowBandwidth) return;

    // Attach after first paint so the video never competes with initial render
    const id = window.requestAnimationFrame(() => setEnableVideo(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Pause when off-screen or when the tab is hidden
  useEffect(() => {
    if (!enableVideo) return;
    const el = videoRef.current;
    if (!el) return;

    const safePlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) safePlay();
        else el.pause();
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const onVisibility = () => {
      if (document.hidden) el.pause();
      else safePlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enableVideo]);

  return (
    <>
      <img
        src={heroPoster.url}
        alt="Cyan signal streams flowing through an abstract dark infrastructure structure"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
        decoding="async"
        width={1280}
        height={720}
      />
      {enableVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPoster.url}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={heroLoopWebm.url} type="video/webm" />
          <source src={heroLoopMp4.url} type="video/mp4" />
        </video>
      )}
    </>
  );

};

export function HeroSection() {
  const { openScheduler } = useScheduling();
  const [typewriterActive, setTypewriterActive] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showSubhead, setShowSubhead] = useState(false);
  const [showSupporting, setShowSupporting] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem(SESSION_KEY);
    if (hasPlayed) {
      setSkipAnimation(true);
      setTypewriterDone(true);
      setShowSubhead(true);
      setShowSupporting(true);
      setShowCTA(true);
    } else {
      // Start typewriter after container fades in
      const timer = setTimeout(() => setTypewriterActive(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTypewriterComplete = () => {
    setTypewriterDone(true);
    sessionStorage.setItem(SESSION_KEY, "true");
    // Reveal subsequent elements
    setTimeout(() => setShowSubhead(true), 200);
  };

  useEffect(() => {
    if (showSubhead && !skipAnimation) {
      const timer = setTimeout(() => setShowSupporting(true), 400);
      return () => clearTimeout(timer);
    }
  }, [showSubhead, skipAnimation]);

  useEffect(() => {
    if (showSupporting && !skipAnimation) {
      const timer = setTimeout(() => setShowCTA(true), 300);
      return () => clearTimeout(timer);
    }
  }, [showSupporting, skipAnimation]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero background video underlay with overlay */}
      <div className="absolute inset-0">
        <HeroVideoBackground />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 via-35% to-transparent" />
      </div>


      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-6 lg:px-12 relative z-20 pt-20"
      >
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: skipAnimation ? 0 : 0.3, duration: 0.5 }}
          >
            <span className="label-mono text-primary mb-6 block">
              AI Powered
            </span>
          </motion.div>

          {/* Main headline - fixed line + rotating cyan category term */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: skipAnimation ? 0 : 0.4, duration: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.015em] mb-6 leading-[1.1]"
          >
            <Typewriter
              lines={[HEADLINE_FIXED]}
              isActive={typewriterActive || skipAnimation}
              onComplete={handleTypewriterComplete}
              skipAnimation={skipAnimation}
            />
            <span className="block">
              for{" "}
              {(typewriterDone || skipAnimation) && (
                <CrystallineTerm active={typewriterDone || skipAnimation} />
              )}
            </span>

          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={showSubhead ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground font-light mb-10"
          >
            Publish. Engage. Capture.
          </motion.p>


          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={showCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button variant="hero" size="default" className="h-10 px-6 text-sm" onClick={openScheduler}>
              Book a strategy call
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: skipAnimation ? 0.5 : 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronDown className="w-4 h-4 scroll-indicator" />
        </a>
      </motion.div>

      {/* Connecting line */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: skipAnimation ? 0.5 : 3, duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/0 via-primary to-primary origin-top"
      />
    </section>
  );
}