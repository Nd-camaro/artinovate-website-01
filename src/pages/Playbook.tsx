import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import mockup from "@/assets/playbook-3d-mockup.png.asset.json";
import backCover from "@/assets/playbook-back-cover-poster.png.asset.json";
import satoshi from "@/assets/playbook-satoshi-reading.png.asset.json";

const CHECKOUT_URL = "https://selar.com/2186224016";

const syne = { fontFamily: "'Syne', sans-serif" };
const mono = { fontFamily: "'IBM Plex Mono', monospace" };
const inter = { fontFamily: "'Inter', sans-serif" };

const chapters = [
  ["You Exist. No One Knows.", "The invisible organization problem and what it costs."],
  ["The Wrong Audience Is Worse Than No Audience", "Presence without precision is a liability."],
  ["The Math of Rented Ground", "The ROI case for owned presence infrastructure."],
  ["Midnight Foundation", "A real Web3 case study of presence done correctly."],
  ["AI Rewarded Architecture", "The shift from labor-intensive to system-driven visibility."],
  ["What AI Cannot Do", "The boundaries that make everything else more powerful."],
  ["The Publish Engine", "The 14-module autonomous content pipeline, step by step."],
  ["The Engage Engine", "The trained conversational presence that answers at every hour."],
  ["The Capture Engine", "Converting the right relationships at the right moment."],
  ["The Compounding Curve", "Results arrive on the schedule of compounding, not impatience."],
  ["Your Presence Is Yours", "The final instruction. The infrastructure amplifies what you put in."],
];

const icps = [
  ["DeFi & Web3 Protocols", "Years of engineering the world hasn't found yet. This changes that."],
  ["Digital Asset Funds", "Serious track records that need LP-grade visibility."],
  ["DAOs & Governance", "Contributors who believe in something real. The Capture engine finds them."],
  ["Regulated Finance", "Compliance-first firms with infrastructure invisible to their market."],
  ["Advisory & Service Firms", "Deep expertise that never reaches the people who need it."],
  ["Enterprise Blockchain", "Half a decade of architecture. Partners need to find you first."],
];

const pipelineModules = [
  "01 · TRIGGER","02 · RESEARCH","03 · WRITE","04 · IMAGE PROMPT","05 · HERO IMAGE",
  "06 · CTA","07 · TITLE","08 · SLUG","09 · UPLOAD","10 · METADATA","11 · URL VAR",
  "12 · DATABASE","13 · DEPLOY","14 · FLAG",
];

