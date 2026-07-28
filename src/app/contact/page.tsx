import React from "react";
import type { Metadata } from "next";
import {
  MessageCircle,
  Mail,
  Clock,
  Globe,
  ArrowRight,
  ExternalLink,
  AtSign,
  MapPin,
  Headphones,
} from "lucide-react";

import LeadForm from "@/components/contact/LeadForm";
import BenefitsSection from "@/components/contact/BenefitsSection";
import CTAOptions from "@/components/contact/CTAOptions";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import GlowButton from "@/components/ui/GlowButton";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Contact Us — Start Your AI Project | AI Tool Creator",
  description:
    "Book a free AI consultation, request a live demo, or send us your project brief. Our team responds within 24 hours. Custom AI agents built and deployed in 48 hours.",
  keywords: [
    "contact AI company",
    "AI consultation free",
    "custom AI agent quote",
    "AI automation company contact",
    "book AI demo",
    "AI development company",
    "WhatsApp AI contact",
    "hire AI developer",
  ],
  openGraph: {
    title: "Contact Us — Start Your AI Project | AI Tool Creator",
    description:
      "Ready to build your custom AI agent? Book a free consultation and get a live agent in 48 hours.",
    type: "website",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact AI Tool Creator — Free Consultation",
    description:
      "Start your AI project today. Free strategy call · 48-hour deployment · No commitment required.",
  },
};

// ─── Static contact info data ─────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@aitoolcreator.com",
    href: "mailto:hello@aitoolcreator.com",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Globe,
    label: "Availability",
    value: "Mon–Fri, 9 AM – 7 PM IST",
    href: null,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Headphones,
    label: "Support",
    value: "24/7 for active clients",
    href: null,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
] as const;

const SOCIAL_LINKS = [
  {
    icon: ExternalLink,
    label: "LinkedIn",
    href: "https://linkedin.com/company/aitoolcreator",
  },
  {
    icon: AtSign,
    label: "Twitter / X",
    href: "https://twitter.com/aitoolcreator",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/message/aitoolcreator",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="bg-[#0A0F1E] min-h-screen">
      {/*
       * Fixed ambient blobs — opacities within 0.07–0.10 per DESIGN.md.
       * Fixed so they persist through scroll without layout cost.
       */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/3 w-[600px] h-[500px] rounded-full bg-indigo-600 opacity-[0.07] blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.06] blur-[100px]" />
        <div className="absolute top-2/3 left-0 w-[350px] h-[350px] rounded-full bg-cyan-600 opacity-[0.05] blur-[80px]" />
      </div>

      {/* ── Page Hero ────────────────────────────────────────────────────── */}
      <section
        className="relative pb-8 px-4 sm:px-6 lg:px-8 text-center"
        aria-labelledby="contact-hero-heading"
      >
        {/* Navbar clearance */}
        <div className="h-24" aria-hidden="true" />

        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <SectionBadge icon={<MessageCircle size={12} aria-hidden="true" />}>
              Contact Us
            </SectionBadge>
          </div>

          {/* H1 */}
          <h1
            id="contact-hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white font-[family-name:var(--font-space-grotesk)]"
          >
            Let&apos;s Build Your{" "}
            <GradientText className="font-bold">AI Solution</GradientText>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll have a working AI agent in production
            within{" "}
            <span className="text-white font-medium">48 hours</span>. No fluff,
            no long contracts — just results.
          </p>

          {/* Quick-action pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Free consultation", icon: <Clock size={12} aria-hidden="true" /> },
              { label: "48h deployment", icon: <ArrowRight size={12} aria-hidden="true" /> },
              { label: "No lock-in contract", icon: <Globe size={12} aria-hidden="true" /> },
            ].map(({ label, icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs"
              >
                <span className="text-indigo-400">{icon}</span>
                {label}
              </span>
            ))}
          </div>

          {/* Gradient rule */}
          <div
            className="mt-12 max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ── Main Content: Form + Contact Info ────────────────────────────── */}
      <section
        className="relative py-16 px-4 sm:px-6 lg:px-8"
        aria-label="Contact form and information"
        id="lead-form"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* ── LEFT: Lead Form ──────────────────────────────────────── */}
            <div>
              {/* Form card wrapper */}
              <div
                className="rounded-2xl p-7 sm:p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white font-[family-name:var(--font-space-grotesk)] leading-tight">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                    Fields marked{" "}
                    <span className="text-indigo-400" aria-hidden="true">
                      *
                    </span>{" "}
                    are required. We&apos;ll follow up within 24 hours.
                  </p>
                </div>
                <LeadForm />
              </div>
            </div>

            {/* ── RIGHT: Contact Info, Social, Map placeholder ──────────── */}
            <div className="flex flex-col gap-6 lg:pt-2">

              {/* Contact details card */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-5">
                  Contact Details
                </h2>
                <ul className="space-y-4" role="list">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href, color, bg }) => (
                    <li key={label} role="listitem" className="flex items-center gap-3">
                      <span
                        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}
                        aria-hidden="true"
                      >
                        <Icon size={16} className={color} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] text-slate-600 leading-none mb-0.5 uppercase tracking-wider">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm text-slate-300 hover:text-indigo-300 transition-colors duration-200 leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-slate-300 leading-tight">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social links card */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-5">
                  Find Us Online
                </h3>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                    <GlowButton
                      key={label}
                      variant="outline"
                      size="sm"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${label} page`}
                    >
                      <Icon size={14} aria-hidden="true" />
                      {label}
                    </GlowButton>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                role="img"
                aria-label="Office location map placeholder"
              >
                <div
                  className="flex flex-col items-center justify-center gap-3 py-14 px-6 text-center"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 60%, rgba(99,102,241,0.10) 0%, rgba(10,15,30,0.95) 70%)",
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-500/15 flex items-center justify-center">
                    <MapPin size={18} className="text-indigo-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Remote-first · Globally available
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      We work with clients across 15+ countries from our
                      distributed team of AI engineers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct CTA */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.20)",
                }}
              >
                <p className="text-sm text-slate-300 font-medium mb-1">
                  Prefer to talk first?
                </p>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Skip the form — book a free 30-minute call directly with our team.
                </p>
                <GlowButton variant="primary" size="sm" href="#lead-form" className="w-full justify-center">
                  Book Free Call
                  <ArrowRight size={14} aria-hidden="true" />
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      {/* ── CTA Options ──────────────────────────────────────────────────── */}
      <CTAOptions />

      {/* Divider */}
      <div
        className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      {/* ── Benefits Section ─────────────────────────────────────────────── */}
      <BenefitsSection />
    </main>
  );
}
