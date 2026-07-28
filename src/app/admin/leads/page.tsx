import React from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Lock,
  Users,
  Mail,
  Building2,
  Phone,
  Briefcase,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Inbox,
  ShieldCheck,
} from "lucide-react";

import ExportCsvButton, { type LeadRow } from "./ExportCsvButton";

// ─── SEO — admin pages should not be indexed ──────────────────────────────────

export const metadata: Metadata = {
  title: "Leads Dashboard | AI Tool Creator Admin",
  robots: { index: false, follow: false },
};

// ─── Types ────────────────────────────────────────────────────────────────────

/** Shape returned by the GET /api/leads Mongoose .lean() call. */
interface MongoLead {
  _id: unknown;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  createdAt: unknown;
  updatedAt?: unknown;
  __v?: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format ISO date → "28 Jul 2026  06:44" */
function formatDate(raw: unknown): string {
  if (!raw) return "—";
  try {
    const d = new Date(String(raw));
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "—";
  }
}

/** Serialise a Mongo lead into a plain LeadRow safe for client component props. */
function toLeadRow(lead: MongoLead, index: number): LeadRow & { index: number } {
  return {
    index: index + 1,
    _id: String(lead._id),
    name: lead.name,
    email: lead.email,
    company: lead.company,
    phone: lead.phone,
    serviceInterest: lead.serviceInterest,
    message: lead.message,
    createdAt: String(lead.createdAt),
  };
}

/** Colour-coded badge for service interest values. */
const SERVICE_BADGE_COLOURS: Record<string, string> = {
  "AI Agent Development":
    "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25",
  "WhatsApp AI":
    "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  "AI Customer Support":
    "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
  "AI Voice Calling":
    "bg-violet-500/15 text-violet-300 border border-violet-500/25",
  "AI Sales Automation":
    "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  "AI Business Automation":
    "bg-pink-500/15 text-pink-300 border border-pink-500/25",
  Other: "bg-slate-500/15 text-slate-400 border border-slate-500/20",
};

function ServiceBadge({ service }: { service?: string }) {
  if (!service) {
    return <span className="text-slate-600 text-xs">—</span>;
  }
  const cls =
    SERVICE_BADGE_COLOURS[service] ??
    "bg-slate-500/15 text-slate-400 border border-slate-500/20";
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium leading-tight ${cls}`}>
      {service}
    </span>
  );
}

// ─── Unauthorized screen ──────────────────────────────────────────────────────

function UnauthorizedScreen() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4">
      <div
        className="max-w-md w-full rounded-2xl p-10 text-center"
        style={{
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.30)",
          boxShadow: "0 0 40px rgba(239,68,68,0.08)",
        }}
        role="alert"
        aria-labelledby="unauth-heading"
      >
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center">
            <Lock size={24} className="text-red-400" aria-hidden="true" />
          </div>
        </div>

        <h1
          id="unauth-heading"
          className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)] mb-3"
        >
          Unauthorized Access
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          You don&apos;t have permission to view this page. Please provide a
          valid admin secret via the{" "}
          <code className="text-red-300 bg-red-500/10 px-1.5 py-0.5 rounded text-xs font-mono">
            ?secret=
          </code>{" "}
          query parameter.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
          <AlertTriangle size={12} aria-hidden="true" />
          <span>This page is not indexed by search engines.</span>
        </div>
      </div>
    </div>
  );
}

// ─── Fetch leads (server-side) ────────────────────────────────────────────────

async function fetchLeads(secret: string): Promise<MongoLead[]> {
  // Build absolute URL using the request host header so this works in any env
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/leads`, {
    headers: { "x-admin-secret": secret },
    // Always fetch fresh data — this is a protected admin endpoint
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  // The GET route returns the array directly (not wrapped in success/data)
  return Array.isArray(data) ? data : [];
}

// ─── Table columns config ─────────────────────────────────────────────────────

const TABLE_HEADERS = [
  { key: "#", label: "#", icon: null, width: "w-10" },
  { key: "name", label: "Name", icon: Users, width: "min-w-[140px]" },
  { key: "email", label: "Email", icon: Mail, width: "min-w-[180px]" },
  { key: "company", label: "Company", icon: Building2, width: "min-w-[130px]" },
  { key: "phone", label: "Phone", icon: Phone, width: "min-w-[120px]" },
  { key: "service", label: "Service Interest", icon: Briefcase, width: "min-w-[170px]" },
  { key: "message", label: "Message", icon: MessageSquare, width: "min-w-[200px] max-w-[280px]" },
  { key: "createdAt", label: "Submitted At", icon: Calendar, width: "min-w-[150px]" },
] as const;

// ─── Page component (RSC) ─────────────────────────────────────────────────────

/**
 * Admin Leads Dashboard
 *
 * Server Component — reads ?secret from searchParams, validates against
 * process.env.ADMIN_SECRET on the server (never exposed to the client).
 *
 * If valid: fetches leads server-side from GET /api/leads with the admin
 * secret in the header, renders the full table + exports the rows to the
 * client-side ExportCsvButton without a second network call.
 *
 * Access: /admin/leads?secret=aitoolcreator_admin_2026
 */
export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  // ── Auth guard ─────────────────────────────────────────────────────────────
  const params = await searchParams;
  const providedSecret = params.secret ?? "";
  const adminSecret = process.env.ADMIN_SECRET ?? "";

  if (!providedSecret || providedSecret !== adminSecret) {
    return <UnauthorizedScreen />;
  }

  // ── Data fetch ─────────────────────────────────────────────────────────────
  const rawLeads = await fetchLeads(providedSecret);
  const leads = rawLeads.map(toLeadRow);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Navbar clearance */}
      <div className="h-24" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* ── Header bar ──────────────────────────────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <ShieldCheck size={20} className="text-indigo-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-[family-name:var(--font-space-grotesk)] leading-tight">
                  Leads Dashboard
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">Admin panel · Protected</p>
              </div>
            </div>

