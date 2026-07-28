"use client";

import React, { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Serialisable lead shape (dates as ISO strings — safe across RSC boundary). */
export interface LeadRow {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  createdAt: string;
}

// ─── CSV helpers ──────────────────────────────────────────────────────────────

/** Escape a cell value: wrap in quotes and double any internal quotes. */
function csvCell(value: string | undefined | null): string {
  const str = value ?? "";
  return `"${str.replace(/"/g, '""')}"`;
}

function buildCsv(leads: LeadRow[]): string {
  const HEADERS = [
    "#",
    "Name",
    "Email",
    "Company",
    "Phone",
    "Service Interest",
    "Message",
    "Submitted At",
  ];

  const rows = leads.map((lead, i) =>
    [
      String(i + 1),
      csvCell(lead.name),
      csvCell(lead.email),
      csvCell(lead.company),
      csvCell(lead.phone),
      csvCell(lead.serviceInterest),
      csvCell(lead.message),
      csvCell(new Date(lead.createdAt).toLocaleString("en-GB")),
    ].join(",")
  );

  return [HEADERS.join(","), ...rows].join("\r\n");
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ExportCsvButton
 *
 * Pure client component — receives the already-fetched leads array from the
 * RSC parent and handles the Blob → URL.createObjectURL download flow.
 * No additional network round-trip required.
 */
export default function ExportCsvButton({ leads }: { leads: LeadRow[] }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(() => {
    if (!leads.length) return;

    setIsExporting(true);

    try {
      const csv = buildCsv(leads);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, 19);
      const filename = `leads_${timestamp}.csv`;

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      // Brief delay so the user sees the loading state
      setTimeout(() => setIsExporting(false), 600);
    }
  }, [leads]);

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isExporting || leads.length === 0}
      aria-label={`Export ${leads.length} leads as CSV`}
      className={[
        "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium",
        "border border-indigo-500/40 text-indigo-300",
        "bg-indigo-500/10",
        "transition-all duration-200 ease-out",
        "hover:bg-indigo-500/20 hover:border-indigo-400/60 hover:text-indigo-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "cursor-pointer motion-reduce:transition-none",
      ].join(" ")}
    >
      {isExporting ? (
        <Loader2 size={14} className="animate-spin" aria-hidden="true" />
      ) : (
        <Download size={14} aria-hidden="true" />
      )}
      {isExporting ? "Exporting…" : "Export CSV"}
    </button>
  );
}
