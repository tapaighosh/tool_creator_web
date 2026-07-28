"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Zap,
  MessageCircle,
  Headphones,
  Phone,
  MessageSquare,
  Target,
  Database,
  TrendingUp,
  Globe,
  GitBranch,
  Share2,
  FileText,
  BarChart3,
} from "lucide-react";
import GradientText from "@/components/ui/GradientText";
import SectionBadge from "@/components/ui/SectionBadge";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Types ────────────────────────────────────────────────────────────────────

type GlowColor = "indigo" | "violet" | "cyan" | "green" | "orange";

interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  glowColor: GlowColor;
}

// ─── Service data ─────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    name: "Custom AI Agent Development",
    description: "Bespoke agents trained on your data and integrated into your stack.",
    icon: <Bot size={24} aria-hidden="true" />,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-600/20",
    glowColor: "indigo",
  },
  {
    name: "AI Business Automation",
    description: "End-to-end workflow automation that eliminates manual processes.",
    icon: <Zap size={24} aria-hidden="true" />,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-600/20",
    glowColor: "violet",
  },
  {
    name: "WhatsApp AI Assistant",
    description: "Conversational AI that handles leads and support on WhatsApp 24/7.",
    icon: <MessageCircle size={24} aria-hidden="true" />,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-600/20",
    glowColor: "green",
  },
  {
    name: "AI Customer Support",
    description: "Intelligent agents that resolve tickets faster than human agents.",
    icon: <Headphones size={24} aria-hidden="true" />,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-600/20",
    glowColor: "cyan",
  },
  {
    name: "AI Voice Calling Agent",
    description: "Outbound and inbound voice AI that qualifies leads autonomously.",
    icon: <Phone size={24} aria-hidden="true" />,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-600/20",
    glowColor: "violet",
  },
  {
    name: "AI Chatbot Development",
    description: "Contextual chatbots trained on your docs, FAQs, and product data.",
    icon: <MessageSquare size={24} aria-hidden="true" />,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-600/20",
    glowColor: "indigo",
  },
  {
    name: "AI Lead Generation System",
    description: "AI pipelines that identify, score, and nurture prospects automatically.",
    icon: <Target size={24} aria-hidden="true" />,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-600/20",
    glowColor: "orange",
  },
  {
    name: "AI CRM Automation",
    description: "Auto-populate, enrich, and action CRM records without manual entry.",
    icon: <Database size={24} aria-hidden="true" />,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-600/20",
    glowColor: "indigo",
  },
  {
    name: "AI Sales Automation",
    description: "From outreach to follow-up — AI handles the full sales motion.",
    icon: <TrendingUp size={24} aria-hidden="true" />,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-600/20",
    glowColor: "orange",
  },
  {
    name: "AI Website Chatbot",
    description: "Convert visitors into leads with a context-aware site assistant.",
    icon: <Globe size={24} aria-hidden="true" />,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-600/20",
    glowColor: "cyan",
  },
  {
    name: "AI Workflow Automation",
    description: "Multi-step automations across apps, APIs, and internal tools.",
    icon: <GitBranch size={24} aria-hidden="true" />,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-600/20",
    glowColor: "violet",
  },
  {
    name: "AI Social Media Automation",
    description: "Schedule, publish, and reply across platforms with AI-generated copy.",
    icon: <Share2 size={24} aria-hidden="true" />,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-600/20",
    glowColor: "indigo",
  },
  {
    name: "AI Content Automation",
    description: "Blog posts, emails, and ad copy generated and published on schedule.",
    icon: <FileText size={24} aria-hidden="true" />,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-600/20",
    glowColor: "violet",
  },
  {
    name: "AI Business Intelligence Dashboard",
    description: "Real-time insights and anomaly detection across your business data.",
    icon: <BarChart3 size={24} aria-hidden="true" />,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-600/20",
    glowColor: "cyan",
  },
];

// ─── Animation config ─────────────────────────────────────────────────────────

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const cardReveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: {
    duration: 0.5,
    delay: i * 0.05,
    ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
  },
});

// ─── ServicesSection ──────────────────────────────────────────────────────────

export default function ServicesSection() {
  return (
    <section
      className="relative py-24 lg:py-32 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Subtle ambient blob — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
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
          <SectionBadge>Our Services</SectionBadge>

          <h2
            id="services-heading"
            className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] text-white"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
          >
            AI Solutions That{" "}
            <GradientText tag="span" className="text-4xl md:text-5xl font-bold">
              Drive Results
            </GradientText>
          </h2>

          <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed">
            Comprehensive AI automation services tailored to your business needs
          </p>
        </motion.div>

        {/* ── Services grid ────────────────────────────────────────────── */}
        {/*
          Mobile:  1 col
          sm:      2 col
          lg:      3 col
          xl:      4 col
          — matches Feature-Rich Showcase pattern from ui-ux-pro-max search
        */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
          aria-label="AI services offered"
        >
          {SERVICES.map((service, i) => (
            <motion.li
              key={service.name}
              {...cardReveal(i)}
              className="group"
            >
              <AnimatedCard
                glowColor={service.glowColor}
                className="p-6 h-full flex flex-col"
              >
                {/* Icon container */}
                <div
                  className={[
                    "flex items-center justify-center",
                    "w-12 h-12 rounded-xl",
                    "border border-white/8",
                    service.iconBg,
                    service.iconColor,
                    "flex-shrink-0",
                    "transition-colors duration-300",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>

                {/* Name */}
                <h3 className="mt-4 text-base font-semibold text-white leading-snug">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="mt-1.5 text-sm text-slate-400 leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Learn More — revealed on group-hover */}
                <span
                  className={[
                    "mt-3 inline-flex items-center gap-1",
                    "text-xs text-indigo-400 font-medium",
                    "opacity-0 group-hover:opacity-100",
                    "translate-y-1 group-hover:translate-y-0",
                    "transition-all duration-200 ease-out",
                    "motion-reduce:transition-none",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  Learn More →
                </span>
              </AnimatedCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