            {/* Count badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20"
              aria-label={`${leads.length} total leads`}
            >
              <span className="text-sm font-bold text-indigo-300">
                {leads.length}
              </span>
              <span className="text-xs text-slate-500">
                {leads.length === 1 ? "lead" : "leads"}
              </span>
            </div>
          </div>

          {/* Export button — client component island */}
          <ExportCsvButton leads={leads} />
        </header>

        {/* ── Stats strip ─────────────────────────────────────────────── */}
        {leads.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Leads",
                value: leads.length,
                color: "text-indigo-400",
                bg: "bg-indigo-500/10",
              },
              {
                label: "With Company",
                value: leads.filter((l) => l.company).length,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
              {
                label: "With Phone",
                value: leads.filter((l) => l.phone).length,
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
              },
              {
                label: "Service Tagged",
                value: leads.filter((l) => l.serviceInterest).length,
                color: "text-violet-400",
                bg: "bg-violet-500/10",
              },
            ].map(({ label, value, color, bg }) => (
              <div
                key={label}
                className={`rounded-xl px-5 py-4 ${bg} border border-white/[0.06]`}
                aria-label={`${label}: ${value}`}
              >
                <p className={`text-2xl font-bold ${color} font-[family-name:var(--font-space-grotesk)]`}>
                  {value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Table ───────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {leads.length === 0 ? (
            /* ── Empty state ──────────────────────────────────────────── */
            <div
              className="flex flex-col items-center justify-center py-24 px-8 text-center"
              role="status"
              aria-label="No leads found"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-4">
                <Inbox size={24} className="text-slate-600" aria-hidden="true" />
              </div>
              <p className="text-slate-400 font-medium mb-1">No leads yet</p>
              <p className="text-slate-600 text-sm">
                Submissions from the contact form will appear here.
              </p>
            </div>
          ) : (
            /* ── Data table ───────────────────────────────────────────── */
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                aria-label="Leads data table"
              >
                {/* Table head */}
                <thead>
                  <tr
                    className="border-b"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    {TABLE_HEADERS.map(({ key, label, icon: Icon, width }) => (
                      <th
                        key={key}
                        scope="col"
                        className={`${width} px-4 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap`}
                        style={{ background: "rgba(255,255,255,0.02)" }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {Icon && (
                            <Icon
                              size={12}
                              className="text-slate-600 flex-shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {label}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table body */}
                <tbody>
                  {leads.map((lead, i) => (
                    <tr
                      key={lead._id}
                      className="border-b transition-colors duration-150 ease-out hover:bg-white/[0.025] group"
                      style={{
                        borderColor: "rgba(255,255,255,0.04)",
                      }}
                    >
                      {/* # */}
                      <td className="px-4 py-3.5 text-slate-600 text-xs font-mono">
                        {lead.index}
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3.5">
                        <span className="font-medium text-slate-100 leading-tight block">
                          {lead.name}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3.5">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-indigo-400 hover:text-indigo-300 transition-colors duration-150 text-xs leading-tight break-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-sm"
                        >
                          {lead.email}
                        </a>
                      </td>

                      {/* Company */}
                      <td className="px-4 py-3.5 text-slate-400 text-xs">
                        {lead.company || (
                          <span className="text-slate-700">—</span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3.5">
                        {lead.phone ? (
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-slate-400 hover:text-slate-300 transition-colors duration-150 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-sm"
                          >
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-slate-700 text-xs">—</span>
                        )}
                      </td>

                      {/* Service Interest badge */}
                      <td className="px-4 py-3.5">
                        <ServiceBadge service={lead.serviceInterest} />
                      </td>

                      {/* Message — truncated with title */}
                      <td className="px-4 py-3.5 max-w-[280px]">
                        <p
                          className="text-slate-400 text-xs leading-relaxed line-clamp-2"
                          title={lead.message}
                        >
                          {lead.message}
                        </p>
                      </td>

                      {/* Submitted At */}
                      <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap font-mono">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-700 mt-6">
          Sorted newest first · {leads.length} record{leads.length !== 1 ? "s" : ""} total ·
          Protected by admin secret
        </p>
      </div>
    </div>
  );
}
