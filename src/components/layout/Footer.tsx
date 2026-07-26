import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "AI Chatbots", href: "/solutions" },
    { label: "WhatsApp Agents", href: "/solutions" },
    { label: "Business Automation", href: "/solutions" },
    { label: "Voice AI", href: "/solutions" },
    { label: "Custom Integrations", href: "/solutions" },
  ],
  Company: [
    { label: "Home", href: "/" },
    { label: "AI Solutions", href: "/solutions" },
    { label: "AI Agents", href: "/agents" },
    { label: "Technology", href: "/technology" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@aitoolcreator.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0A0F1E]">
      {/* Gradient glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] opacity-50"
        style={{
          background: "linear-gradient(90deg, transparent, #6366F1, #8B5CF6, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="AI Tool Creator"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="font-bold text-lg gradient-text"
                style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
              >
                AI Tool Creator
              </span>
            </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs mb-6">
              We build custom AI agents and automation solutions that transform
              how businesses operate. From MVPs to enterprise-grade systems —
              delivered fast.
            </p>
            {/* Newsletter / CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6366F1] hover:text-[#8B5CF6] transition-colors group"
            >
              Start a project
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-5"
              >
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#475569] text-sm">
            © {new Date().getFullYear()} AI Tool Creator. All rights reserved.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#475569] hover:text-white hover:bg-white/5 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
