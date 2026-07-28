"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Layout,
  Server,
  Brain,
  Workflow,
  Database,
  Cloud,
  MessageSquare,
  Search,
  Container,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TechItem {
  name: string;
  accent?: string;
}

interface TechCategory {
  icon: React.ElementType;
  title: string;
  glowColor: "indigo" | "violet" | "cyan" | "green" | "orange";
  iconColor: string;
  iconBg: string;
  items: TechItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Tech Stack Data ──────────────────────────────────────────────────────────

const TECH_CATEGORIES: TechCategory[] = [
  {
    icon: Layout,
    title: "Frontend",
    glowColor: "cyan",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    items: [
      { name: "Next.js 15", accent: "primary" },
      { name: "React 19" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "Shadcn UI" },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    glowColor: "indigo",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
    items: [
      { name: "Node.js", accent: "primary" },
      { name: "FastAPI" },
      { name: "Express.js" },
      { name: "REST / GraphQL" },
      { name: "WebSockets" },
      { name: "tRPC" },
    ],
  },
  {
    icon: Brain,
    title: "AI Models",
    glowColor: "violet",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    items: [
      { name: "GPT-4o", accent: "primary" },
      { name: "Claude 3.5" },
      { name: "Gemini 1.5" },
      { name: "Llama 3.3" },
      { name: "Mistral" },
      { name: "Whisper" },
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    glowColor: "green",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    items: [
      { name: "n8n", accent: "primary" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "CrewAI" },
      { name: "Zapier" },
      { name: "Make.com" },
    ],
  },
  {
    icon: Database,
    title: "Database",
    glowColor: "orange",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    items: [
      { name: "MongoDB", accent: "primary" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "Supabase" },
      { name: "Prisma ORM" },
      { name: "Drizzle" },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud",
    glowColor: "cyan",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
    items: [
      { name: "AWS", accent: "primary" },
      { name: "Google Cloud" },
      { name: "Azure" },
      { name: "Vercel" },
      { name: "Railway" },
      { name: "Cloudflare" },
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication",
    glowColor: "violet",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
    items: [
      { name: "WhatsApp API", accent: "primary" },
      { name: "Twilio" },
      { name: "SendGrid" },
      { name: "Telegram Bot" },
      { name: "Vonage" },
      { name: "Meta Cloud" },
    ],
  },
  {
    icon: Search,
    title: "Vector Database",
    glowColor: "indigo",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
    items: [
      { name: "Pinecone", accent: "primary" },
      { name: "Weaviate" },
      { name: "Qdrant" },
      { name: "pgvector" },
      { name: "Chroma" },
      { name: "Milvus" },
    ],
  },
  {
    icon: Container,
    title: "Deployment",
    glowColor: "green",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    items: [
      { name: "Docker", accent: "primary" },
      { name: "Kubernetes" },
      { name: "GitHub Actions" },
      { name: "Terraform" },
      { name: "Nginx" },
      { name: "PM2" },
    ],
  },
];

// ─── Pill Badge ───────────────────────────────────────────────────────────────

function TechPill({ name, accent }: { name: string; accent?: string }) {
  const isPrimary = accent === "primary";

  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium leading-none",
        "border transition-all duration-200 cursor-default",
        isPrimary
          ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 hover:border-indigo-400/50"
          : "bg-white/[0.04] border-white/[0.08] text-slate-400 hover:bg-white/[0.08] hover:text-slate-300 hover:border-white/[0.14]",
      ].join(" ")}
    >
      {name}
    </span>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  delay,
  reduced,
}: {
  category: TechCategory;
  delay: number;
  reduced: boolean;
}) {
  const { icon: Icon, title, glowColor, iconColor, iconBg, items } = category;

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 30 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      <AnimatedCard glowColor={glowColor} className="p-6 h-full flex flex-col">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}
            aria-hidden="true"
          >
            <Icon size={18} className={iconColor} />
          </span>
          <h3 className="text-sm font-semibold text-white leading-tight">{title}</h3>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2" role="list" aria-label={`${title} technologies`}>
          {items.map((item) => (
            <div key={item.name} role="listitem">
              <TechPill name={item.name} accent={item.accent} />
            </div>
          ))}
        </div>
      </AnimatedCard>
    </motion.div>
  );
}

// ─── Section Component ────────────────────────────────────────────────────────

/**
 * TechStackSection
 *
 * 9-card grid (lg:3-col) showcasing the full technology portfolio.
 * Each card uses AnimatedCard with a category-appropriate glow colour.
 * Primary tech per category is highlighted with an indigo accent pill.
 *
 * Delight anchor: the staggered reveal + card glow variety creates a sense
 * of breadth and deliberate curation — not a boring bullet list.
 */
export default function TechStackSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative py-20 lg:py-28 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="tech-stack-heading"
    >
      {/* Ambient blob */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          className="text-center mb-12"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex justify-center mb-5">
            <SectionBadge>Technology Stack</SectionBadge>
          </div>

          <h2
            id="tech-stack-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-tight"
          >
            Powered by the{" "}
            <GradientText className="font-bold">Best-in-Class Technologies</GradientText>
          </h2>

          <p className="mt-5 text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We carefully select every tool in our stack for production reliability, scalability,
            and developer velocity — so your AI ship fast and stay fast.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CATEGORIES.map((category, i) => (
            <CategoryCard
              key={category.title}
              category={category}
              delay={reduced ? 0 : i * 0.07}
              reduced={reduced}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-xs text-slate-600 mt-10 tracking-wide"
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={reduced ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        >
          Stack is tailored to each project · We evaluate and adopt new tools continuously
        </motion.p>
      </div>
    </section>
  );
}
