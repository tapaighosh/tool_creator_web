"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type GlowColor = "indigo" | "violet" | "cyan" | "green" | "orange";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  /** Controls the hover glow + border accent colour. Defaults to 'indigo'. */
  glowColor?: GlowColor;
}

// ─── Glow / border maps ───────────────────────────────────────────────────────
// All glow opacities capped at 0.3 per DESIGN.md §8 prohibition.

/**
 * Tailwind group-hover classes that drive border colour on hover.
 * Applied to the outer motion.div so we can keep the Tailwind purge
 * scanner happy with full class strings.
 */
const hoverBorderMap: Record<GlowColor, string> = {
  indigo: "hover:border-indigo-500/40",
  violet: "hover:border-violet-500/40",
  cyan: "hover:border-cyan-500/40",
  green: "hover:border-emerald-500/40",
  orange: "hover:border-orange-500/40",
};

/**
 * Tailwind arbitrary-value shadow classes for the hover glow.
 * rgba opacities stay at 0.25–0.30 (DESIGN.md cap).
 */
const hoverGlowMap: Record<GlowColor, string> = {
  indigo:
    "hover:shadow-[0_0_30px_rgba(99,102,241,0.25),0_0_60px_rgba(99,102,241,0.08)]",
  violet:
    "hover:shadow-[0_0_30px_rgba(139,92,246,0.25),0_0_60px_rgba(139,92,246,0.08)]",
  cyan: "hover:shadow-[0_0_30px_rgba(6,182,212,0.25),0_0_60px_rgba(6,182,212,0.08)]",
  green:
    "hover:shadow-[0_0_30px_rgba(16,185,129,0.25),0_0_60px_rgba(16,185,129,0.08)]",
  orange:
    "hover:shadow-[0_0_30px_rgba(249,115,22,0.25),0_0_60px_rgba(249,115,22,0.08)]",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AnimatedCard
 *
 * Glassmorphism card wrapper. Applies the `.glass-card` utility (from
 * globals.css) for the frosted-glass base, then adds a coloured hover glow
 * and a Framer Motion spring scale on cursor enter.
 *
 * Scale is applied only to this element via FM — no layout shift to siblings
 * (DESIGN.md prohibition §9).
 *
 * @example
 * <AnimatedCard glowColor="violet" className="p-6">
 *   <h3>Card Title</h3>
 * </AnimatedCard>
 */
const AnimatedCard = ({
  children,
  className = "",
  glowColor = "indigo",
}: AnimatedCardProps) => {
  return (
    <motion.div
      // ── Framer Motion spring hover scale ──────────────────────────────────
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className={[
        // ── Glass base (defined in globals.css) ───────────────────────────
        "glass-card",
        // ── Pointer + transition ──────────────────────────────────────────
        "cursor-pointer transition-all duration-300 ease-out",
        // ── Hover: coloured border ────────────────────────────────────────
        hoverBorderMap[glowColor],
        // ── Hover: neon glow (capped per DESIGN.md) ───────────────────────
        hoverGlowMap[glowColor],
        // ── Reduced-motion guard ──────────────────────────────────────────
        "motion-reduce:transition-none",
        // ── Caller overrides ─────────────────────────────────────────────
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
