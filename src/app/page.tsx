import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import IndustriesSection from "@/components/home/IndustriesSection";

// ─── Page-level SEO metadata ──────────────────────────────────────────────────
// layout.tsx carries the site-wide default title template "%s | AI Tool Creator".
// This page-specific metadata overrides the default for the Home route.

export const metadata: Metadata = {
  title: "AI Tool Creator — Build Powerful AI Agents for Your Business",
  description:
    "Custom AI Agent Development, WhatsApp AI, Voice Calling Agent, Sales Automation and more. Transform your business with intelligent AI solutions.",
  keywords: [
    "AI agents",
    "AI automation",
    "WhatsApp AI",
    "AI chatbot",
    "business automation",
    "custom AI development",
    "AI voice agent",
    "AI sales automation",
  ],
  openGraph: {
    title: "AI Tool Creator — Build Powerful AI Agents for Your Business",
    description:
      "Custom AI Agent Development, WhatsApp AI, Voice Calling Agent, Sales Automation and more. Transform your business with intelligent AI solutions.",
    url: "/",
  },
};

// ─── Home page ────────────────────────────────────────────────────────────────
// Navbar and Footer are mounted once in src/app/layout.tsx — do NOT import them
// here. layout.tsx also wraps children in <main className="flex-1">, so page
// content renders directly as section elements.

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <IndustriesSection />
    </>
  );
}