function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${center ? "justify-center" : ""}`}>
      <span className="block h-px w-6 bg-[#00D4D4]" />
      <span style={mono} className="text-[10px] uppercase tracking-[0.2em] text-[#00D4D4]">{children}</span>
    </div>
  );
}

function OfferBox({ progressKey }: { progressKey: string }) {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(14), 800);
    return () => clearTimeout(t);
  }, [progressKey]);
  return (
    <div className="relative bg-[#0F0F0F] border border-[#1A1A1A] border-t-2 border-t-[#00D4D4] p-8 text-left">
      <span style={mono} className="absolute -top-0 left-0 bg-[#00D4D4] text-black text-[9px] uppercase tracking-[0.2em] px-2.5 py-[3px]">
        JUNE OFFER — FIRST 100 COPIES
      </span>
      <div className="mt-6 flex items-end gap-4">
        <span style={syne} className="text-[20px] text-[#555555] line-through font-bold">$50</span>
        <span style={syne} className="text-[56px] text-white font-extrabold leading-none">$25</span>
        <span style={mono} className="text-[10px] text-[#00D4D4] tracking-[0.1em] pb-2">JUNE ONLY</span>
      </div>
      <div className="mt-3" style={mono}>
        <div className="text-[11px] text-[#00D4D4]">⬛ 86 of 100 blueprint copies remaining</div>
        <div className="mt-2 h-[2px] bg-[#1A1A1A] w-full">
          <div className="h-full bg-[#00D4D4] transition-all duration-1000 ease-out" style={{ width: `${fill}%` }} />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {[
          ["AI-Powered Digital Presence Infrastructure Playbook", "$50"],
          ["The Make.com 14-Module Pipeline Blueprint [FIRST 100]", "$97"],
        ].map(([item, val]) => (
          <div key={item} className="flex items-baseline gap-3">
            <span className="text-[#00D4D4]">→</span>
            <span className="text-white text-[13px] flex-1">{item}</span>
            <span style={mono} className="text-[11px] text-[#555555]">{val}</span>
          </div>
        ))}
      </div>
      <div style={mono} className="text-[11px] text-[#00D4D4] border-t border-[#1A1A1A] pt-3 mt-3">
        TOTAL VALUE: $147 · YOU PAY: $25
      </div>
      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={syne}
        className="block w-full bg-[#00D4D4] text-black text-center uppercase font-extrabold text-[14px] tracking-[0.06em] py-[18px] mt-5 hover:opacity-[0.88] transition-opacity"
      >
        GET INSTANT ACCESS — $25
      </a>
      <div style={mono} className="text-[10px] text-[#555555] text-center mt-2.5">
        Instant PDF delivery · Secure checkout · Blueprint for first 100 only
      </div>
      <div
        style={mono}
        className="mt-3.5 text-[10px] text-[#00D4D4] text-center tracking-[0.06em] px-3.5 py-2.5"
      >
        <div style={{ backgroundColor: "rgba(0,212,212,0.05)", border: "1px solid rgba(0,212,212,0.2)", padding: "10px 14px" }}>
          ⚑ Blueprint bonus expires when 100 copies sell. Price returns to $50 on July 1.
        </div>
      </div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function HeroLoadFade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function Playbook() {
  // Parallax for two large images
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.title = "The Playbook — ArtiNovate";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white" style={inter}>
      <Navigation />

      {/* SECTION 1 — HERO */}
      <section className="relative bg-black pt-16 lg:pt-0">
        <div className="flex flex-col lg:flex-row lg:min-h-screen">
          {/* LEFT — image */}
          <HeroLoadFade
            delay={150}
            className="relative w-full lg:w-[55%] lg:min-h-screen"
          >
            <div className="relative w-full h-[70vw] lg:h-screen overflow-hidden" style={{ filter: "drop-shadow(0 0 60px rgba(0,212,212,0.12))" }}>
              <img
                src={mockup.url}
                alt="Your AI-Powered Digital Presence Infrastructure Playbook — 3D book mockup"
                className="w-full h-full object-cover"
              />
              {/* Desktop right gradient */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{ background: "linear-gradient(to right, transparent 25%, rgba(0,0,0,0.55) 65%, #000000 100%)" }}
              />
              {/* Mobile bottom gradient */}
              <div
                className="absolute inset-0 lg:hidden"
                style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 70%, #000000 100%)" }}
              />
            </div>
          </HeroLoadFade>

          {/* RIGHT — copy */}
          <div className="relative w-full lg:w-[45%] bg-black flex items-center px-5 md:px-10 lg:pl-[60px] lg:pr-12 py-16 lg:py-0 -mt-24 lg:mt-0 z-10">
            <div className="w-full max-w-xl">
              <HeroLoadFade delay={0}>
                <div style={mono} className="text-[11px] text-[#00D4D4] uppercase tracking-[0.2em]">
                  ND NWANKWO · ARTINOVATE · JUNE 2026
                </div>
              </HeroLoadFade>

              <HeroLoadFade delay={150}>
                <h1
                  style={syne}
                  className="mt-6 font-extrabold text-white leading-[0.95]"
                >
                  <span style={{ display: "block", fontSize: "clamp(42px,6vw,80px)", letterSpacing: "-0.02em" }}>
                    The playbook<br />
                    that turns<br />
                    <span className="text-[#00D4D4]">$300K/yr</span><br />
                    into <span className="text-[#00D4D4]">$218/mo.</span>
                  </span>
                </h1>
              </HeroLoadFade>

              <HeroLoadFade delay={300}>
                <p className="mt-6 text-[16px] font-light text-[#AAAAAA] leading-[1.7] max-w-[420px]">
                  Web3 organizations are invisible — not because the work is unworthy, but because presence was never built. This playbook gives every firm the architecture to be found.
                </p>
              </HeroLoadFade>

              <HeroLoadFade delay={450}>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[
                    ["$218", "Full stack / month"],
                    ["14", "Module pipeline"],
                    ["3", "Autonomous engines"],
                    ["0", "Agency dependency"],
                  ].map(([num, label]) => (
                    <div key={label}>
                      <div style={syne} className="text-[32px] font-extrabold text-[#00D4D4] leading-none">{num}</div>
                      <div style={mono} className="mt-2 text-[9px] text-[#888888] uppercase tracking-[0.12em]">{label}</div>
                    </div>
                  ))}
                </div>
              </HeroLoadFade>

              <HeroLoadFade delay={600} className="mt-9">
                <OfferBox progressKey="hero" />
              </HeroLoadFade>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE MATH */}
      <section className="bg-black">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-[100px]">
          <FadeUp>
            <SectionLabel>THE HONEST CALCULATION</SectionLabel>
            <h2 style={syne} className="font-extrabold text-white leading-[1.05]">
              <span style={{ fontSize: "clamp(28px,4vw,52px)", display: "inline-block" }}>
                What you're actually<br />paying for right now.
              </span>
            </h2>
          </FadeUp>

          <div className="mt-12 grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Image — appears first on mobile, right column on desktop */}
            <FadeUp delay={0} className="lg:order-2 relative min-h-[70vw] lg:min-h-[520px] overflow-hidden">
              <img
                src={backCover.url}
                alt="What Web3 firms spend annually — AI Infrastructure Stack $218/mo"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[45%] lg:hidden"
                style={{ background: "linear-gradient(to bottom, transparent 0%, #000000 100%)" }}
              />
            </FadeUp>

            {/* Cost comparison tables stacked — left column on desktop */}
            <div className="lg:order-1 flex flex-col gap-6">
              <FadeUp delay={60}>
                <div className="bg-[#0F0F0F] border border-[#1A1A1A] border-t-2 border-t-[#FF4444] p-8 h-full">
                  <div style={mono} className="text-[10px] text-[#888888] uppercase tracking-[0.18em] mb-5">RENTED GROUND</div>
                  <ul className="space-y-3 text-[13px]">
                    {[
                      ["SEO Retainer", "$36,000–$120,000/yr"],
                      ["Content & Articles", "$24,000–$60,000/yr"],
                      ["Community Management", "$36,000–$96,000/yr"],
                      ["PR & Press Placements", "$18,000–$60,000/yr"],
                      ["Influencer Campaigns", "$60,000–$300,000/yr"],
                    ].map(([k, v]) => (
                      <li key={k} className="flex justify-between gap-3">
                        <span className="text-white">{k}</span>
                        <span style={mono} className="text-[#FF4444]">{v}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[#1A1A1A] mt-6 pt-5 flex justify-between items-baseline">
                    <span style={syne} className="font-bold text-white text-[15px]">TOTAL RENTED SPEND</span>
                    <span style={syne} className="font-bold text-[#FF4444] text-[20px]">$300K–$1M+/yr</span>
                  </div>
                  <div style={mono} className="text-[10px] text-[#888888] mt-4">Stops when budget stops. No compounding. No ownership.</div>
                </div>
              </FadeUp>

              <FadeUp delay={120}>
                <div className="bg-[#0F0F0F] border border-[#1A1A1A] border-t-2 border-t-[#00D4D4] p-8 h-full">
                  <div style={mono} className="text-[10px] text-[#888888] uppercase tracking-[0.18em] mb-5">OWNED INFRASTRUCTURE</div>
                  <ul className="space-y-3 text-[13px]">
                    {[
                      ["Make.com automation", "$29/mo"],
                      ["Supabase database", "$25/mo"],
                      ["Voiceflow assistant", "$50/mo"],
                      ["Lovable build environment", "$25/mo"],
                      ["Gemini + Perplexity APIs", "~$40/mo"],
                    ].map(([k, v]) => (
                      <li key={k} className="flex justify-between gap-3">
                        <span className="text-white">{k}</span>
                        <span style={mono} className="text-[#00D4D4]">{v}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[#1A1A1A] mt-6 pt-5 flex justify-between items-baseline">
                    <span style={syne} className="font-bold text-white text-[15px]">FULL STACK MONTHLY</span>
                    <span style={syne} className="font-bold text-[#00D4D4] text-[20px]">$218/mo</span>
                  </div>
                  <div style={mono} className="text-[10px] text-[#888888] mt-4">Runs continuously. Compounds monthly. Full ownership.</div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT'S INSIDE */}
      <section className="bg-black">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-[100px]">
          <FadeUp>
            <SectionLabel>WHAT'S INSIDE</SectionLabel>
            <h2 style={syne} className="font-extrabold text-white leading-[1.05]">
              <span style={{ fontSize: "clamp(28px,4vw,52px)", display: "inline-block" }}>
                11 chapters.<br />Everything you need to build.
              </span>
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-px bg-[#1A1A1A]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
            {chapters.map(([title, desc], i) => (
              <FadeUp key={title} delay={i * 60}>
                <div className="bg-[#0F0F0F] p-7 h-full hover:bg-[#141414] transition-colors duration-200">
                  <div style={mono} className="text-[10px] text-[#00D4D4] tracking-[0.18em]">CHAPTER {String(i + 1).padStart(2, "0")}</div>
                  <h3 style={syne} className="font-bold text-white text-[14px] leading-[1.3] mt-2 mb-2">{title}</h3>
                  <p className="text-[12px] text-[#888888] leading-[1.6]">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — BLUEPRINT BONUS */}
      <section className="bg-black">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 pb-[100px]">
          <div className="bg-[#0F0F0F] border border-[#1A1A1A] border-l-[3px] border-l-[#00D4D4] p-6 md:p-10 lg:p-12 grid md:grid-cols-2 gap-10">
            <FadeUp>
              <span style={mono} className="inline-block bg-[#00D4D4] text-black text-[9px] uppercase tracking-[0.18em] px-2.5 py-1">
                BONUS · FIRST 100 COPIES ONLY
              </span>
              <h3 style={syne} className="font-extrabold text-white text-[28px] leading-[1.1] mt-4">
                The Make.com 14-Module<br />Content Pipeline Blueprint
              </h3>
              <p className="text-[14px] text-[#AAAAAA] leading-[1.7] mt-4">
                A standalone reference document you open at your desk while building. Every module named. Every configuration described. The book tells you why. This blueprint tells you exactly what to do.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {pipelineModules.map((m) => (
                  <span
                    key={m}
                    style={mono}
                    className="text-[9px] text-[#00D4D4] px-2.5 py-1"
                  >
                    <span style={{ border: "1px solid rgba(0,212,212,0.3)", padding: "4px 10px", display: "inline-block" }}>{m}</span>
                  </span>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={150}>
              <div className="bg-[#080808] border border-[#1A1A1A] p-7">
                <div style={mono} className="text-[9px] text-[#555555] uppercase tracking-[0.2em] mb-4">PIPELINE FLOW</div>
                <div style={mono} className="text-[10px] text-white space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Node>SHEETS</Node><Arrow>→</Arrow><Node>PERPLEXITY</Node><Arrow>→</Arrow><Node>GEMINI</Node>
                  </div>
                  <div className="text-[#00D4D4] pl-2">↓</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Node>IMG PROMPT</Node><Arrow>→</Arrow><Node>IMAGEN</Node><Arrow>→</Arrow><Node>SUPABASE</Node>
                  </div>
                  <div className="text-[#00D4D4] pl-2">↓</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Node>METADATA</Node><Arrow>→</Arrow><Node>DB RECORD</Node><Arrow>→</Arrow><Node>NETLIFY</Node>
                  </div>
                  <div className="text-[#00D4D4] pl-2">↓</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#141414] px-3 py-1.5 border border-[#00D4D4] text-[#00D4D4]">POST IS LIVE ✓</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHO IT'S FOR */}
      <section className="bg-black">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-[100px]">
          <FadeUp>
            <SectionLabel>BUILT FOR</SectionLabel>
            <h2 style={syne} className="font-extrabold text-white leading-[1.05]">
              <span style={{ fontSize: "clamp(28px,4vw,52px)", display: "inline-block" }}>
                If your organization is serious,<br />this is for you.
              </span>
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-px bg-[#1A1A1A] sm:grid-cols-2 lg:grid-cols-3">
            {icps.map(([title, desc], i) => (
              <FadeUp key={title} delay={i * 60}>
                <div className="bg-[#0F0F0F] p-7 h-full hover:bg-[#141414] transition-colors duration-200">
                  <h3 style={syne} className="font-bold text-white text-[15px] leading-[1.3] mb-2">{title}</h3>
                  <p className="text-[12px] text-[#888888] leading-[1.6]">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — CINEMATIC BREAK + AUTHOR */}
      <section className="bg-black">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-[100px] grid lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          <FadeUp className="lg:order-1 relative min-h-[80vw] lg:min-h-[560px] overflow-hidden">
            <img
              src={satoshi.url}
              alt="Anonymous reader holding the playbook by terminal light"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[45%] lg:hidden"
              style={{ background: "linear-gradient(to bottom, transparent 0%, #000000 100%)" }}
            />
          </FadeUp>
          <div className="lg:order-2 flex flex-col justify-center">
            <FadeUp>
              <div style={mono} className="text-[9px] text-[#555555] uppercase tracking-[0.2em]">WRITTEN BY</div>
              <div style={syne} className="font-extrabold text-white text-[40px] leading-none mt-3">ND Nwankwo</div>
              <div style={mono} className="text-[11px] text-[#00D4D4] mt-2">Founder, ArtiNovate</div>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="text-[14px] text-[#AAAAAA] leading-[1.8] space-y-4 mt-6">
              <p>I am not a Web3 expert. I do not speak the language of tokenomics with the fluency of someone who has lived inside a protocol for five years. I will not pretend otherwise.</p>
              <p>What I have is something different. I have an eye for patterns. I watch how organizations present themselves to the world and I notice the distance between what they have built and what the world can see.</p>
              <p>That positioning — sitting at the intersection of AI infrastructure and Web3 visibility — is what qualifies me to write this. Not expertise in your technology. Expertise in how your technology gets seen.</p>
              <p className="text-[15px] text-[#00D4D4] mt-4">That is a different thing entirely. And it is the only thing this book is about.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="bg-black text-center px-5 md:px-10 lg:px-20 py-[100px]">
        <div className="max-w-[1280px] mx-auto">
        <FadeUp>
          <SectionLabel center>ONE DECISION</SectionLabel>
          <h2 style={syne} className="font-extrabold text-white leading-[1.05]">
            <span style={{ fontSize: "clamp(36px,5vw,64px)", display: "inline-block" }}>
              Build once.<br /><span className="text-[#00D4D4]">Compound forever.</span>
            </span>
          </h2>
          <p className="text-[16px] text-[#888888] max-w-[480px] mx-auto mt-6 mb-12 leading-[1.7]">
            The organizations that lead Web3 over the next decade will lead because they built presence that made their technology impossible to ignore.
          </p>
        </FadeUp>
        <div className="max-w-[460px] mx-auto">
          <OfferBox progressKey="final" />
        </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Node({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-[#141414] border border-[#1A1A1A] text-white px-3 py-1.5">{children}</span>
  );
}
function Arrow({ children }: { children: React.ReactNode }) {
  return <span className="text-[#00D4D4]">{children}</span>;
}