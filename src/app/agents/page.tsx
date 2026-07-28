import React from "react";
import type { Metadata } from "next";
import { Bot, CalendarDays, ArrowRight, Sparkles } from "lucide-react";

import FeaturedAgentSection from "@/components/agents/FeaturedAgentSection";
import BusinessAgentsGrid from "@/components/agents/BusinessAgentsGrid";
import AgentDirectory from "@/components/agents/AgentDirectory";
import GlowButton from "@/components/ui/GlowButton";
import GradientText from "@/components/ui/GradientText";
import SectionBadge from "@/components/ui/SectionBadge";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Agents — Custom AI Agents for Every Business Function | AI Tool Creator",
  description:
    "Explore 20+ production-ready AI agents: WhatsApp bots, sales automation, customer support, voice calling, and more. Custom-built and deployed in 48 hours.",
  openGraph: {
    title: "AI Agents — Custom AI Agents for Every Business Function | AI Tool Creator",
    description:
      "From WhatsApp AI to voice calling agents — browse our complete AI agent catalogue and book a free consultation to deploy your custom agent.",
    type: "website",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  return (
    <main className="bg-[#0A0F1E] min-h-screen">
      {/*
       * Ambient background blobs — fixed so they persist through scroll.
       * Opacities within DESIGN.md cap of 0.08–0.12.
       */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/3 w-[700px] h-[600px] rounded-full bg-indigo-600 opacity-[0.07] blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.06] blur-[100px]" />
        <div className="absolute top-2/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-600 opacity-[0.05] blur-[80px]" />
      </div>

      {/* ── Page Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative pb-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="agents-hero-heading"
      >
        {/* Navbar clearance */}
        <div className="h-24" aria-hidden="true" />

        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <SectionBadge icon={<Bot size={12} aria-hidden="true" />}>
              AI Agents
            </SectionBadge>
          </div>

          <h1
            id="agents-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white font-[family-name:var(--font-space-grotesk)]"
          >
            Custom AI Agents,{" "}
            <GradientText className="font-bold">Built for Your Business</GradientText>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            From WhatsApp bots to voice calling agents — every agent is
            custom-built on your data, integrated with your stack, and
            deployed in production within 48 hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton variant="primary" size="lg" href="/contact">
              <CalendarDays size={18} aria-hidden="true" />
              Book Free Consultation
            </GlowButton>
            <GlowButton variant="outline" size="lg" href="/solutions">
              Browse Solutions
              <ArrowRight size={18} aria-hidden="true" />
            </GlowButton>
          </div>
        </div>
      </section>

      {/* ── Featured Agent ─────────────────────────────────────────────── */}
      <FeaturedAgentSection />

      {/* ── Department Grid ─────────────────────────────────────────────── */}
      <BusinessAgentsGrid />

      {/* ── Agent Directory ─────────────────────────────────────────────── */}
      <AgentDirectory />

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8 text-center"
        aria-labelledby="agents-cta-heading"
      >
        {/* Decorative separator */}
        <div
          className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mb-16"
          aria-hidden="true"
        />

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <SectionBadge icon={<Sparkles size={12} aria-hidden="true" />}>
              Bespoke Agent
            </SectionBadge>
          </div>

          <h2
            id="agents-cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-space-grotesk)] leading-tight tracking-tight"
          >
            Want a{" "}
            <GradientText className="font-bold">Custom AI Agent?</GradientText>
          </h2>

          <p className="mt-4 text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            Don&apos;t see exactly what you need? We build bespoke AI agents from
            scratch — trained on your data and integrated into your existing
            workflow in under 48 hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton variant="primary" size="lg" href="/contact">
              <CalendarDays size={18} aria-hidden="true" />
              Talk to Our Team
            </GlowButton>
            <GlowButton variant="outline" size="lg" href="/technology">
              See Our Tech Stack
              <ArrowRight size={18} aria-hidden="true" />
            </GlowButton>
          </div>
        </div>

        {/* Decorative bottom rule */}
        <div
          className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mt-16"
          aria-hidden="true"
        />
      </section>
    </main>
  );
}
