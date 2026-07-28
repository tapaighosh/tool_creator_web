"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  MessageSquare,
  Phone,
  Mail,
  Smartphone,
  Send,
  Camera,
  Globe,
  MessageCircle,
  Database,
  Brain,
  Cpu,
  BarChart3,
  Building2,
  Server,
  PieChart,
  ChevronDown,
  ArrowRight,
  Zap,
  BookOpen,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Data ─────────────────────────────────────────────────────────────────────

const CUSTOMER_CHANNELS = [
  { icon: Globe, label: "Website Chat", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: MessageCircle, label: "WhatsApp", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: MessageSquare, label: "Messenger", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Camera, label: "Instagram", color: "text-pink-400", bg: "bg-pink-500/10" },
  { icon: Send, label: "Telegram", color: "text-sky-400", bg: "bg-sky-500/10" },
  { icon: Mail, label: "Email", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: Phone, label: "Voice", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { icon: Smartphone, label: "Mobile App", color: "text-amber-400", bg: "bg-amber-500/10" },
] as const;

const AI_CORE_LAYERS: Array<{
  icon: React.ElementType;
  label: string;
  sublabel: string;
  color: string;
  bg: string;
  border: string;
  isPulse?: boolean;
}> = [
  {
    icon: Database,
    label: "CRM / Knowledge Base",
    sublabel: "Business data & context",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Brain,
    label: "Custom AI Agent",
    sublabel: "Reasoning · Memory · Action",
    color: "text-indigo-300",
    bg: "bg-indigo-500/15",
    border: "border-indigo-400/40",
    isPulse: true,
  },
  {
    icon: Cpu,
    label: "AI Models",
    sublabel: "GPT-4o · Claude · Gemini · Llama",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
];

const BUSINESS_SYSTEMS = [
  { icon: Building2, label: "Business APIs", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { icon: BookOpen, label: "ERP", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: Server, label: "Database", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: PieChart, label: "Analytics", color: "text-emerald-400", bg: "bg-emerald-500/10" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Single channel pill card */
function ChannelCard({
  icon: Icon,
  label,
  color,
  bg,
  delay,
  reduced,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  bg: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, x: -30 }}
      whileInView={reduced ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl glass-card border border-white/[0.07] hover:border-indigo-500/30 transition-all duration-300"
    >
      <span
        className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${bg}`}
        aria-hidden="true"
      >
        <Icon size={14} className={color} />
      </span>
      <span className="text-slate-300 text-sm font-medium">{label}</span>
    </motion.div>
  );
}

/** System card (right column) */
function SystemCard({
  icon: Icon,
  label,
  color,
  bg,
  delay,
  reduced,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  bg: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, x: 30 }}
      whileInView={reduced ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl glass-card border border-white/[0.07] hover:border-indigo-500/30 transition-all duration-300"
    >
      <span
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${bg}`}
        aria-hidden="true"
      >
        <Icon size={16} className={color} />
      </span>
      <span className="text-slate-300 text-sm font-medium">{label}</span>
    </motion.div>
  );
}

/** Animated SVG arrow for desktop flow lines */
function FlowArrow({
  dir = "right",
  delay = 0,
  reduced,
}: {
  dir?: "right" | "left";
  delay?: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="hidden lg:flex items-center justify-center"
      initial={reduced ? {} : { opacity: 0 }}
      whileInView={reduced ? {} : { opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      aria-hidden="true"
    >
      <svg width="64" height="20" viewBox="0 0 64 20" fill="none" className="overflow-visible">
        {/* Animated dashed line */}
        <motion.line
          x1="0"
          y1="10"
          x2="54"
          y2="10"
          stroke="rgba(99,102,241,0.45)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeLinecap="round"
          animate={
            reduced
              ? {}
              : {
                  strokeDashoffset: dir === "right" ? [24, 0] : [0, 24],
                }
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
        {/* Arrowhead */}
        <path
          d="M50 4 L60 10 L50 16"
          stroke="rgba(99,102,241,0.65)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

/** Mobile downward chevron separator */
function MobileChevron({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="flex lg:hidden justify-center py-2"
      initial={reduced ? {} : { opacity: 0, y: -6 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: EASE }}
      aria-hidden="true"
    >
      <motion.div
        animate={reduced ? {} : { y: [0, 4, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={20} className="text-indigo-400/60" />
      </motion.div>
    </motion.div>
  );
}

/** Pulsing glow ring for the AI Agent node */
function PulseRing({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "1px solid rgba(99,102,241,0.5)" }}
        animate={{ opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -inset-1.5 rounded-[20px] pointer-events-none"
        style={{ border: "1px solid rgba(99,102,241,0.2)" }}
        animate={{ opacity: [0.3, 0.08, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        aria-hidden="true"
      />
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * ArchitectureFlow
 *
 * Cinematic 3-column architecture diagram showing the full data flow:
 *   Customer Channels → AI Core (CRM → Custom AI Agent → AI Models) → Business Systems
 *
 * Desktop: columns connected by animated SVG dashed arrows.
 * Mobile: columns stacked vertically, separated by animated downward chevrons.
 *
 * Delight anchor: the central "Custom AI Agent" node has a continuously pulsing
 * indigo glow ring — it feels alive, like the system is actively processing.
 */
export default function ArchitectureFlow() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-[#0A0F1E]"
      aria-labelledby="arch-flow-heading"
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2
            id="arch-flow-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-space-grotesk)] leading-tight"
          >
            How Your AI Works
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every message, call, or query flows through a single intelligent core — then triggers
            the right action in your business stack.
          </p>
        </motion.div>

        {/* ── Architecture Grid ──────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-0">

          {/* ── Column 1: Customer Channels ──────────────────────────────── */}
          <motion.div
            className="flex-1 lg:max-w-[280px]"
            initial={reduced ? {} : { opacity: 0, x: -30 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Column label */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400" aria-hidden="true" />
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Customer Channels
              </h3>
            </div>

            <div
              className="h-full rounded-2xl p-4 space-y-2.5"
              style={{
                background: "rgba(6,182,212,0.04)",
                border: "1px solid rgba(6,182,212,0.12)",
              }}
            >
              {CUSTOMER_CHANNELS.map((ch, i) => (
                <ChannelCard
                  key={ch.label}
                  {...ch}
                  delay={i * 0.06}
                  reduced={reduced}
                />
              ))}
            </div>
          </motion.div>

          {/* Arrow: channels → AI Core */}
          <div className="lg:flex-none lg:w-16 flex flex-col justify-center">
            <FlowArrow dir="right" delay={0.3} reduced={reduced} />
            <MobileChevron reduced={reduced} />
          </div>

          {/* ── Column 2: AI Core (CENTER) ────────────────────────────────── */}
          <motion.div
            className="flex-1 lg:max-w-[300px]"
            initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
          >
            {/* Column label */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <div
                className="w-2 h-2 rounded-full bg-indigo-400"
                style={{
                  boxShadow: "0 0 6px rgba(99,102,241,0.8)",
                }}
                aria-hidden="true"
              />
              <h3 className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">
                AI Core
              </h3>
            </div>

            <div
              className="h-full rounded-2xl p-5 flex flex-col gap-4 justify-center"
              style={{
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.30)",
                boxShadow: "0 0 40px rgba(99,102,241,0.12), inset 0 0 20px rgba(99,102,241,0.04)",
              }}
            >
              {AI_CORE_LAYERS.map((layer, i) => (
                <React.Fragment key={layer.label}>
                  {/* Layer card */}
                  <motion.div
                    initial={reduced ? {} : { opacity: 0, y: 16 }}
                    whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: EASE }}
                    className={`relative rounded-2xl p-4 border ${layer.border} ${layer.bg}`}
                  >
                    {layer.isPulse && <PulseRing reduced={reduced} />}

                    <div className="relative flex items-start gap-3">
                      <span
                        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${layer.bg} border ${layer.border}`}
                        aria-hidden="true"
                      >
                        <layer.icon size={18} className={layer.color} />
                      </span>
                      <div>
                        <p
                          className={`text-sm font-semibold leading-tight ${
                            layer.isPulse ? "text-white" : "text-slate-200"
                          }`}
                        >
                          {layer.label}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                          {layer.sublabel}
                        </p>
                      </div>
                    </div>

                    {/* "Thinking" dots for the AI Agent node */}
                    {layer.isPulse && (
                      <div className="flex items-center gap-1 mt-3 pl-12" aria-hidden="true">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                            animate={
                              reduced || !inView
                                ? { opacity: 0.4 }
                                : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }
                            }
                            transition={
                              reduced || !inView
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
                        <span className="text-[10px] text-slate-600 ml-1.5 leading-none">
                          Processing…
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Downward connector between AI Core layers */}
                  {i < AI_CORE_LAYERS.length - 1 && (
                    <div className="flex justify-center" aria-hidden="true">
                      <motion.div
                        className="flex flex-col items-center gap-0.5"
                        animate={
                          reduced || !inView
                            ? {}
                            : { opacity: [0.4, 0.9, 0.4] }
                        }
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="w-px h-3 bg-indigo-500/40" />
                        <Zap size={12} className="text-indigo-400/60" />
                        <div className="w-px h-3 bg-indigo-500/40" />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Arrow: AI Core → Business Systems */}
          <div className="lg:flex-none lg:w-16 flex flex-col justify-center">
            <FlowArrow dir="right" delay={0.45} reduced={reduced} />
            <MobileChevron reduced={reduced} />
          </div>

          {/* ── Column 3: Business Systems ────────────────────────────────── */}
          <motion.div
            className="flex-1 lg:max-w-[280px]"
            initial={reduced ? {} : { opacity: 0, x: 30 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            {/* Column label */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="w-2 h-2 rounded-full bg-violet-400" aria-hidden="true" />
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Business Systems
              </h3>
            </div>

            <div
              className="h-full rounded-2xl p-4 space-y-3 flex flex-col justify-center"
              style={{
                background: "rgba(139,92,246,0.04)",
                border: "1px solid rgba(139,92,246,0.12)",
              }}
            >
              {BUSINESS_SYSTEMS.map((sys, i) => (
                <SystemCard
                  key={sys.label}
                  {...sys}
                  delay={0.25 + i * 0.08}
                  reduced={reduced}
                />
              ))}

              {/* Integration badge */}
              <motion.div
                initial={reduced ? {} : { opacity: 0 }}
                whileInView={reduced ? {} : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/8 border border-violet-500/15 mt-1"
              >
                <ArrowRight size={12} className="text-violet-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] text-violet-300/80 leading-tight">
                  Real-time bidirectional sync
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom caption */}
        <motion.p
          className="text-center text-xs text-slate-600 mt-8 tracking-wide"
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={reduced ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
        >
          End-to-end encrypted · 99.9% uptime SLA · Avg. response &lt; 800 ms
        </motion.p>
      </div>
    </section>
  );
}
