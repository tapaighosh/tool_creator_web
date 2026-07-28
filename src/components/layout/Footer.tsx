import React from "react";
import Link from "next/link";
import { Bot, Mail } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { label: "Custom AI Agent",   href: "/solutions#custom-ai" },
  { label: "WhatsApp AI",       href: "/solutions#whatsapp" },
  { label: "AI Voice Agent",    href: "/solutions#voice" },
  { label: "AI Sales",          href: "/solutions#sales" },
  { label: "AI Automation",     href: "/solutions#automation" },
];

const COMPANY = [
  { label: "About",      href: "/#about" },
  { label: "Solutions",  href: "/solutions" },
  { label: "AI Agents",  href: "/agents" },
  { label: "Technology", href: "/technology" },
  { label: "Contact",    href: "/contact" },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    href:  "https://linkedin.com",
    icon: (
      <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href:  "https://twitter.com",
    icon: (
      <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href:  "https://github.com",
    icon: (
      <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

// ─── Shared column heading ────────────────────────────────────────────────────

function ColHeading({ children }: { children: string }) {
  return (
    <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-5">
      {children}
    </h3>
  );
}

// ─── Gradient divider ─────────────────────────────────────────────────────────

function GradientDivider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(99,102,241,0.2), transparent)",
      }}
      aria-hidden="true"
    />
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      className="relative mt-auto bg-[#060B16] overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Ambient radial glow at top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top gradient border line */}
      <GradientDivider />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Column 1: Brand ────────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
              aria-label="AI Tool Creator — home"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 group-hover:bg-indigo-600/30 transition-colors duration-300">
                <Bot size={18} className="text-indigo-400" aria-hidden="true" />
              </span>
              <span
                className="font-bold text-base tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
              >
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI
                </span>{" "}
                <span className="text-slate-100">Tool Creator</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
              Building intelligent AI agents for the future of business.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3" role="list" aria-label="Social media links">
              {SOCIAL.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={label}
                  className={[
                    "flex items-center justify-center w-8 h-8 rounded-lg",
                    "border border-white/10 bg-white/5",
                    "text-slate-500",
                    "hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/10",
                    "hover:scale-110",
                    "transition-all duration-200 cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  ].join(" ")}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Services ─────────────────────────────────────── */}
          <nav aria-label="Services links">
            <ColHeading>Services</ColHeading>
            <ul className="flex flex-col gap-2.5" role="list">
              {SERVICES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "text-sm text-slate-400",
                      "hover:text-indigo-300",
                      "transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Column 3: Company ──────────────────────────────────────── */}
          <nav aria-label="Company links">
            <ColHeading>Company</ColHeading>
            <ul className="flex flex-col gap-2.5" role="list">
              {COMPANY.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "text-sm text-slate-400",
                      "hover:text-indigo-300",
                      "transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Column 4: Contact ──────────────────────────────────────── */}
          <div>
            <ColHeading>Contact</ColHeading>
            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href="mailto:hello@aitoolcreator.com"
                className={[
                  "inline-flex items-center gap-2 text-sm text-slate-400",
                  "hover:text-indigo-300",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded",
                ].join(" ")}
              >
                <Mail size={15} className="text-indigo-500 flex-shrink-0" aria-hidden="true" />
                hello@aitoolcreator.com
              </a>

              {/* CTA */}
              <GlowButton href="/contact" variant="outline" size="sm" className="w-fit">
                Book a Free Consultation
              </GlowButton>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <GradientDivider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} AI Tool Creator. All rights reserved.
        </p>

        <div className="flex items-center gap-4" aria-label="Legal links">
          <Link
            href="/privacy"
            className="text-slate-500 text-xs hover:text-slate-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            Privacy Policy
          </Link>
          <span className="text-slate-700 text-xs" aria-hidden="true">|</span>
          <Link
            href="/terms"
            className="text-slate-500 text-xs hover:text-slate-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
