"use client";

import { useEffect, useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";

type RunResponse = {
  run: {
    createdAt: string;
    result: {
      riskScore: number;
      coverageRecommendations: string[];
      coverageGaps: string[];
      quoteCards: Array<{ carrier: string; annualPremium: string; deductible: string; fit: string }>;
      renewalWarnings: string[];
      brokerActionPlan: string[];
      executiveSummary: string;
    };
  };
};

export default function RunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [run, setRun] = useState<RunResponse["run"] | null>(null);

  useEffect(() => {
    async function load() {
      const { id } = await params;
      const res = await fetch(`/api/intake/${id}`);
      const data = (await res.json()) as RunResponse;
      setRun(data.run);
    }
    void load();
  }, [params]);

  if (!run) return <p className="text-slate-300">Loading run...</p>;

  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="space-y-5">
      <section className="panel space-y-2">
        <p className="text-sm text-slate-400">{new Date(run.createdAt).toLocaleString()}</p>
        <h1 className="text-2xl font-semibold text-white">Risk score: {run.result.riskScore}/100</h1>
        <p className="text-slate-300">{run.result.executiveSummary}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="panel">
          <h2 className="font-semibold text-white">Coverage recommendations</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {run.result.coverageRecommendations.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </article>
        <article className="panel">
          <h2 className="font-semibold text-white">Coverage gap analyzer</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {run.result.coverageGaps.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="panel">
          <h2 className="font-semibold text-white">Renewal warnings</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {run.result.renewalWarnings.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </article>
        <article className="panel">
          <h2 className="font-semibold text-white">Broker action plan</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {run.result.brokerActionPlan.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </article>
      </section>
    </div>
  </>
  )
}
