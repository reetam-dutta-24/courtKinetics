"use client";

import { Download } from "lucide-react";

interface RallyExport {
  outcome: string;
  errorType: string | null;
  anticipationLagMs: number | null;
  startTimeSeconds: number;
  endTimeSeconds: number;
}

export function ExportButton({ sessionId, rallies }: { sessionId: string; rallies: RallyExport[] }) {
  function handleExport() {
    const headers = ["rally", "outcome", "errorType", "anticipationLagMs", "startTimeSeconds", "endTimeSeconds"];
    const rows = rallies.map((r, i) => [
      i + 1,
      r.outcome,
      r.errorType ?? "",
      r.anticipationLagMs ?? "",
      r.startTimeSeconds,
      r.endTimeSeconds,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `courtkinetics-session-${sessionId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button onClick={handleExport} className="btn-secondary" disabled={rallies.length === 0}>
      <Download size={16} /> Export CSV
    </button>
  );
}