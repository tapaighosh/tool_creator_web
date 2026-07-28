import React, { ElementType, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AllowedTag = "h1" | "h2" | "h3" | "h4" | "span" | "p";

interface GradientTextProps {
  /** Text or nodes to render inside the gradient */
  children: ReactNode;
  /** Extra Tailwind classes — use for font-size, font-weight, tracking, etc. */
  className?: string;
  /** HTML element to render; defaults to 'span' for inline usage */
  tag?: AllowedTag;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GradientText
 *
 * Renders `children` with the project's signature electric-indigo → purple →
 * cyan gradient clipped to the text. Polymorphic via the `tag` prop so it
 * works correctly as a heading or inline element without extra wrappers.
 *
 * @example
 * // Inline usage (default)
 * <GradientText>AI Tool Creator</GradientText>
 *
 * @example
 * // Heading usage with size override
 * <GradientText tag="h1" className="text-6xl font-bold tracking-tight">
 *   Build Smarter AI Tools
 * </GradientText>
 */
const GradientText = ({
  children,
  className = "",
  tag = "span",
}: GradientTextProps) => {
  const Tag = tag as ElementType;

  return (
    <Tag
      className={[
        // ── Gradient fill ────────────────────────────────────────────────
        "bg-gradient-to-r",
        "from-indigo-400",
        "via-purple-400",
        "to-cyan-400",
        "bg-clip-text",
        "text-transparent",
        // ── Inline-block ensures bg-clip-text works on block elements ────
        "inline-block",
        // ── Caller overrides (font-size, weight, tracking, etc.) ─────────
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
};

export default GradientText;
