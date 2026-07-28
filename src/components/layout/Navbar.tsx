"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Menu, X, CalendarDays } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

// ─── Navigation links ─────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Solutions",  href: "/solutions" },
  { label: "AI Agents",  href: "/agents" },
  { label: "Technology", href: "/technology" },
  { label: "Contact",    href: "/contact" },
] as const;

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname                   = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on route change ────────────────────────────────────
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ── Scroll-aware navbar styles ────────────────────────────────────────────
  const navBg = scrolled
    ? "bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    : "bg-black/40";

  return (
    <>
      {/* ── Entrance animation ───────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
        role="banner"
      >
        <nav
          className={[
            // Float + shape
            "relative mx-auto max-w-7xl rounded-2xl",
            // Glass base
            "backdrop-blur-xl border border-white/10",
            // Scroll-aware bg + shadow
            navBg,
            "transition-all duration-300 ease-out",
          ].join(" ")}
          aria-label="Main navigation"
        >

          {/* Top gradient accent line */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(99,102,241,0.5), transparent)",
            }}
            aria-hidden="true"
          />

          {/* ── Desktop / base bar ───────────────────────────────────────── */}
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
              aria-label="AI Tool Creator — home"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 group-hover:bg-indigo-600/30 transition-colors duration-300">
                <Bot size={18} className="text-indigo-400" aria-hidden="true" />
              </span>
              <span className="font-bold text-base tracking-tight" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI
                </span>{" "}
                <span className="text-slate-100">Tool Creator</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        "relative px-3 py-2 text-sm font-medium rounded-lg",
                        "transition-colors duration-200 ease-out",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                        active
                          ? "text-indigo-400"
                          : "text-slate-400 hover:text-white hover:bg-white/5",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      {label}

                      {/* Animated active-page indicator dot */}
                      {active && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-3">
              <GlowButton
                href="/contact"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <CalendarDays size={14} aria-hidden="true" />
                Book Consultation
              </GlowButton>

              {/* Hamburger — mobile only */}
              <motion.button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                whileTap={{ scale: 0.92 }}
                className={[
                  "md:hidden flex items-center justify-center w-9 h-9 rounded-lg",
                  "border border-white/10 bg-white/5",
                  "text-slate-300 hover:text-white hover:bg-white/10",
                  "cursor-pointer transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                ].join(" ")}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0,   opacity: 1 }}
                      exit={{   rotate:  90,  opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={18} aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate:  90, opacity: 0 }}
                      animate={{ rotate:  0,  opacity: 1 }}
                      exit={{   rotate: -90,  opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={18} aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* ── Mobile dropdown ──────────────────────────────────────────── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-menu"
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{   height: 0,    opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-hidden"
                role="navigation"
                aria-label="Mobile navigation"
              >
                <div className="px-4 pb-4 pt-2 border-t border-white/5 flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href }, i) => {
                    const active = isActive(href);
                    return (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.25, ease: "easeOut" }}
                      >
                        <Link
                          href={href}
                          className={[
                            "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium",
                            "transition-colors duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                            active
                              ? "text-indigo-400 bg-indigo-500/10"
                              : "text-slate-400 hover:text-white hover:bg-white/5",
                          ].join(" ")}
                          aria-current={active ? "page" : undefined}
                        >
                          {active && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {label}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile CTA */}
                  <div className="pt-2">
                    <GlowButton
                      href="/contact"
                      variant="primary"
                      size="md"
                      className="w-full justify-center"
                    >
                      <CalendarDays size={16} aria-hidden="true" />
                      Book Consultation
                    </GlowButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Spacer — clears the floating bar so page content is not hidden */}
      <div className="h-24" aria-hidden="true" />
    </>
  );
}
