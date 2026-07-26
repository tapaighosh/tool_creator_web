"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/agents", label: "AI Agents" },
  { href: "/technology", label: "Technology" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0F1E]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="AI Tool Creator Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className="font-display font-bold text-lg tracking-tight gradient-text"
              style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
            >
              AI Tool Creator
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-200 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              }}
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0A0F1E]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block mt-3 px-4 py-3 rounded-xl text-center text-white font-semibold"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                }}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
