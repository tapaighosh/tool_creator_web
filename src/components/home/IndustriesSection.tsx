"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  GraduationCap,
  Building2,
  UtensilsCrossed,
  ShoppingCart,
  TrendingUp,
  Factory,
  Scale,
  Shield,
  Plane,
  Hotel,
  HardHat,
  Car,
  Store,
  Truck,
  Briefcase,
} from "lucide-react";
import GradientText from "@/components/ui/GradientText";
import GlowButton from "@/components/ui/GlowButton";
import SectionBadge from "@/components/ui/SectionBadge";
import AnimatedCard from "@/components/ui/AnimatedCard";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Industry {
  name: string;
  icon: React.ReactNode;
}

const INDUSTRIES: Industry[] = [
  { name: "Healthcare",            icon: <Heart size={15} aria-hidden="true" /> },
  { name: "Education",             icon: <GraduationCap size={15} aria-hidden="true" /> },
  { name: "Real Estate",           icon: <Building2 size={15} aria-hidden="true" /> },
  { name: "Restaurants",           icon: <UtensilsCrossed size={15} aria-hidden="true" /> },
  { name: "E-commerce",            icon: <ShoppingCart size={15} aria-hidden="true" /> },
  { name: "Finance",               icon: <TrendingUp size={15} aria-hidden="true" /> },
  { name: "Manufacturing",         icon: <Factory size={15} aria-hidden="true" /> },
  { name: "Legal",                 icon: <Scale size={15} aria-hidden="true" /> },
  { name: "Insurance",             icon: <Shield size={15} aria-hidden="true" /> },
  { name: "Travel",                icon: <Plane size={15} aria-hidden="true" /> },
  { name: "Hospitality",           icon: <Hotel size={15} aria-hidden="true" /> },
  { name: "Construction",          icon: <HardHat size={15} aria-hidden="true" /> },
  { name: "Automotive",            icon: <Car size={15} aria-hidden="true" /> },
  { name: "Retail",                icon: <Store size={15} aria-hidden="true" /> },
  { name: "Logistics",             icon: <Truck size={15} aria-hidden="true" /> },
  { name: "Professional Services", icon: <Briefcase size={15} aria-hidden="true" /> },
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

const pillReveal = (i: number) => ({
  initial: { opacity: 0, scale: 0.88, y: 12 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: {
    duration: 0.4,
    delay: i * 0.045,
    ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
  },
});

const ctaReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: {
    duration: 0.6,
    delay: 0.2,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};

// ─── IndustriesSection ────────────────────────────────────────────────────────

export default function IndustriesSection() {
  return (
    <section
      className="relative py-24 lg:py-32 bg-[#0A0F1E] overflow-hidden"
      aria-labelledby="industries-heading"
    >
      {/* Ambient glow — centre-bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.09) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ──────────────────────────────────────────── */}
        <motion.div
          {...sectionReveal}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <SectionBadge>Industries We Serve</SectionBadge>

          <h2
            id="industries-heading"
            className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] text-white"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
          >
            AI Solutions Across{" "}
            <GradientText tag="span" className="text-4xl md:text-5xl font-bold">
              Every Industry
            </GradientText>
          </h2>

          <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed">
            Our AI agents are deployed across 16+ industries worldwide
          </p>
        </motion.div>

        {/* ── Industry pills ───────────────────────────────────────────── */}
        <ul
          className="flex flex-wrap justify-center gap-3"
          role="list"
          aria-label="Industries served"
        >
          {INDUSTRIES.map(({ name, icon }, i) => (
            <motion.li
              key={name}
              {...pillReveal(i)}
              // Hover handled by CSS classes below — no FM whileHover to avoid
              // layout-shifting scale on list items per DESIGN.md §9
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={[
                  // Base pill
                  "group inline-flex items-center gap-2",
                  "rounded-full px-4 py-2 text-sm",
                  "border border-white/10 bg-white/5",
                  "text-slate-300 cursor-pointer",
                  // Hover state
                  "hover:bg-indigo-500/15 hover:border-indigo-500/40",
                  "hover:text-white",
                  "hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]",
                  // Transition
                  "transition-[color,background-color,border-color,box-shadow] duration-200 ease-out",
                  "motion-reduce:transition-none",
                  // Focus
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]",
                ].join(" ")}
                aria-label={`${name} industry`}
              >
                {/* Icon — inherits text color via currentColor */}
                <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200 flex-shrink-0">
                  {icon}
                </span>
                {name}
              </motion.button>
            </motion.li>
          ))}
        </ul>

        {/* ── CTA Banner ───────────────────────────────────────────────── */}
        <motion.div {...ctaReveal} className="mt-16">
          <AnimatedCard glowColor="indigo" className="overflow-hidden">
            {/* Inner gradient wash */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.12) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Decorative top-right orb */}
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 100% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              aria-hidden="true"
            />

            <div className="relative p-8 md:p-12 text-center flex flex-col items-center">
              <h3
                className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
              >
                Ready to transform your industry with AI?
              </h3>

              <p className="mt-3 mb-8 text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
                Join hundreds of businesses already automating their workflows
                with custom AI agents — delivered in days, not months.
              </p>

              <GlowButton href="/contact" variant="primary" size="lg">
                Start Your AI Journey
                <span aria-hidden="true"> →</span>
              </GlowButton>
            </div>
          </AnimatedCard>
        </motion.div>
      </div>
    </section>
  );
}
