"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Rocket,
  Shield,
  Cloud,
  Languages,
  Cpu,
  Sparkles,
  Bot,
  GitFork,
  Lock,
  Server,
} from "lucide-react";
import GradientText from "@/components/ui/GradientText";
import SectionBadge from "@/components/ui/SectionBadge";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Types ────────────────────────────────────────────────────────────────────

type GlowColor = "indigo" | "violet" | "cyan" | "green" | "orange";

interface Feature {
  name: string;
  description: string;
  icon: React.ReactNode;
  /** Tailwind text color class for the icon */
  iconColor: string;
  /** Tailwind bg color class for the icon box */
  iconBg: string;
  /** Tailwind border-l color class for hover accent */
  borderAccent: string;
  glowColor: GlowColor;
}

// ─── Feature data ─────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    name: "AI Experts",
    description:
      "Seasoned ML engineers with deep domain expertise across GPT-4, Claude, Gemini, and custom fine-tuned models.",
    icon: <Brain size={24} aria-hidden="true" />,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-600/20",
    borderAccent: "group-hover:border-l-indigo-500",
    glowColor: "indigo",
  },
  {
    name: "Custom Development",
    description:
      "No off-the-shelf configs. Every agent is purpose-built for your workflow, data, and stack.",
    icon: <Code2 size={24} aria-hidden="true" />,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-600/20",
    borderAccent: "group-hover:border-l-violet-500",
    glowColor: "violet",
  },
  {
    name: "Fast Deployment",
    description:
      "From kick-off to production in 48–72 hours. We ship working agents, not slide decks.",
    icon: <Rocket size={24} aria-hidden="true" />,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-600/20",
    borderAccent: "group-hover:border-l-orange-500",
    glowColor: "orange",
  },
  {
    name: "Secure Architecture",
    description:
      "SOC 2-aligned design, end-to-end encryption, and role-based access on every deployment.",
    icon: <Shield size={24} aria-hidden="true" />,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-600/20",
    borderAccent: "group-hover:border-l-emerald-500",
    glowColor: "green",
  },
  {
    name: "Cloud Based",
    description:
      "Hosted on enterprise-grade infrastructure with auto-scaling and 99.9% uptime SLAs.",
    icon: <Cloud size={24} aria-hidden="true" />,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-600/20",
    borderAccent: "group-hover:border-l-cyan-500",
    glowColor: "cyan",
  },
  {
    name: "Multi-language Support",
    description:
      "Agents that converse fluently in 50+ languages — out of the box, no extra training.",
    icon: <Languages size={24} aria-hidden="true" />,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-600/20",
    borderAccent: "group-hover:border-l-indigo-500",
    glowColor: "indigo",
  },
  {
    name: "OpenAI Integration",
    description:
      "Deep GPT-4o and o1 integrations with function calling, retrieval, and custom fine-tuning.",
    icon: <Cpu size={24} aria-hidden="true" />,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-600/20",
    borderAccent: "group-hover:border-l-emerald-500",
    glowColor: "green",
  },
  {
    name: "Google Gemini Integration",
    description:
      "Gemini 1.5 Pro and Flash for multimodal agents with native Google Workspace connectivity.",
    icon: <Sparkles size={24} aria-hidden="true" />,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-600/20",
    borderAccent: "group-hover:border-l-blue-500",
    glowColor: "cyan",
  },
  {
    name: "Claude Integration",
    description:
      "Anthropic Claude 3.5 Sonnet and Opus for reasoning-heavy and long-context enterprise tasks.",
    icon: <Bot size={24} aria-hidden="true" />,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-600/20",
    borderAccent: "group-hover:border-l-orange-500",
    glowColor: "orange",
  },
  {
    name: "Open Source AI Models",
    description:
      "Llama 3, Mistral, and Qwen deployments for air-gapped or cost-sensitive environments.",
    icon: <GitFork size={24} aria-hidden="true" />,
    iconColor: "text-slate-300",
    iconBg: "bg-slate-600/20",
    borderAccent: "group-hover:border-l-slate-400",
    glowColor: "indigo",
  },
  {
    name: "Enterprise Security",
    description:
      "Data isolation, audit logs, PII masking, and GDPR-ready data handling as standard.",
    icon: <Lock size={24} aria-hidden="true" />,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-600/20",
    borderAccent: "group-hover:border-l-emerald-500",
    glowColor: "green",
  },
  {
    name: "Scalable Infrastructure",
    description:
      "Horizontal auto-scaling that handles traffic spikes without cold starts or latency.",
    icon: <Server size={24} aria-hidden="true" />,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-600/20",
    borderAccent: "group-hover:border-l-cyan-500",
    glowColor: "cyan",
  },
];

// ─── Animation config ─────────────────────────────────────────────────────────

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

const cardReveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: {
    duration: 0.5,
    delay: i * 0.07,
    ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
  },
});

// ─── WhyUsSection ─────────────────────────────────────────────────────────────

export default function WhyUsSection() {
  return (
    <section
      className="relative py-24 lg:py-32 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Ambient gradient sweep — bottom-left violet */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(139,92,246,0.08) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      {/* Ambient gradient sweep — top-right indigo */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(99,102,241,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ──────────────────────────────────────────── */}
        <motion.div
          {...sectionReveal}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <SectionBadge>Why Choose Us</SectionBadge>

          <h2
            id="why-us-heading"
            className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] text-white"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
          >
            Built for Businesses That Demand{" "}
            <GradientText tag="span" className="text-4xl md:text-5xl font-bold">
              the Best
            </GradientText>
          </h2>

          <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed">
            Trusted by startups and enterprises alike — here is why teams choose
            us over generic automation platforms.
          </p>
        </motion.div>

        {/* ── Features grid ────────────────────────────────────────────── */}
        {/*
          Mobile:  1 col
          md:      2 col
          lg:      3 col (desktop)
        */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Reasons to choose AI Tool Creator"
        >
          {FEATURES.map((feature, i) => (
            <motion.li
              key={feature.name}
              {...cardReveal(i)}
              className="group"
            >
              <AnimatedCard
                glowColor={feature.glowColor}
                className={[
                  "p-6 h-full flex flex-col",
                  // Left-border hover accent — starts transparent, appears on hover
                  "border-l-2 border-l-transparent",
                  feature.borderAccent,
                  "transition-[border-color] duration-300 ease-out",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                {/* Icon box */}
                <div
                  className={[
                    "flex items-center justify-center",
                    "w-12 h-12 rounded-xl",
                    "border border-white/8",
                    feature.iconBg,
                    feature.iconColor,
                    "flex-shrink-0",
                    "transition-colors duration-300",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

                {/* Feature name */}
                <h3 className="mt-4 text-base font-semibold text-white leading-snug">
                  {feature.name}
                </h3>

                {/* Benefit description */}
                <p className="mt-2 text-sm text-slate-400 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </AnimatedCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
