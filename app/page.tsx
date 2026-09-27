import Link from "next/link";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";

const features = [
  {
    title: "Coverage gap analyzer",
    copy: "Find the coverage gaps that could hurt your business before a claim does.",
  },
  {
    title: "Policy stack cockpit",
    copy: "See active lines, missing policies, and renewal timing in one operating view.",
  },
  {
    title: "Broker-ready submissions",
    copy: "Turn business profile, assets, and exposure into a submission your broker can act on.",
  },
];

const workflow = [
  "Map business type to required and recommended policy categories",
  "Score risk exposure across liability, property, cyber, and operations",
  "Compare renewal quotes and build a prioritized action checklist",
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="cockpit-hero">
        <p className="cockpit-kicker">Business insurance cockpit</p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Understand coverage gaps, compare policy options, and prepare renewal decisions without waiting for a claim to expose them.
        </h1>
        <p className="max-w-3xl text-lg text-slate-300">
          ClaimPilot AI helps small businesses organize risk details, identify underinsured areas, and create broker-ready submissions from one intelligent insurance workspace.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/demo" className="btn-primary">
            Run coverage gap analyzer
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            Open policy cockpit
          </Link>
        </div>
      </section>

      <section className="stat-grid">
        {[
          ["Coverage health", "Track stack completeness before renewal marketing starts."],
          ["Risk radar", "See liability, property, cyber, and people exposure in one view."],
          ["Renewal timeline", "Know when to inventory policies, compare quotes, and bind."],
          ["Broker summary", "Hand off a concise renewal brief instead of scattered documents."],
        ].map(([title, copy]) => (
          <article key={title} className="stat-card">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm text-slate-300">{copy}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="panel">
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{feature.copy}</p>
          </article>
        ))}
      </section>

      <section className="panel space-y-4">
        <h2 className="text-2xl font-semibold text-white">How the cockpit works</h2>
        <ol className="grid gap-3 md:grid-cols-3">
          {workflow.map((step, index) => (
            <li key={step} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-300">Step {index + 1}</p>
              <p className="mt-2 text-sm text-slate-300">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

<MarketingGraphicsStack />
