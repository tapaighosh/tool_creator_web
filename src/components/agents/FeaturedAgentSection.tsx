"use client";

import React from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  Check,
  Share2,
  TrendingUp,
  MessageSquare,
  Calendar,
  Repeat2,
  BarChart3,
  Image as ImageIcon,
  Bell,
  Users,
  Zap,
  Globe,
  FileText,
  Hash,
  Layers,
  ArrowRight,
  Activity,
  Heart,
  Bookmark,
} from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import GlowButton from "@/components/ui/GlowButton";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Capabilities ─────────────────────────────────────────────────────────────

const CAPABILITIES = [
  { icon: <MessageSquare size={14} aria-hidden="true" />, label: "AI caption generation" },
  { icon: <Calendar size={14} aria-hidden="true" />, label: "Smart post scheduling" },
  { icon: <Repeat2 size={14} aria-hidden="true" />, label: "Auto-reply & engagement" },
  { icon: <BarChart3 size={14} aria-hidden="true" />, label: "Performance analytics" },
  { icon: <ImageIcon size={14} aria-hidden="true" />, label: "Visual content curation" },
  { icon: <Bell size={14} aria-hidden="true" />, label: "Trend monitoring & alerts" },
  { icon: <Users size={14} aria-hidden="true" />, label: "Audience segmentation" },
  { icon: <Zap size={14} aria-hidden="true" />, label: "Cross-platform publishing" },
  { icon: <Globe size={14} aria-hidden="true" />, label: "Multi-language content" },
  { icon: <FileText size={14} aria-hidden="true" />, label: "Blog-to-social repurposing" },
  { icon: <Hash size={14} aria-hidden="true" />, label: "Hashtag optimisation" },
  { icon: <Layers size={14} aria-hidden="true" />, label: "Content calendar AI" },
  { icon: <TrendingUp size={14} aria-hidden="true" />, label: "Competitor tracking" },
  { icon: <Activity size={14} aria-hidden="true" />, label: "Sentiment analysis" },
  { icon: <Share2 size={14} aria-hidden="true" />, label: "CRM & HubSpot sync" },
] as const;

// ─── Mockup activity feed ─────────────────────────────────────────────────────

const ACTIVITY_ITEMS = [
  {
    icon: <Share2 size={14} aria-hidden="true" />,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
    label: "Published to LinkedIn & Twitter",
    time: "2s ago",
    metric: "+847 reach",
    metricColor: "text-emerald-400",
  },
  {
    icon: <Heart size={14} aria-hidden="true" />,
    color: "text-pink-400",
    bg: "bg-pink-500/15",
    label: "Engagement reply sent",
    time: "14s ago",
    metric: "4.2% CTR",
    metricColor: "text-cyan-400",
  },
  {
    icon: <Bookmark size={14} aria-hidden="true" />,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
    label: "Trending topic captured",
    time: "1m ago",
    metric: "#AIAgents",
    metricColor: "text-violet-400",
  },
  {
    icon: <BarChart3 size={14} aria-hidden="true" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/15",
    label: "Weekly report generated",
    time: "3m ago",
    metric: "↑ 22% reach",
    metricColor: "text-emerald-400",
  },
] as const;

// ─── Animation helpers ────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Mockup card ─────────────────────────────────────────────────────────────

