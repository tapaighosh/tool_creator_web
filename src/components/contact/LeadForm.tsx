"use client";

import React, { useState, useId, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Building2,
  Phone,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service…" },
  { value: "AI Agent Development", label: "AI Agent Development" },
  { value: "WhatsApp AI", label: "WhatsApp AI" },
  { value: "AI Customer Support", label: "AI Customer Support" },
  { value: "AI Voice Calling", label: "AI Voice Calling" },
  { value: "AI Sales Automation", label: "AI Sales Automation" },
  { value: "AI Business Automation", label: "AI Business Automation" },
  { value: "Other", label: "Other" },
] as const;

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  serviceInterest: "",
  message: "",
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email address.";
}

function validateField(field: keyof FieldErrors, value: string): string | undefined {
  switch (field) {
    case "name":
      if (!value.trim()) return "Full name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      break;
    case "email":
      return validateEmail(value);
    case "message":
      if (!value.trim()) return "Please tell us about your project.";
      if (value.trim().length < 10) return "Message must be at least 10 characters.";
      break;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Shared input field wrapper with icon, label, error state */
function FormField({
  id,
  label,
  required,
  error,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-300"
      >
        <Icon size={14} className="text-slate-500" aria-hidden="true" />
        {label}
        {required && (
          <span className="text-indigo-400 leading-none" aria-hidden="true">
            *
          </span>
        )}
        {required && (
          <span className="sr-only">(required)</span>
        )}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-1.5 text-xs text-red-400 mt-0.5"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Shared input classes builder */
function inputClass(hasError: boolean): string {
  return [
    "w-full bg-white/5 border rounded-xl px-4 py-3",
    "text-slate-100 placeholder-slate-600",
    "text-sm leading-normal",
    "transition-all duration-200 ease-out",
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0A0F1E]",
    hasError
      ? "border-red-500/50 bg-red-500/5 focus-visible:ring-red-500"
      : "border-white/10 hover:border-white/20 focus-visible:border-indigo-500/60",
  ].join(" ");
}

// ─── Success Card ─────────────────────────────────────────────────────────────

function SuccessCard({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      key="success"
      initial={reduced ? {} : { opacity: 0, scale: 0.95, y: 20 }}
      animate={reduced ? {} : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center text-center py-16 px-8 rounded-2xl"
      style={{
        background: "rgba(16,185,129,0.06)",
        border: "1px solid rgba(16,185,129,0.25)",
        boxShadow: "0 0 40px rgba(16,185,129,0.10)",
      }}
      aria-live="polite"
      role="status"
    >
      {/* Pulsing success ring */}
      <div className="relative mb-6">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid rgba(16,185,129,0.3)" }}
          animate={reduced ? {} : { scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-emerald-400" aria-hidden="true" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white font-[family-name:var(--font-space-grotesk)] mb-2">
        Message Received!
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
        Thank you for reaching out. Our team will review your project details
        and get back to you within{" "}
        <span className="text-emerald-400 font-medium">24 hours</span>.
      </p>

      {/* Response time badge */}
      <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
          animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <span className="text-xs font-medium text-emerald-300">
          Avg. response: 2–4 business hours
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * LeadForm
 *
 * Glassmorphism contact form that POSTs to /api/leads.
 *
 * UX hardening applied (from search.py results):
 * - Inline validation on blur (not submit-only)
 * - Loading → success / error feedback state
 * - Proper <label htmlFor> associations (not placeholder-only)
 * - aria-describedby on error states for screen readers
 * - Disabled state on submit button during loading
 */
export default function LeadForm() {
  const reduced = useReducedMotion() ?? false;
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing after a blur-validation
      if (errors[name as keyof FieldErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name in { name: 1, email: 1, message: 1 }) {
        const err = validateField(name as keyof FieldErrors, value);
        setErrors((prev) => ({ ...prev, [name]: err }));
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Full validation before submit
      const newErrors: FieldErrors = {
        name: validateField("name", formData.name),
        email: validateField("email", formData.email),
        message: validateField("message", formData.message),
      };
      setErrors(newErrors);
      if (Object.values(newErrors).some(Boolean)) return;

      setStatus("loading");
      setErrorMessage("");

      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            company: formData.company.trim() || undefined,
            phone: formData.phone.trim() || undefined,
            serviceInterest: formData.serviceInterest || undefined,
            message: formData.message.trim(),
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
          setFormData(INITIAL_FORM);
        } else {
          setStatus("error");
          setErrorMessage(data.message || "Something went wrong. Please try again.");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    },
    [formData]
  );

  const isLoading = status === "loading";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 30 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <SuccessCard key="success" reduced={reduced} />
        ) : (
          <motion.div
            key="form"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? {} : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form — send us a message"
              className="space-y-5"
            >
              {/* Row 1: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  id={id("name")}
                  label="Full Name"
                  required
                  error={errors.name}
                  icon={User}
                >
                  <input
                    id={id("name")}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${id("name")}-error` : undefined}
                    className={inputClass(!!errors.name)}
                  />
                </FormField>

                <FormField
                  id={id("email")}
                  label="Email Address"
                  required
                  error={errors.email}
                  icon={Mail}
                >
                  <input
                    id={id("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${id("email")}-error` : undefined}
                    className={inputClass(!!errors.email)}
                  />
                </FormField>
              </div>

              {/* Row 2: Company + Phone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  id={id("company")}
                  label="Company Name"
                  icon={Building2}
                >
                  <input
                    id={id("company")}
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Acme Corp (optional)"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={inputClass(false)}
                  />
                </FormField>

                <FormField
                  id={id("phone")}
                  label="Phone Number"
                  icon={Phone}
                >
                  <input
                    id={id("phone")}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 555 000 0000 (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={inputClass(false)}
                  />
                </FormField>
              </div>

              {/* Row 3: Service Interest */}
              <FormField
                id={id("service")}
                label="Service Interest"
                icon={ChevronDown}
              >
                <div className="relative">
                  <select
                    id={id("service")}
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    disabled={isLoading}
                    aria-label="Select the service you are interested in"
                    className={[
                      inputClass(false),
                      "appearance-none pr-10 cursor-pointer",
                      // Dropdown arrow colour fix for dark mode
                      formData.serviceInterest
                        ? "text-slate-100"
                        : "text-slate-600",
                    ].join(" ")}
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.value === ""}
                        className="bg-[#1E293B] text-slate-100"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {/* Custom chevron */}
                  <ChevronDown
                    size={16}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </FormField>

              {/* Row 4: Message */}
              <FormField
                id={id("message")}
                label="Message"
                required
                error={errors.message}
                icon={MessageSquare}
              >
                <textarea
                  id={id("message")}
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline…"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${id("message")}-error` : undefined}
                  className={[inputClass(!!errors.message), "resize-none"].join(" ")}
                />
                {/* Character count */}
                <p
                  className={[
                    "text-right text-[11px] leading-none -mt-0.5",
                    formData.message.length > 1800
                      ? "text-amber-400"
                      : "text-slate-600",
                  ].join(" ")}
                  aria-live="polite"
                  aria-label={`${formData.message.length} of 2000 characters used`}
                >
                  {formData.message.length} / 2000
                </p>
              </FormField>

              {/* API-level error banner */}
              <AnimatePresence>
                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    role="alert"
                    aria-live="assertive"
                    className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm"
                  >
                    <AlertCircle
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="pt-1">
                <GlowButton
                  variant="primary"
                  size="lg"
                  disabled={isLoading}
                  className="w-full justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </GlowButton>

                <p className="text-center text-[11px] text-slate-600 mt-3 leading-relaxed">
                  By submitting you agree to our privacy policy.
                  We respond within 24 hours.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
