"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TrendingUp,
  Headphones,
  Megaphone,
  Users,
  DollarSign,
  Settings,
  ArrowRight,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Types ────────────────────────────────────────────────────────────────────

type GlowColor = "indigo" | "violet" | "cyan" | "green" | "orange";

interface Department {
  name: string;
  tagline: string;
  icon: React.ReactNode;
  glowColor: GlowColor;
  iconBg: string;
  iconColor: string;
  dotColor: string;
  capabilities: string[];
}

// ─── Department data ──────────────────────────────────────────────────────────

const DEPARTMENTS: Department[] = [
  {
    name: "Sales",
    tagline: "AI Powered",
    icon: <TrendingUp size={28} aria-hidden="true" />,
    glowColor: "orange",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    dotColor: "bg-orange-400",
    capabilities: [
      "Lead scoring & enrichment",
      "Outreach sequence automation",
      "Pipeline forecasting",
      "Post-call follow-up drafts",
      "Quote & proposal generation",
    ],
  },
  {
    name: "Support",
    tagline: "AI Powered",
    icon: <Headphones size={28} aria-hidden="true" />,
    glowColor: "cyan",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    dotColor: "bg-cyan-400",
    capabilities: [
      "Tier-1 ticket resolution",
      "Knowledge base search",
      "Sentiment-based escalation",
      "CSAT feedback collection",
      "Multi-channel inbox unified",
    ],
  },
  {
    name: "Marketing",
    tagline: "AI Powered",
    icon: <Megaphone size={28} aria-hidden="true" />,
    glowColor: "violet",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    dotColor: "bg-violet-400",
    capabilities: [
      "Content generation & scheduling",
      "Campaign A/B optimisation",
      "Audience segmentation AI",
      "Ad copy & creative briefs",
      "SEO keyword clustering",
    ],
  },
  {
    name: "HR",
    tagline: "AI Powered",
    icon: <Users size={28} aria-hidden="true" />,
    glowColor: "indigo",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    dotColor: "bg-indigo-400",
    capabilities: [
      "CV screening & shortlisting",
      "Onboarding workflow automation",
      "Policy Q&A chatbot",
      "Leave & attendance tracking",
      "Performance review summaries",
    ],
  },
  {
    name: "Finance",
    tagline: "AI Powered",
    icon: <DollarSign size={28} aria-hidden="true" />,
    glowColor: "green",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    dotColor: "bg-emerald-400",
    capabilities: [
      "Invoice processing & OCR",
      "Expense categorisation AI",
      "Anomaly detection alerts",
      "Cash-flow forecasting",
      "Vendor reconciliation",
    ],
  },
  {
    name: "Operations",
    tagline: "AI Powered",
    icon: <Settings size={28} aria-hidden="true" />,
    glowColor: "indigo",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    dotColor: "bg-indigo-400",
    capabilities: [
      "Process mapping & audit",
      "SLA monitoring & alerts",
      "Inventory reorder automation",
      "Cross-team task routing",
      "Real-time KPI dashboards",
    ],
  },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: EASE },
};

// ─── DepartmentCard ───────────────────────────────────────────────────────────

function DepartmentCard({
  dept,
  index,
  reduced,
}: {
  dept: Department;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : index * 0.07,
        ease: EASE,
      }}
      className="group"
    >
      <AnimatedCard
        glowColor={dept.glowColor}
        className="p-6 h-full flex flex-col"
      >
        {/* ── Icon box — 64×64px ───────────────────────────────────────── */}
        <div
          className={[
            "flex items-center justify-center",
            "w-16 h-16 rounded-2xl",
            dept.iconBg,
            dept.iconColor,
            "ring-1 ring-white/[0.06]",
            "flex-shrink-0",
            "transition-transform duration-300 group-hover:scale-105",
            "motion-reduce:transition-none motion-reduce:transform-none",
          ].join(" ")}
          aria-hidden="true"
        >
          {dept.icon}
        </div>

        {/* ── Title row ────────────────────────────────────────────────── */}
        <div className="mt-4 flex items-center gap-2.5 flex-wrap">
          <h3 className="text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)] leading-none">
            {dept.name}
          </h3>
          {/* "AI Powered" badge */}
          <span
            className={[
              "px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase",
              dept.iconBg,
              dept.iconColor,
              "border border-white/[0.06]",
            ].join(" ")}
          >
            {dept.tagline}
          </span>
        </div>

        {/* ── Capability list ──────────────────────────────────────────── */}
        <ul
          className="mt-4 space-y-2 flex-1"
          role="list"
          aria-label={`${dept.name} capabilities`}
        >
          {dept.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2.5">
              {/* Colored dot bullet per design spec */}
              <span
                className={["flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[5px]", dept.dotColor].join(" ")}
                aria-hidden="true"
              />
              <span className="text-sm text-slate-400 leading-snug">{cap}</span>
            </li>
          ))}
        </ul>

        {/* ── Deploy link — revealed on group-hover ────────────────────── */}
        <div
          className={[
            "mt-5 flex items-center gap-1.5",
            "text-sm font-medium",
            dept.iconColor,
            "opacity-0 group-hover:opacity-100",
            "-translate-y-1 group-hover:translate-y-0",
            "transition-all duration-200 ease-out",
            "motion-reduce:transition-none",
          ].join(" ")}
          aria-hidden="true"
        >
          Deploy This Agent
          <ArrowRight size={14} />
        </div>
      </AnimatedCard>
    </motion.div>
  );
}

// ─── BusinessAgentsGrid ───────────────────────────────────────────────────────

/**
 * BusinessAgentsGrid
 *
 * Six department agent cards in a responsive 1→2→3 column grid.
 * Each card follows the design system: AnimatedCard wrapper, 64px icon box,
 * "AI Powered" badge, capability list with CheckCircle2 icons, and a
 * group-hover "Deploy This Agent →" link.
 */
export default function BusinessAgentsGrid() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative py-24 lg:py-32 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="agents-grid-heading"
    >
      {/* Ambient blob */}
      <div
        className="absolute top-0 right-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ────────────────────────────────────────────── */}
        <motion.div
          {...sectionReveal}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <SectionBadge>Business Agent Modules</SectionBadge>

          <h2
            id="agents-grid-heading"
            className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white font-[family-name:var(--font-space-grotesk)]"
          >
            Complete AI Agent Suite for{" "}
            <GradientText tag="span" className="text-4xl md:text-5xl font-bold">
              Every Department
            </GradientText>
          </h2>

          <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed">
            Deploy AI agents across your entire organisation. Each module is
            custom-built for your data, your tools, and your workflow.
          </p>
        </motion.div>

        {/* ── Department grid ────────────────────────────────────────────── */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="AI agent department modules"
        >
          {DEPARTMENTS.map((dept, i) => (
            <li key={dept.name}>
              <DepartmentCard dept={dept} index={i} reduced={reduced} />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
