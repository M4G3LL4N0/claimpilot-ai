"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useMemo } from "react";
import { BrokerReadySummary } from "@/components/BrokerReadySummary";
import { ClaimsReadinessChecklist } from "@/components/ClaimsReadinessChecklist";
import { CoverageHealthScore } from "@/components/CoverageHealthScore";
import { NextActionChecklist } from "@/components/NextActionChecklist";
import { PolicyStackView } from "@/components/PolicyStackView";
import { QuoteComparisonCards } from "@/components/QuoteComparisonCards";
import { RenewalTimeline } from "@/components/RenewalTimeline";
import { RiskExposureRadar } from "@/components/RiskExposureRadar";
import { analyzeCoverageGaps, defaultClaimPilotInput } from "@/src/lib/claimpilot-engine";

export default function DashboardPage() {
  const result = useMemo(() => analyzeCoverageGaps(defaultClaimPilotInput()), []);

  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="cockpit-kicker">Policy cockpit</p>
          <h1 className="text-3xl font-semibold text-white">Renewal, gap analysis, and broker workflow in one dashboard.</h1>
          <p className="max-w-3xl text-slate-300">
            Monitor coverage health, policy stack status, quote comparison, and claims readiness before your next renewal conversation.
          </p>
        </div>
        <Link href="/demo" className="btn-primary">
          Run a new gap analysis
        </Link>
      </section>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <CoverageHealthScore score={result.healthScore} riskScore={result.riskScore} />
        <article className="panel space-y-3">
          <h2 className="text-lg font-semibold text-white">Gap analysis</h2>
          <ul className="space-y-3">
            {result.coverageGaps.slice(0, 4).map((gap) => (
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
      </div>

      <PolicyStackView policies={result.policyStack} />
      <RiskExposureRadar points={result.riskRadar} />
      <RenewalTimeline milestones={result.renewalTimeline} />
      <QuoteComparisonCards quotes={result.quoteCards} />
      <div className="grid gap-4 xl:grid-cols-2">
        <BrokerReadySummary summary={result.brokerSummary} />
        <NextActionChecklist items={result.actionChecklist} />
      </div>
      <ClaimsReadinessChecklist items={result.claimsReadiness} />
    </div>
  </>
  )
}
