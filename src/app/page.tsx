import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import IndustriesSection from "@/components/home/IndustriesSection";

export const metadata: Metadata = {
  title: "AI Tool Creator — Custom AI Agents & Business Automation",
  description:
    "We build custom AI agents, WhatsApp bots, automation workflows, and enterprise AI solutions. From MVP to production in 48 hours.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <IndustriesSection />
      </main>
      <Footer />
    </>
  );
}
