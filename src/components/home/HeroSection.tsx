"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  ArrowRight,
  Play,
  ChevronDown,
  Cpu,
  Clock,
  Puzzle,
} from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import GradientText from "@/components/ui/GradientText";
import SectionBadge from "@/components/ui/SectionBadge";

// ─── Animation helpers ────────────────────────────────────────────────────────

/**
 * Shared reveal variant.
 * prefers-reduced-motion is handled by Framer Motion's MotionConfig
 * when shouldReduceMotion is true — we pass static variants in that case.
 */
const makeReveal = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
  },
});

// ─── Stat items ───────────────────────────────────────────────────────────────

const STATS = [
  { icon: <Cpu size={20} aria-hidden="true" />, value: "500+", label: "AI Agents Built" },
  { icon: <Clock size={20} aria-hidden="true" />, value: "24/7", label: "Uptime" },
  { icon: <Puzzle size={20} aria-hidden="true" />, value: "50+", label: "Integrations" },
] as const;

// ─── HeroSection ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // When reduced-motion is preferred, skip all translate/opacity transitions
  const staticReveal = {
    initial: {},
    animate: {},
    transition: { duration: 0 },
  };

  const reveal = (delay: number) =>
    shouldReduceMotion ? staticReveal : makeReveal(delay);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0F1E]"
      aria-label="Hero"
    >
      {/* ── Background layers ───────────────────────────────────────────── */}

      {/* Layer 1: Primary radial orb — top-center */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Secondary violet orb — bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.4,
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 4: Noise texture for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      {/* Layer 5: Fade-to-dark at bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #0A0F1E 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div {...reveal(0)}>
          <SectionBadge icon={<Bot size={12} aria-hidden="true" />}>
            AI-Powered Business Automation
          </SectionBadge>
        </motion.div>

        {/* H1 — Line 1 */}
        <motion.h1
          {...reveal(0.1)}
          className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white font-[var(--font-space-grotesk,sans-serif)]"
        >
          Transform Your Business with
        </motion.h1>

        {/* H1 — Line 2: animated gradient */}
        <motion.div {...reveal(0.2)} className="mt-2 sm:mt-3">
          <GradientText
            tag="span"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] block font-[var(--font-space-grotesk,sans-serif)]"
          >
            AI Automation
          </GradientText>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...reveal(0.3)}
          className="mt-8 text-xl md:text-2xl text-slate-300 font-light max-w-2xl"
        >
          Build Powerful AI Agents That Work 24/7
        </motion.p>

        {/* Description */}
        <motion.p
          {...reveal(0.4)}
          className="mt-4 text-base text-slate-400 max-w-2xl leading-relaxed"
        >
          We help startups, SMEs, enterprises, and agencies automate customer
          support, lead generation, sales, marketing, and business operations
          using custom AI Agents powered by the latest Artificial Intelligence
          technologies.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...reveal(0.5)}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          <GlowButton href="/contact" variant="primary" size="lg">
            Book Free Consultation
            <ArrowRight size={18} aria-hidden="true" />
          </GlowButton>

          <GlowButton href="#demo" variant="outline" size="lg">
            <Play size={18} aria-hidden="true" />
            See Live Demo
          </GlowButton>
        </motion.div>

        {/* ── Stats row ──────────────────────────────────────────────────── */}
        <div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          role="list"
          aria-label="Key statistics"
        >
          {STATS.map(({ icon, value, label }, i) => (
            <motion.div
              key={label}
              role="listitem"
              {...(shouldReduceMotion
                ? staticReveal
                : makeReveal(0.6 + i * 0.1))}
            >
              {/* glass-card base + custom padding */}
              <div
                className={[
                  "glass-card",
                  "flex items-center gap-3 px-6 py-4",
                  "cursor-default",
                  "transition-all duration-300",
                  "hover:border-indigo-500/40",
                  "hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                <span className="text-indigo-400 flex-shrink-0">{icon}</span>
                <div className="flex flex-col items-start">
                  <span className="text-2xl font-bold text-white leading-none">
                    {value}
                  </span>
                  <span className="text-sm text-slate-400 mt-0.5">{label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={shouldReduceMotion ? { opacity: 0.5 } : { opacity: [0, 0.6, 0] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
        }
        aria-hidden="true"
      >
        <span className="text-slate-600 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { y: [0, 6, 0] }
          }
          transition={
            shouldReduceMotion
              ? {}
              : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown size={20} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
