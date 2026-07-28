import React from "react";
import type { Metadata } from "next";
import { Cpu, CalendarDays, ArrowRight, Sparkles, Layers } from "lucide-react";

import ArchitectureFlow from "@/components/technology/ArchitectureFlow";
import TechStackSection from "@/components/technology/TechStackSection";
import GlowButton from "@/components/ui/GlowButton";
import GradientText from "@/components/ui/GradientText";
import SectionBadge from "@/components/ui/SectionBadge";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Technology Architecture — AI Stack & Infrastructure | AI Tool Creator",
  description:
    "Explore the enterprise AI stack powering our custom agents: Next.js, GPT-4o, Claude, LangChain, Pinecone, MongoDB and more. Production-grade architecture built for scale.",
  keywords: [
    "AI technology stack",
    "enterprise AI architecture",
    "LangChain AI",
    "GPT-4o integration",
    "AI agent infrastructure",
    "vector database",
    "AI workflow automation",
    "custom AI development stack",
  ],
  openGraph: {
    title: "Technology Architecture — AI Stack & Infrastructure | AI Tool Creator",
    description:
      "See the battle-tested AI stack we use to build production-grade custom agents — from LLMs to vector databases to real-time communication APIs.",
    type: "website",
    url: "/technology",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Architecture | AI Tool Creator",
    description:
      "GPT-4o · Claude · LangChain · Pinecone · n8n — the full AI stack behind our custom agents.",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TechnologyPage() {
  return (
    <main className="bg-[#0A0F1E] min-h-screen">
      {/*
       * Fixed ambient blobs — persist through scroll without layout cost.
       * Opacities within 0.07–0.10 per DESIGN.md glow caps.
       */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full bg-indigo-600 opacity-[0.07] blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.06] blur-[100px]" />
        <div className="absolute top-2/3 left-0 w-[350px] h-[350px] rounded-full bg-cyan-600 opacity-[0.05] blur-[80px]" />
      </div>

      {/* ── Page Hero ────────────────────────────────────────────────────── */}
      <section
        className="relative pb-12 px-4 sm:px-6 lg:px-8"
        aria-labelledby="technology-hero-heading"
      >
        {/* Navbar clearance (Navbar has h-24 spacer per project convention) */}
        <div className="h-24" aria-hidden="true" />

        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <SectionBadge icon={<Cpu size={12} aria-hidden="true" />}>
              Technology
            </SectionBadge>
          </div>

          {/* H1 — Space Grotesk only at display size */}
          <h1
            id="technology-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white font-[family-name:var(--font-space-grotesk)]"
          >
            Our Technology{" "}
            <GradientText className="font-bold">Architecture</GradientText>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Every custom AI agent we ship runs on a battle-tested stack — carefully selected
            for production reliability, response speed, and seamless integration with your
            existing business systems.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton variant="primary" size="lg" href="/contact">
              <CalendarDays size={18} aria-hidden="true" />
              Book Free Consultation
            </GlowButton>
            <GlowButton variant="outline" size="lg" href="/agents">
              Explore AI Agents
              <ArrowRight size={18} aria-hidden="true" />
            </GlowButton>
          </div>

          {/* Decorative gradient rule */}
          <div
            className="mt-14 max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ── Architecture Diagram ─────────────────────────────────────────── */}
      <ArchitectureFlow />

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      {/* ── Tech Stack Grid ──────────────────────────────────────────────── */}
      <TechStackSection />

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8 text-center"
        aria-labelledby="technology-cta-heading"
      >
        {/* Separator */}
        <div
          className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mb-16"
          aria-hidden="true"
        />

        <div className="max-w-2xl mx-auto">
          {/* CTA badge */}
          <div className="flex justify-center mb-6">
            <SectionBadge icon={<Sparkles size={12} aria-hidden="true" />}>
              Enterprise Ready
            </SectionBadge>
          </div>

          <h2
            id="technology-cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-space-grotesk)] leading-tight tracking-tight"
          >
            Build Your Custom{" "}
            <GradientText className="font-bold">AI Stack</GradientText>
          </h2>

          <p className="mt-5 text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            We architect, build, and deploy the right AI stack for your business — integrating
            seamlessly with your CRM, ERP, databases, and communication channels.
          </p>

          {/* Stat pills */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            role="list"
            aria-label="Key infrastructure stats"
          >
            {[
              { label: "48-hour deployment", icon: <Layers size={12} aria-hidden="true" /> },
              { label: "99.9% uptime SLA", icon: <Cpu size={12} aria-hidden="true" /> },
              { label: "< 800 ms avg response", icon: <ArrowRight size={12} aria-hidden="true" /> },
            ].map(({ label, icon }) => (
              <div
                key={label}
                role="listitem"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs"
              >
                <span className="text-indigo-400">{icon}</span>
                {label}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton variant="primary" size="lg" href="/contact">
              <CalendarDays size={18} aria-hidden="true" />
              Start Your Project
            </GlowButton>
            <GlowButton variant="outline" size="lg" href="/solutions">
              View Solutions
              <ArrowRight size={18} aria-hidden="true" />
            </GlowButton>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mt-16"
          aria-hidden="true"
        />
      </section>
    </main>
  );
}
