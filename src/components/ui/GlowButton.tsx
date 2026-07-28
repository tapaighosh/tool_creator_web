"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface GlowButtonProps {
  /** Button label / content */
  children: ReactNode;
  /** Click handler — used when rendered as <button> */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** If provided, renders an <a> tag instead of <button> */
  href?: string;
  /** Visual style */
  variant?: Variant;
  /** Size preset */
  size?: Size;
  /** Additional Tailwind classes */
  className?: string;
  /** Disabled state — applies opacity + blocks pointer events */
  disabled?: boolean;
  /** Forwarded to <a>; ignored for <button> */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantClasses: Record<Variant, string> = {
  primary: [
    // Background gradient (indigo → violet, per DESIGN.md --gradient-brand)
    "bg-gradient-to-r from-indigo-600 to-purple-600",
    // Text
    "text-white font-semibold",
    // Hover glow — capped at rgba(99,102,241,0.40) per design prohibition §8
    "hover:shadow-[0_0_30px_rgba(99,102,241,0.4),0_0_60px_rgba(99,102,241,0.1)]",
    // Subtle brightness lift instead of layout-shifting scale on parent
    "hover:brightness-110",
  ].join(" "),

  outline: [
    // Base border (accent border token: rgba(99,102,241,0.40))
    "border border-indigo-500/40 text-indigo-400",
    // Background transparent base
    "bg-transparent",
    // Hover: fill + border sharpens + soft indigo glow
    "hover:bg-indigo-500/10 hover:border-indigo-400",
    "hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]",
    "hover:text-indigo-300",
  ].join(" "),

  ghost: [
    "text-slate-400 bg-transparent",
    "hover:text-white hover:bg-white/5",
  ].join(" "),
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

// Shared base classes (all variants)
const baseClasses = [
  // Layout
  "inline-flex items-center justify-center gap-2",
  // Shape
  "rounded-xl",
  // Typography
  "font-semibold leading-none",
  // Interaction
  "cursor-pointer",
  // Transition — 300ms per DESIGN.md interaction token
  "transition-all duration-300 ease-out",
  // Accessibility — visible focus ring
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]",
  // Reduced-motion override (all animations will be suppressed by FM when the
  // media query fires, but we also strip the CSS hover transitions here)
  "motion-reduce:transition-none",
].join(" ");

const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

// Framer Motion shared spring config (200–300ms interaction token)
const tapAnim = { scale: 0.97 };
const hoverAnim = { scale: 1.02 };
const transition = { type: "spring", stiffness: 400, damping: 25 } as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlowButton
 *
 * Polymorphic: renders `<button>` by default; renders `<a>` when `href` is
 * supplied. All variants share the neon-indigo design language from DESIGN.md.
 *
 * @example
 * <GlowButton variant="primary" size="lg" href="/contact">
 *   Get Started <ArrowRight size={18} />
 * </GlowButton>
 *
 * @example
 * <GlowButton variant="outline" onClick={handleClick}>
 *   Learn More
 * </GlowButton>
 */
const GlowButton = ({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  target,
  rel,
}: GlowButtonProps) => {
  const composedClass = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? disabledClasses : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={composedClass}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        whileHover={disabled ? undefined : hoverAnim}
        whileTap={disabled ? undefined : tapAnim}
        transition={transition}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={composedClass}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      whileHover={disabled ? undefined : hoverAnim}
      whileTap={disabled ? undefined : tapAnim}
      transition={transition}
    >
      {children}
    </motion.button>
  );
};

export default GlowButton;