function AgentMockupCard({ reduced }: { reduced: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <div
      ref={ref}
      role="img"
      aria-label="AI Social Media Agent live activity feed — showing published posts, engagement replies, and trend monitoring"
    >
    <AnimatedCard
      glowColor="indigo"
      className="overflow-hidden"
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Share2 size={14} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white leading-none">
              Social Media Agent
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-none">
              ai-tool-creator.com
            </p>
          </div>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
            animate={reduced || !isInView ? { opacity: 0.9 } : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <span className="text-[10px] font-medium text-emerald-400 leading-none">
            Active
          </span>
        </div>
      </div>

      {/* ── Body: Activity feed ──────────────────────────────────────────── */}
      <div className="px-5 py-4 space-y-3">
        {ACTIVITY_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={reduced ? {} : { opacity: 0, x: 12 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: EASE }}
            className="flex items-center gap-3"
          >
            {/* Icon dot */}
            <div
              className={[
                "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center",
                item.bg,
                item.color,
              ].join(" ")}
            >
              {item.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-slate-300 leading-tight truncate">
                {item.label}
              </p>
              <p className="text-[10px] text-slate-600 mt-0.5 leading-none">
                {item.time}
              </p>
            </div>

            {/* Metric */}
            <span className={["text-[10px] font-semibold flex-shrink-0", item.metricColor].join(" ")}>
              {item.metric}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── Footer: Typing indicator ─────────────────────────────────────── */}
      <div className="px-5 py-3 border-t border-white/[0.06] flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2">
          {/* Animated typing dots — only loop while card is visible */}
          <div className="flex items-center gap-1" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                animate={
                  reduced || !isInView
                    ? { opacity: 0.4, y: 0 }
                    : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }
                }
                transition={
                  reduced || !isInView
                    ? {}
                    : {
                        duration: 0.9,
                        repeat: Infinity,
                        delay: dot * 0.2,
                        ease: "easeInOut",
                      }
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-500 leading-none">
            Composing next post…
          </span>
        </div>

        {/* Mini stats */}
        <div className="flex items-center gap-3 text-[10px] text-slate-600">
          <span>
            <span className="text-white font-semibold">12</span> scheduled
          </span>
          <span>
            <span className="text-emerald-400 font-semibold">↑ 31%</span> reach
          </span>
        </div>
      </div>
    </AnimatedCard>
    </div>
  );
}

// ─── FeaturedAgentSection ────────────────────────────────────────────────────

/**
 * FeaturedAgentSection
 *
 * Cinematic split-screen (lg:5-col) hero for the AI Social Media Agent.
 * Left (col-span-3): badge, heading, description, capabilities, CTA.
 * Right (col-span-2): animated live UI mockup card — the "delight" moment.
 *
 * Delight thesis: the visitor should feel that the agent is already at work
 * — an always-on system, not a brochure. The UI mockup shows real-time
 * activity (published post, engagement reply, trend captured) plus a
 * pulsing "Active" status and typing indicator that belong only to a
 * running AI social agent, not a generic product demo.
 */
export default function FeaturedAgentSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative py-24 lg:py-32 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="featured-agent-heading"
    >
      {/* Ambient orb — left-center */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />
      {/* Ambient orb — right */}
      <div
        className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">

          {/* ── LEFT: Content ─────────────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-3 flex flex-col"
            initial={reduced ? {} : { opacity: 0, x: -40 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            {/* Badge */}
            <SectionBadge icon={<Share2 size={12} aria-hidden="true" />}>
              Featured Agent
            </SectionBadge>

            {/* Heading */}
            <h2
              id="featured-agent-heading"
              className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white font-[family-name:var(--font-space-grotesk)]"
            >
              AI Social Media{" "}
              <GradientText tag="span" className="text-4xl md:text-5xl font-bold">
                Agent
              </GradientText>
            </h2>

            {/* Description */}
            <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
              A fully autonomous social media agent that creates, schedules, and
              publishes content across all platforms — engaging your audience
              24/7 while you focus on what matters most.
            </p>

            {/* Capabilities grid — 3-col on sm+, 2-col on mobile */}
            <div
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3"
              role="list"
              aria-label="Agent capabilities"
            >
              {CAPABILITIES.map(({ icon, label }, i) => (
                <motion.div
                  key={label}
                  role="listitem"
                  initial={reduced ? {} : { opacity: 0, y: 10 }}
                  whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.35,
                    delay: reduced ? 0 : 0.05 + i * 0.04,
                    ease: EASE,
                  }}
                  className="flex items-center gap-2.5"
                >
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400"
                    aria-hidden="true"
                  >
                    <Check size={10} strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-300 text-sm leading-tight">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <GlowButton variant="primary" size="md" href="/contact">
                Deploy This Agent
                <ArrowRight size={16} aria-hidden="true" />
              </GlowButton>
            </div>
          </motion.div>

          {/* ── RIGHT: Animated mockup ─────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-2"
            initial={reduced ? {} : { opacity: 0, x: 40 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          >
            <AgentMockupCard reduced={reduced} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
