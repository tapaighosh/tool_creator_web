"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionBadgeProps {
  /** Label text — rendered uppercase */
  children: string;
  /** Optional Lucide icon (or any ReactNode) rendered before the text */
  icon?: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * SectionBadge
 *
 * Small pill badge used to label page sections (e.g. "Our Services",
 * "Why Choose Us"). Styled with the project's indigo accent glass look and
 * animates in on first render.
 *
 * @example
 * import { Sparkles } from "lucide-react";
 * <SectionBadge icon={<Sparkles size={12} />}>Our Services</SectionBadge>
 */
const SectionBadge = ({ children, icon }: SectionBadgeProps) => {
  return (
    <motion.span
      // ── Entrance animation (reveal token: 0.5s spring) ──────────────────
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // DESIGN.md reveal easing
      }}
      className={[
        // Shape
        "inline-flex items-center gap-2 rounded-full",
        // Glass fill — indigo accent tint
        "bg-indigo-500/10",
        // Border — accent border token rgba(99,102,241,0.30)
        "border border-indigo-500/30",
        // Text
        "text-indigo-300 text-xs font-medium",
        // Spacing & tracking
        "px-4 py-1.5 tracking-wider uppercase",
        // Ensure icon + text are vertically centred
        "leading-none",
      ].join(" ")}
    >
      {icon && (
        <span className="flex-shrink-0 opacity-80" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </motion.span>
  );
};

export default SectionBadge;
