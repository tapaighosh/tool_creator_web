"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  MonitorPlay,
  Phone,
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import GlowButton from "@/components/ui/GlowButton";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Types & Constants ────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CtaOption {
  icon: React.ElementType;
  badge?: string;
  title: string;
  description: string;
  detail: string;
  buttonLabel: string;
  variant: "primary" | "outline";
  glowColor: "indigo" | "violet" | "cyan" | "green" | "orange";
  iconColor: string;
  iconBg: string;
  href: string;
}

// ─── CTA Data ─────────────────────────────────────────────────────────────────

const CTA_OPTIONS: CtaOption[] = [
  {
    icon: CalendarDays,
    badge: "Most popular",
    title: "Free Consultation",
    description:
      "30-minute strategy call with a senior AI engineer to map your automation goals.",
    detail: "No commitment · Free",
    buttonLabel: "Book Now",
    variant: "primary",
    glowColor: "indigo",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/12",
    href: "/contact#lead-form",
  },
  {
    icon: MonitorPlay,
    title: "Live Demo",
    description:
      "See a real AI agent handling live conversations in your industry — tailored to your use case.",
    detail: "45 min · Interactive",
    buttonLabel: "Request Demo",
    variant: "outline",
    glowColor: "violet",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/12",
    href: "/contact#lead-form",
  },
  {
    icon: Phone,
    title: "Discovery Call",
    description:
      "Deep-dive into your tech stack, integrations, and timelines with our solutions team.",
    detail: "60 min · Technical",
    buttonLabel: "Schedule Call",
    variant: "outline",
    glowColor: "cyan",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/12",
    href: "/contact#lead-form",
  },
  {
    icon: FileText,
    title: "Custom Proposal",
    description:
      "Receive a detailed project scope, timeline, and fixed-price quote within 24 hours.",
    detail: "24h turnaround · Fixed price",
    buttonLabel: "Get Proposal",
    variant: "outline",
    glowColor: "green",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/12",
    href: "/contact#lead-form",
  },
  {
    icon: Sparkles,
    title: "AI Transformation",
    description:
      "Full audit of your business processes and a roadmap to automate the highest-impact workflows.",
    detail: "Enterprise · Comprehensive",
    buttonLabel: "Get Started",
    variant: "outline",
    glowColor: "orange",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/12",
    href: "/contact#lead-form",
  },
] as const;

// ─── CTA Card ─────────────────────────────────────────────────────────────────

function CtaCard({
  option,
  delay,
  reduced,
}: {
  option: CtaOption;
  delay: number;
  reduced: boolean;
}) {
  const {
    icon: Icon,
    badge,
    title,
    description,
    detail,
    buttonLabel,
    variant,
    glowColor,
    iconColor,
    iconBg,
    href,
  } = option;

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 30 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className="h-full"
    >
      <AnimatedCard glowColor={glowColor} className="p-6 h-full flex flex-col relative">
        {/* "Most popular" badge */}
        {badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Zap size={9} aria-hidden="true" />
              {badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}
          aria-hidden="true"
        >
          <Icon size={20} className={iconColor} />
        </div>

        {/* Text */}
        <h3 className="text-base font-bold text-white mb-2 font-[family-name:var(--font-space-grotesk)] leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
          {description}
        </p>

        {/* Detail pill */}
        <div className="flex items-center gap-1.5 mb-5">
          <Clock size={11} className="text-slate-600 flex-shrink-0" aria-hidden="true" />
          <span className="text-[11px] text-slate-600 leading-none">{detail}</span>
        </div>

        {/* CTA button */}
        <GlowButton
          variant={variant}
          size="sm"
          href={href}
          className="w-full justify-center"
        >
          {buttonLabel}
          <ArrowRight size={14} aria-hidden="true" />
        </GlowButton>
      </AnimatedCard>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * CTAOptions
 *
 * 5-card grid (lg: 5 cols) of engagement pathways.
 * Purpose: Convert intent into action — give visitors multiple low-friction
 * entry points matching their readiness level.
 *
 * Delight anchor: the "Most popular" floating badge on card 1 creates
 * a social-proof anchor that subtly directs the eye to the primary CTA.
 */
export default function CTAOptions() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative py-20 lg:py-28 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="cta-options-heading"
    >
      {/* Ambient blobs */}
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex justify-center mb-5">
            <SectionBadge icon={<Sparkles size={12} aria-hidden="true" />}>
              Get Started
            </SectionBadge>
          </div>

          <h2
            id="cta-options-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-tight"
          >
            Ready to Build Your{" "}
            <GradientText className="font-bold">AI Workforce?</GradientText>
          </h2>

          <p className="mt-5 text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the engagement that fits where you are right now. No pressure,
            no pushy sales — just a clear next step.
          </p>
        </motion.div>

        {/* 5-card grid — single col mobile → 2-col md → 3-col lg → 5-col xl */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          role="list"
          aria-label="Engagement options"
        >
          {CTA_OPTIONS.map((option, i) => (
            <div key={option.title} role="listitem">
              <CtaCard
                option={option}
                delay={reduced ? 0 : i * 0.08}
                reduced={reduced}
              />
            </div>
          ))}
        </div>

        {/* Bottom reassurance strip */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={reduced ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          aria-label="Reassurance points"
        >
          {[
            "No commitment required",
            "Free initial consultation",
            "Response within 24 hours",
          ].map((point) => (
            <span
              key={point}
              className="flex items-center gap-2 text-xs text-slate-500"
            >
              <span
                className="w-1 h-1 rounded-full bg-indigo-400/50"
                aria-hidden="true"
              />
              {point}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
