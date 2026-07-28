"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Zap,
  Clock,
  ShieldCheck,
  HeartHandshake,
  Users,
  Headphones,
  ArrowUpRight,
  Star,
  CalendarCheck,
  Layers,
  Globe,
} from "lucide-react";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS: Array<{
  icon: React.ElementType;
  text: string;
  accent?: boolean;
}> = [
  {
    icon: Zap,
    text: "AI agent live in production within 48 hours",
    accent: true,
  },
  {
    icon: Layers,
    text: "Seamless integration with your existing CRM, ERP & databases",
  },
  {
    icon: Globe,
    text: "Multichannel deployment — WhatsApp, Web, Voice, Email & more",
  },
  {
    icon: Clock,
    text: "24/7 autonomous operation with zero downtime SLA",
  },
  {
    icon: HeartHandshake,
    text: "Dedicated project manager from kickoff to launch",
  },
  {
    icon: ShieldCheck,
    text: "Enterprise-grade security, data encryption & compliance",
  },
  {
    icon: Headphones,
    text: "30-day post-launch support & monitoring included",
  },
  {
    icon: ArrowUpRight,
    text: "Full ownership of your AI system — no vendor lock-in",
  },
];

const TRUST_POINTS = [
  {
    icon: Star,
    title: "5-Star Client Satisfaction",
    body: "Every project is delivered on time and to spec — or we fix it for free.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: CalendarCheck,
    title: "48-Hour Turnaround",
    body: "From signed contract to a working agent in production — not weeks.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    title: "No Lock-In Contracts",
    body: "Month-to-month engagements. We earn your renewal through results.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: Users,
    title: "Senior AI Engineers Only",
    body: "Every project is led by an experienced AI architect — not juniors.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Globe,
    title: "Global Client Base",
    body: "Serving businesses across 15+ countries with time-zone flexible support.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Pricing",
    body: "Fixed-scope quotes upfront — no hidden costs, no scope creep surprises.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * BenefitsSection
 *
 * 2-column AnimatedCard layout: "What You Get" (8 check benefits) +
 * "Why Choose Us" (6 trust point cards).
 *
 * Purpose: Convert hesitant visitors by removing objections and reinforcing
 * commitment signals — both at the point of intent (adjacent to the form).
 */
export default function BenefitsSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative py-20 lg:py-28 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      {/* Ambient blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── Left: What You Get ───────────────────────────────────────── */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: -30 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <AnimatedCard glowColor="indigo" className="p-8 h-full">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <CheckCircle2 size={18} className="text-emerald-400" />
                </div>
                <h2
                  id="benefits-heading"
                  className="text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)]"
                >
                  What You Get
                </h2>
              </div>

              {/* Benefits list */}
              <ul className="space-y-4" role="list">
                {BENEFITS.map(({ icon: Icon, text, accent }, i) => (
                  <motion.li
                    key={text}
                    role="listitem"
                    initial={reduced ? {} : { opacity: 0, x: -16 }}
                    whileInView={reduced ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 0.4,
                      delay: reduced ? 0 : i * 0.06,
                      ease: EASE,
                    }}
                    className="flex items-start gap-3 group"
                  >
                    <span
                      className={[
                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5",
                        "transition-transform duration-200 group-hover:scale-110",
                        accent
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-emerald-500/10 text-emerald-500",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <CheckCircle2 size={13} strokeWidth={2.5} />
                    </span>
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon
                        size={14}
                        className="flex-shrink-0 text-slate-600"
                        aria-hidden="true"
                      />
                      <span
                        className={[
                          "text-sm leading-relaxed",
                          accent
                            ? "text-slate-200 font-medium"
                            : "text-slate-400",
                        ].join(" ")}
                      >
                        {text}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Stat strip */}
              <div
                className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-center"
                aria-label="Key metrics"
              >
                {[
                  { value: "48h", label: "Deploy time" },
                  { value: "99.9%", label: "Uptime SLA" },
                  { value: "15+", label: "Countries" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                      {value}
                    </span>
                    <span className="text-[11px] text-slate-500 leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>

          {/* ── Right: Why Choose Us ─────────────────────────────────────── */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: 30 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <AnimatedCard glowColor="violet" className="p-8 h-full">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Star size={18} className="text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                  Why Choose Us
                </h3>
              </div>

              {/* Trust points */}
              <div className="space-y-4">
                {TRUST_POINTS.map(({ icon: Icon, title, body, color, bg, border }, i) => (
                  <motion.div
                    key={title}
                    initial={reduced ? {} : { opacity: 0, y: 12 }}
                    whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 0.4,
                      delay: reduced ? 0 : 0.1 + i * 0.07,
                      ease: EASE,
                    }}
                    className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors duration-200"
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${bg} border ${border}`}
                      aria-hidden="true"
                    >
                      <Icon size={15} className={color} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white leading-tight">
                        {title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
