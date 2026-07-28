"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import GlowButton from "@/components/ui/GlowButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeColor = "indigo" | "violet" | "cyan" | "green" | "orange";

interface SolutionCardProps {
  /** Card heading — identifies the AI solution */
  title: string;
  /** One-paragraph product description (≤30 words optimal) */
  description: string;
  /** Bullet-point capabilities shown in the feature list */
  features: string[];
  /** Lucide ReactNode — rendered at 48px inside a 96px box */
  icon: ReactNode;
  /** 0-based position in the solutions list; drives alternating layout */
  index: number;
  /** Accent colour applied to icon box, check marks, and header line */
  badgeColor: BadgeColor;
}

// ─── Color Maps (DESIGN.md tokens only) ─────────────────────────────────────

const iconBgMap: Record<BadgeColor, string> = {
  indigo: "bg-indigo-500/20",
  violet: "bg-violet-500/20",
  cyan: "bg-cyan-500/20",
  green: "bg-emerald-500/20",
  orange: "bg-orange-500/20",
};

const iconColorMap: Record<BadgeColor, string> = {
  indigo: "text-indigo-400",
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  green: "text-emerald-400",
  orange: "text-orange-400",
};

const checkColorMap: Record<BadgeColor, string> = {
  indigo: "text-indigo-400",
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  green: "text-emerald-400",
  orange: "text-orange-400",
};

const headerLineMap: Record<BadgeColor, string> = {
  indigo: "from-indigo-500/40 to-transparent",
  violet: "from-violet-500/40 to-transparent",
  cyan: "from-cyan-500/40 to-transparent",
  green: "from-emerald-500/40 to-transparent",
  orange: "from-orange-500/40 to-transparent",
};

// ─── Animation Variants ──────────────────────────────────────────────────────

const REVEAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Sub-components ──────────────────────────────────────────────────────────

interface VisualPaneProps {
  icon: ReactNode;
  title: string;
  description: string;
  badgeColor: BadgeColor;
}

const VisualPane = ({ icon, title, description, badgeColor }: VisualPaneProps) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left">
    {/* Icon box — 96×96px, rounded-2xl */}
    <div
      className={[
        "flex items-center justify-center",
        "w-24 h-24 rounded-2xl",
        iconBgMap[badgeColor],
        iconColorMap[badgeColor],
        // Subtle surface ring for depth (DESIGN.md border-default token)
        "ring-1 ring-white/[0.08]",
      ].join(" ")}
      aria-hidden="true"
    >
      {/*
       * Force the icon SVG to exactly 48px × 48px via an explicit
       * Tailwind sizing span. The icon prop is a ReactNode (e.g. <Phone size={48} />)
       * so the container enforces the display size without mutating the element.
       */}
      <span className="flex items-center justify-center w-12 h-12 [&>svg]:w-12 [&>svg]:h-12">
        {icon}
      </span>
    </div>

    {/* Title — Space Grotesk, H2 semantics handled at page level */}
    <p
      className={[
        "mt-4 text-2xl md:text-3xl font-bold text-white",
        "font-[family-name:var(--font-space-grotesk)]",
        "leading-tight tracking-tight",
      ].join(" ")}
    >
      {title}
    </p>

    {/* Description */}
    <p className="mt-2 text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
);

interface TextPaneProps {
  title: string;
  features: string[];
  badgeColor: BadgeColor;
  shouldReduceMotion: boolean;
}

const TextPane = ({ title, features, badgeColor, shouldReduceMotion }: TextPaneProps) => {
  const featureItemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -12 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: REVEAL_EASE,
        delay: shouldReduceMotion ? 0 : 0.1 + i * 0.07,
      },
    }),
  };

  return (
    <div className="flex flex-col">
      {/* "Key Features" header with accent underline */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className={[
            "h-px w-12 bg-gradient-to-r flex-shrink-0",
            headerLineMap[badgeColor],
          ].join(" ")}
          aria-hidden="true"
        />
        <span
          className={[
            "text-xs font-semibold tracking-widest uppercase",
            iconColorMap[badgeColor],
          ].join(" ")}
        >
          Key Features
        </span>
      </div>

      {/* Feature list */}
      <ul
        className="space-y-3"
        role="list"
        aria-label={`${title} key features`}
      >
        {features.map((feature, i) => (
          <motion.li
            key={feature}
            custom={i}
            variants={featureItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex items-start gap-3"
          >
            <CheckCircle2
              size={18}
              className={["flex-shrink-0 mt-0.5", checkColorMap[badgeColor]].join(" ")}
              aria-hidden="true"
            />
            <span className="text-slate-300 text-sm leading-relaxed">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-6">
        <GlowButton variant="outline" size="sm" href="/contact">
          Learn More →
        </GlowButton>
      </div>
    </div>
  );
};

// ─── SolutionCard ─────────────────────────────────────────────────────────────

/**
 * SolutionCard
 *
 * Alternating two-column feature showcase card for the /solutions page.
 * Even-indexed cards (0, 2, 4): visual (icon + title + description) on left,
 * features on right. Odd-indexed cards (1, 3): features on left, visual on right.
 *
 * Respects `prefers-reduced-motion` — disables directional entrance and
 * staggered feature item animations when the preference is active.
 *
 * @example
 * <SolutionCard
 *   title="WhatsApp AI Assistant"
 *   description="Automate customer conversations 24/7"
 *   features={["Natural language understanding", "Multi-language support"]}
 *   icon={<MessageCircle size={48} />}
 *   index={0}
 *   badgeColor="green"
 * />
 */
const SolutionCard = ({
  title,
  description,
  features,
  icon,
  index,
  badgeColor,
}: SolutionCardProps) => {
  const isEven = index % 2 === 0;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : isEven ? -30 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: REVEAL_EASE,
      },
    },
  };

  const visualPane = (
    <VisualPane
      icon={icon}
      title={title}
      description={description}
      badgeColor={badgeColor}
    />
  );

  const textPane = (
    <TextPane
      title={title}
      features={features}
      badgeColor={badgeColor}
      shouldReduceMotion={shouldReduceMotion}
    />
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <AnimatedCard glowColor={badgeColor} className="p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {isEven ? (
            <>
              {visualPane}
              {textPane}
            </>
          ) : (
            <>
              {textPane}
              {visualPane}
            </>
          )}
        </div>
      </AnimatedCard>
    </motion.div>
  );
};

export default SolutionCard;
