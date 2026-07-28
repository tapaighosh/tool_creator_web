"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  Headphones,
  Phone,
  TrendingUp,
  Zap,
  Share2,
  FileText,
  Bot,
  Target,
  Database,
  BarChart3,
  Globe,
  Mail,
  ShoppingCart,
  Calendar,
  GitBranch,
  Package,
  CreditCard,
  BookOpen,
  Cpu,
  ArrowRight,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Types ────────────────────────────────────────────────────────────────────

type GlowColor = "indigo" | "violet" | "cyan" | "green" | "orange";

interface AgentEntry {
  name: string;
  icon: React.ReactNode;
  glowColor: GlowColor;
  iconBg: string;
  iconColor: string;
}

// ─── Agent directory data — 20 agents ────────────────────────────────────────

const AGENTS: AgentEntry[] = [
  {
    name: "WhatsApp AI",
    icon: <MessageCircle size={24} aria-hidden="true" />,
    glowColor: "green",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    name: "Customer Support",
    icon: <Headphones size={24} aria-hidden="true" />,
    glowColor: "cyan",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    name: "Voice Calling",
    icon: <Phone size={24} aria-hidden="true" />,
    glowColor: "violet",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    name: "Sales Assistant",
    icon: <TrendingUp size={24} aria-hidden="true" />,
    glowColor: "orange",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    name: "Business Automation",
    icon: <Zap size={24} aria-hidden="true" />,
    glowColor: "cyan",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    name: "Social Media",
    icon: <Share2 size={24} aria-hidden="true" />,
    glowColor: "indigo",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
  {
    name: "Content Writer",
    icon: <FileText size={24} aria-hidden="true" />,
    glowColor: "violet",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    name: "Custom AI Bot",
    icon: <Bot size={24} aria-hidden="true" />,
    glowColor: "indigo",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
  {
    name: "Lead Generation",
    icon: <Target size={24} aria-hidden="true" />,
    glowColor: "orange",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    name: "CRM Automation",
    icon: <Database size={24} aria-hidden="true" />,
    glowColor: "green",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    name: "BI Dashboard",
    icon: <BarChart3 size={24} aria-hidden="true" />,
    glowColor: "cyan",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    name: "Website Chatbot",
    icon: <Globe size={24} aria-hidden="true" />,
    glowColor: "indigo",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
  {
    name: "Email Outreach",
    icon: <Mail size={24} aria-hidden="true" />,
    glowColor: "violet",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    name: "E-commerce AI",
    icon: <ShoppingCart size={24} aria-hidden="true" />,
    glowColor: "orange",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    name: "Scheduling Agent",
    icon: <Calendar size={24} aria-hidden="true" />,
    glowColor: "green",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    name: "Workflow Builder",
    icon: <GitBranch size={24} aria-hidden="true" />,
    glowColor: "indigo",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
  {
    name: "Inventory AI",
    icon: <Package size={24} aria-hidden="true" />,
    glowColor: "cyan",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    name: "Finance Agent",
    icon: <CreditCard size={24} aria-hidden="true" />,
    glowColor: "green",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    name: "Knowledge Base",
    icon: <BookOpen size={24} aria-hidden="true" />,
    glowColor: "violet",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    name: "Custom GPT",
    icon: <Cpu size={24} aria-hidden="true" />,
    glowColor: "indigo",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── AgentPill ────────────────────────────────────────────────────────────────

function AgentPill({
  agent,
  index,
  reduced,
}: {
  agent: AgentEntry;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 16 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay: reduced ? 0 : index * 0.04,
        ease: EASE,
      }}
      className="group"
    >
      <AnimatedCard
        glowColor={agent.glowColor}
        className="p-4 flex flex-col items-center text-center cursor-pointer"
      >
        {/* Icon */}
        <div
          className={[
            "w-12 h-12 rounded-xl flex items-center justify-center",
            "ring-1 ring-white/[0.06]",
            agent.iconBg,
            agent.iconColor,
            "transition-transform duration-200 group-hover:scale-110",
            "motion-reduce:transition-none motion-reduce:transform-none",
          ].join(" ")}
          aria-hidden="true"
        >
          {agent.icon}
        </div>

        {/* Name */}
        <p className="mt-3 text-sm font-semibold text-white leading-tight">
          {agent.name}
        </p>

        {/* Get Quote — revealed on hover */}
        <span
          className={[
            "mt-2 flex items-center gap-1 text-[11px] font-medium",
            agent.iconColor,
            "opacity-0 group-hover:opacity-100",
            "-translate-y-0.5 group-hover:translate-y-0",
            "transition-all duration-200 ease-out",
            "motion-reduce:transition-none",
          ].join(" ")}
          aria-hidden="true"
        >
          Get Quote
          <ArrowRight size={10} />
        </span>
      </AnimatedCard>
    </motion.div>
  );
}

// ─── AgentDirectory ───────────────────────────────────────────────────────────

/**
 * AgentDirectory
 *
 * A 2→3→4 column responsive pill-card grid of 20 available AI agents.
 * Each card uses AnimatedCard and shows icon, name, and a group-hover CTA.
 * Staggered entrance animation with prefers-reduced-motion compliance.
 */
export default function AgentDirectory() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative py-24 lg:py-32 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="agent-directory-heading"
    >
      {/* Ambient blob — bottom left */}
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ────────────────────────────────────────────── */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <SectionBadge>Agent Directory</SectionBadge>

          <h2
            id="agent-directory-heading"
            className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white font-[family-name:var(--font-space-grotesk)]"
          >
            AI Agents Businesses Are{" "}
            <GradientText tag="span" className="text-4xl md:text-5xl font-bold">
              Building Today
            </GradientText>
          </h2>

          <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed">
            Browse our full catalogue of deployable AI agents. Every agent is
            custom-built to your specifications — deployed and running in
            production within 48 hours.
          </p>
        </motion.div>

        {/* ── Agent pill grid ────────────────────────────────────────────── */}
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          role="list"
          aria-label="AI agent directory"
        >
          {AGENTS.map((agent, i) => (
            <li key={agent.name}>
              <AgentPill agent={agent} index={i} reduced={reduced} />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
