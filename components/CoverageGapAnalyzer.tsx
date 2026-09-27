"use client";

import { useMemo, useState } from "react";
import {
  BUSINESS_TYPES,
  CLAIMS_HISTORY,
  COVERAGE_OPTIONS,
  EMPLOYEE_BANDS,
  LOCATIONS,
  REVENUE_BANDS,
  RISK_EXPOSURES,
} from "@/src/lib/claimpilot-data";
import {
  analyzeCoverageGaps,
  defaultClaimPilotInput,
  type ClaimPilotInput,
  type ClaimPilotResult,
} from "@/src/lib/claimpilot-engine";
import { BrokerReadySummary } from "./BrokerReadySummary";
import { ClaimsReadinessChecklist } from "./ClaimsReadinessChecklist";
import { CoverageHealthScore } from "./CoverageHealthScore";
import { PolicyStackView } from "./PolicyStackView";
import { QuoteComparisonCards } from "./QuoteComparisonCards";
import { RenewalTimeline } from "./RenewalTimeline";
import { RiskExposureRadar } from "./RiskExposureRadar";

function toggleValue<T extends string>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function CoverageGapAnalyzer() {
  const [form, setForm] = useState<ClaimPilotInput>(defaultClaimPilotInput);
  const [result, setResult] = useState<ClaimPilotResult | null>(null);

  const gapCount = useMemo(() => result?.coverageGaps.length ?? 0, [result]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(analyzeCoverageGaps(form));
  }

  return (
    <div className="space-y-6">
      <div className="cockpit-hero">
        <p className="cockpit-kicker">Coverage gap analyzer</p>
        <h1 className="text-3xl font-semibold text-white">Find the coverage gaps that could hurt your business before a claim does.</h1>
        <p className="max-w-3xl text-slate-300">
          Enter your business profile, current stack, and renewal timing to generate a broker-ready gap report, quote comparison, and renewal action plan.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-amber-100/85">
          Educational gap analysis for planning — not a quote, binder, or licensed insurance advice.
          Confirm coverage with a licensed broker before binding or canceling policies.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={onSubmit} className="panel space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field">
              <span>Business type</span>
              <select
                value={form.businessType}
                onChange={(event) => setForm((prev) => ({ ...prev, businessType: event.target.value as ClaimPilotInput["businessType"] }))}
              >
                {BUSINESS_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Revenue</span>
              <select
                value={form.revenue}
                onChange={(event) => setForm((prev) => ({ ...prev, revenue: event.target.value as ClaimPilotInput["revenue"] }))}
              >
                {REVENUE_BANDS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Employees</span>
              <select
                value={form.employees}
                onChange={(event) => setForm((prev) => ({ ...prev, employees: event.target.value as ClaimPilotInput["employees"] }))}
              >
                {EMPLOYEE_BANDS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Location</span>
              <select
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value as ClaimPilotInput["location"] }))}
              >
                {LOCATIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="field">
            <span>Renewal date</span>
            <input
              type="date"
              value={form.renewalDate}
              onChange={(event) => setForm((prev) => ({ ...prev, renewalDate: event.target.value }))}
            />
          </label>

          <div className="field">
            <span>Current coverage</span>
            <div className="chip-grid">
              {COVERAGE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={form.currentCoverage.includes(option) ? "chip chip-active" : "chip"}
                  onClick={() => setForm((prev) => ({ ...prev, currentCoverage: toggleValue(prev.currentCoverage, option) }))}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span>Risk exposure</span>
            <div className="chip-grid">
              {RISK_EXPOSURES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={form.riskExposure.includes(option) ? "chip chip-active" : "chip"}
                  onClick={() => setForm((prev) => ({ ...prev, riskExposure: toggleValue(prev.riskExposure, option) }))}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span>Assets and operations detail</span>
            <textarea
              value={form.assets}
              onChange={(event) => setForm((prev) => ({ ...prev, assets: event.target.value }))}
              rows={4}
            />
          </label>

          <label className="field">
            <span>Claims history</span>
            <select
              value={form.claimsHistory}
              onChange={(event) => setForm((prev) => ({ ...prev, claimsHistory: event.target.value as ClaimPilotInput["claimsHistory"] }))}
            >
              {CLAIMS_HISTORY.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="btn-primary">
            Generate coverage gap report
          </button>
        </form>

        <aside className="space-y-4">
          {!result ? (
            <article className="panel space-y-3">
              <h2 className="text-xl font-semibold text-white">What you will get</h2>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Coverage gap report with severity ranking</li>
                <li>Recommended policy categories for your business type</li>
                <li>Risk score and renewal timeline</li>
                <li>Quote comparison mock cards and broker-ready summary</li>
              </ul>
            </article>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <CoverageHealthScore score={result.healthScore} riskScore={result.riskScore} />
                <article className="panel">
                  <p className="text-sm text-slate-400">Gap count</p>
                  <p className="mt-2 text-4xl font-semibold text-white">{gapCount}</p>
                  <p className="mt-2 text-sm text-slate-300">Policies missing or under review before renewal.</p>
                </article>
              </div>

              <article className="panel space-y-3">
                <h2 className="text-lg font-semibold text-white">Coverage gap report</h2>
                <ul className="space-y-3">
                  {result.coverageGaps.map((gap) => (
                    <li key={`${gap.policy}-${gap.detail}`} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-white">{gap.policy}</p>
                        <span className={`severity severity-${gap.severity}`}>{gap.severity}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">{gap.detail}</p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="panel space-y-3">
                <h2 className="text-lg font-semibold text-white">Recommended policy categories</h2>
                <ul className="space-y-2">
                  {result.recommendedPolicies.map((policy) => (
                    <li key={policy.id} className="flex items-start justify-between gap-3 rounded-lg border border-white/10 px-3 py-2">
                      <div>
                        <p className="font-medium text-white">{policy.name}</p>
                        <p className="text-sm text-slate-400">{policy.rationale}</p>
                      </div>
                      <span className={`severity severity-${policy.priority === "critical" ? "critical" : policy.priority === "recommended" ? "moderate" : "watch"}`}>
                        {policy.priority}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>

              <QuoteComparisonCards quotes={result.quoteCards} />
              <RenewalTimeline milestones={result.renewalTimeline} />
              <BrokerReadySummary summary={result.brokerSummary} />
              <ClaimsReadinessChecklist items={result.claimsReadiness} />
              <PolicyStackView policies={result.policyStack} />
              <RiskExposureRadar points={result.riskRadar} />
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
