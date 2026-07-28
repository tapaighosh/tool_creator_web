import React from "react";
import type { Metadata } from "next";
import {
  MessageCircle,
  Headphones,
  Phone,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import SolutionCard from "@/components/solutions/SolutionCard";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import GlowButton from "@/components/ui/GlowButton";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "AI Solutions — WhatsApp AI, Voice Agent, Sales Automation | AI Tool Creator",
  description:
    "Explore our complete AI solution suite: WhatsApp AI Assistant, Customer Support Agent, Voice Calling Agent, Sales Automation, and Business Process Automation. Custom-built for your business needs.",
  openGraph: {
    title:
      "AI Solutions — WhatsApp AI, Voice Agent, Sales Automation | AI Tool Creator",
    description:
      "Custom AI agents and automation solutions that transform how your business operates. Deploy intelligent AI across every customer touchpoint.",
    type: "website",
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeColor = "indigo" | "violet" | "cyan" | "green" | "orange";

interface SolutionEntry {
  title: string;
  description: string;
  icon: React.ReactElement;
  badgeColor: BadgeColor;
  features: string[];
}

// ─── Solutions Data ───────────────────────────────────────────────────────────

const solutions: SolutionEntry[] = [
  {
    title: "WhatsApp AI Assistant",
    description:
      "Deploy a 24/7 intelligent conversational AI directly in WhatsApp. Automate customer queries, qualify leads, and drive sales — all inside the world's most-used messaging platform.",
    icon: <MessageCircle size={48} aria-hidden="true" />,
    badgeColor: "green",
    features: [
      "Natural language understanding in 50+ languages",
      "Automated lead qualification and scoring",
      "Product catalog browsing and order management",
      "Appointment scheduling and reminders",
      "Payment link generation and follow-up",
      "Seamless human handoff with full conversation context",
      "Real-time analytics and conversation insights",
      "CRM integration (HubSpot, Salesforce, Zoho)",
      "Custom workflow triggers and automation rules",
      "GDPR-compliant data handling and message encryption",
    ],
  },
  {
    title: "AI Customer Support Agent",
    description:
      "Replace repetitive tier-1 support tickets with an AI that resolves issues autonomously. Reduce response time from hours to seconds while keeping customer satisfaction high.",
    icon: <Headphones size={48} aria-hidden="true" />,
    badgeColor: "indigo",
    features: [
      "Instant ticket resolution for common queries (up to 80% deflection)",
      "Knowledge base integration and intelligent search",
      "Multi-channel support: chat, email, and web widget",
      "Sentiment detection with priority escalation",
      "Auto-generated response drafts for human agents",
      "Detailed ticket categorisation and tagging",
      "Customer satisfaction (CSAT) tracking and reporting",
    ],
  },
  {
    title: "AI Voice Calling Agent",
    description:
      "Automate inbound and outbound calls at scale with a lifelike AI voice agent. Handle appointment reminders, surveys, lead follow-ups, and more — without a single human dial.",
    icon: <Phone size={48} aria-hidden="true" />,
    badgeColor: "violet",
    features: [
      "Human-like voice synthesis with sub-second latency",
      "Inbound call routing and intent detection",
      "Outbound campaign management and scheduling",
      "Real-time transcription and call summarisation",
      "Dynamic script personalisation using CRM data",
      "Call outcome tracking with conversion analytics",
      "Seamless transfer to live agents on complex queries",
    ],
  },
  {
    title: "AI Sales Assistant",
    description:
      "Give your sales team an AI co-pilot that handles prospecting, follow-ups, and proposal drafting — so reps focus on closing deals, not admin.",
    icon: <TrendingUp size={48} aria-hidden="true" />,
    badgeColor: "orange",
    features: [
      "Automated lead enrichment and ICP scoring",
      "Personalised outreach sequences across email and LinkedIn",
      "AI-generated proposal and quote drafts",
      "Pipeline forecasting and deal health scoring",
      "Meeting prep briefs with prospect intelligence",
      "Post-call follow-up automation with action items",
      "Revenue attribution and ROI reporting",
    ],
  },
  {
    title: "AI Business Automation",
    description:
      "Connect your entire tech stack and eliminate manual workflows. Our AI orchestration layer makes your business run on autopilot — from data entry to complex multi-step processes.",
    icon: <Zap size={48} aria-hidden="true" />,
    badgeColor: "cyan",
    features: [
      "No-code workflow builder with 200+ app integrations",
      "Document processing, extraction, and classification",
      "Automated reporting and dashboard generation",
      "Inventory management and reorder automation",
      "HR onboarding and offboarding orchestration",
      "Finance reconciliation and invoice processing",
      "Custom trigger-based alerts and escalation paths",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SolutionsPage() {
  return (
    <main className="bg-[#0A0F1E] min-h-screen">
      {/*
       * Ambient background — fixed so they stay in place during scroll.
       * All opacities are within DESIGN.md cap of 0.08–0.12.
       */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600 opacity-[0.07] blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.06] blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-cyan-600 opacity-[0.05] blur-[80px]" />
      </div>

      {/* ── Page Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative py-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="solutions-hero-heading"
      >
        {/* Navbar clearance spacer */}
        <div className="h-24" aria-hidden="true" />

        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <SectionBadge icon={<Sparkles size={12} aria-hidden="true" />}>
              AI Solutions
            </SectionBadge>
          </div>

          {/* H1 — Space Grotesk, one per page */}
          <h1
            id="solutions-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white font-[family-name:var(--font-space-grotesk)]"
          >
            AI Solutions for{" "}
            <GradientText className="font-bold">Every Business Need</GradientText>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Purpose-built AI agents and automation systems that integrate with
            your existing tools, scale with your team, and deliver measurable
            ROI from day one.
          </p>
        </div>
      </section>

      {/* ── Solutions List ──────────────────────────────────────────────── */}
      <section
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-8"
        aria-label="AI solution details"
      >
        {solutions.map((solution, index) => (
          <SolutionCard
            key={solution.title}
            title={solution.title}
            description={solution.description}
            features={solution.features}
            icon={solution.icon}
            index={index}
            badgeColor={solution.badgeColor}
          />
        ))}
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8 text-center"
        aria-labelledby="solutions-cta-heading"
      >
        {/* Decorative separator */}
        <div
          className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mb-16"
          aria-hidden="true"
        />

        <div className="max-w-2xl mx-auto">
          {/* CTA Heading — H2, Space Grotesk */}
          <h2
            id="solutions-cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-space-grotesk)] leading-tight tracking-tight"
          >
            Ready to Deploy Your{" "}
            <GradientText className="font-bold">AI Solution?</GradientText>
          </h2>

          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            Our team will design, build, and deploy a custom AI agent tailored
            to your exact workflow — in as little as two weeks.
          </p>

          {/* Action buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton
              variant="primary"
              size="lg"
              href="/contact"
            >
              <CalendarDays size={18} aria-hidden="true" />
              Book Free Consultation
            </GlowButton>

            <GlowButton
              variant="outline"
              size="lg"
              href="/agents"
            >
              View AI Agents →
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
