"use client";

import { useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useRouter } from "next/navigation";
import { COMPANY_TYPE, EMPLOYEE_BAND, REVENUE_BAND, RISK_PROFILE, type InsuranceInput, type InsuranceResult } from "@/lib/types";

type IntakeSelectKey = "companyType" | "revenueBand" | "employeeBand" | "riskProfile";

const INTAKE_SELECT_FIELDS: Array<[IntakeSelectKey, string, readonly string[]]> = [
  ["companyType", "Company type", COMPANY_TYPE],
  ["revenueBand", "Revenue", REVENUE_BAND],
  ["employeeBand", "Employees", EMPLOYEE_BAND],
  ["riskProfile", "Risk profile", RISK_PROFILE],
];

const initial: InsuranceInput = {
  companyType: COMPANY_TYPE[0],
  revenueBand: REVENUE_BAND[1],
  employeeBand: EMPLOYEE_BAND[1],
  riskProfile: RISK_PROFILE[1],
  coverageNeeds: "General liability, cyber, and E&O coverage with strong renewal support.",
};

export default function IntakePage() {
  const router = useRouter();
  const [form, setForm] = useState<InsuranceInput>(initial);
  const [result, setResult] = useState<InsuranceResult | null>(null);
  const [runId, setRunId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setResult(data.result);
      setRunId(data.id);
    } catch (err) {
      console.error(err);
      alert("Could not generate insurance output.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <SubpageVisual variant="default" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="panel space-y-4">
        <h1 className="text-2xl font-semibold text-white">Interactive insurance intake</h1>
        <p className="text-sm text-slate-300">Enter business profile and coverage needs to generate policy match, quotes, renewal warnings, and broker actions.</p>

        {INTAKE_SELECT_FIELDS.map(([key, label, options]) => (
          <label key={key} className="block space-y-1 text-sm">
            <span className="text-slate-200">{label}</span>
            <select
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value as InsuranceInput[typeof key] }))}
              className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-slate-100"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        ))}

        <label className="block space-y-1 text-sm">
          <span className="text-slate-200">Coverage needs</span>
          <textarea
            value={form.coverageNeeds}
            onChange={(e) => setForm((prev) => ({ ...prev, coverageNeeds: e.target.value }))}
            className="min-h-24 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-slate-100"
          />
        </label>

        <button disabled={loading} className="rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950 disabled:opacity-60">
          {loading ? "Generating..." : "Generate insurance plan"}
        </button>
      </form>

      <aside className="panel space-y-4">
        <h2 className="text-xl font-semibold text-white">Broker output</h2>
        {!result ? (
          <p className="text-sm text-slate-300">Run intake to view risk score, coverage recommendations, quote cards, and renewal actions.</p>
        ) : (
          <>
            <p className="text-3xl font-semibold text-cyan-300">Risk {result.riskScore}/100</p>
            <p className="text-sm text-slate-300">{result.executiveSummary}</p>
            <div>
              <h3 className="font-medium text-white">Quote comparison cards</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                {result.quoteCards.map((q) => (
                  <li key={q.carrier} className="rounded-md border border-white/10 px-3 py-1">
                    {q.carrier}: {q.annualPremium} / {q.deductible} - {q.fit}
                  </li>
                ))}
              </ul>
            </div>
            {runId ? (
              <button onClick={() => router.push(`/dashboard/runs/${runId}`)} className="rounded-lg border border-cyan-300/40 px-4 py-2 text-cyan-200 hover:bg-cyan-400/10">
                Open full dashboard
              </button>
            ) : null}
          </>
        )}
      </aside>
    </div>
  </>
  )
}
