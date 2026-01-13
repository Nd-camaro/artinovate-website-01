import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollPath() {
  const { scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform scroll progress to path length
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Node positions (relative to sections)
  const nodes = [
    { id: "publish", y: 20, label: "Publish" },
    { id: "engage", y: 35, label: "Engage" },
    { id: "convert", y: 50, label: "Convert" },
    { id: "follow", y: 65, label: "Follow Up" },
  ];

  return (
    <div className="fixed left-8 lg:left-16 top-0 bottom-0 z-40 pointer-events-none hidden lg:block">
      <svg
        className="h-full w-12"
        viewBox="0 0 48 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Background path */}
        <path
          d="M24 0 L24 1000"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        
        {/* Animated path */}
        <motion.path
          d="M24 0 L24 1000"
          stroke="url(#pathGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
          className="path-glow"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--signal-blue))" />
            <stop offset="100%" stopColor="hsl(var(--electric-cyan))" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes along the path */}
      {nodes.map((node, index) => (
        <motion.div
          key={node.id}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-ping" />
            {/* Inner dot */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
            {/* Label */}
            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground whitespace-nowrap">
              {node.label}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Traveling glow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          opacity: glowOpacity,
          boxShadow: "0 0 20px 4px hsl(var(--electric-cyan) / 0.6)",
        }}
      />
    </div>
  );
}
