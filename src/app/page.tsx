import { TrustStrip } from "@/components/TrustStrip";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
const buildStages = [
  "Material selection",
  "Supplier routing",
  "Machining review",
  "QA risk",
  "Prototype timeline",
];

const metrics = [
  { label: "Prototype readiness", value: "81%", detail: "Design is buildable with moderate tolerance risk." },
  { label: "Estimated lead time", value: "18 days", detail: "Fastest route uses CNC plus local finishing partner." },
  { label: "Cost range", value: "$8.4k", detail: "Projected first article and low-volume prototype package." },
];

const steps = [
  "Upload or describe the part",
  "Set tolerance and material needs",
  "Compare build routes",
  "Generate supplier-ready package",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>

      <section className="relative px-6 py-8 sm:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.22),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,.14),transparent_30%),linear-gradient(180deg,#070707,#11100d_48%,#070707)]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur">
          <div className="text-sm font-semibold tracking-[0.3em] text-orange-200">FORGEFLOW</div>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#demo" className="hover:text-white">Planner</a>
            <a href="#platform" className="hover:text-white">Pipeline</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </div>
          <a href="#demo" className="rounded-full bg-orange-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(253,186,116,.35)]">
            Plan prototype
          </a>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-orange-300/20 bg-orange-300/10 px-4 py-2 text-sm text-orange-100">
              Hardware execution from CAD to supplier-ready build plan.
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Close the gap between prototype idea and manufacturable reality.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              ForgeFlow helps hardware teams estimate cost, lead time, tolerances, supplier routing, QA risk, and build readiness before the first purchase order goes out.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#demo" className="rounded-full bg-white px-6 py-3 text-center font-semibold text-slate-950">
                Run prototype planner
              </a>
              <a href="#platform" className="rounded-full border border-white/15 px-6 py-3 text-center font-semibold text-white">
                View build pipeline
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] border border-orange-300/20 bg-zinc-950/85 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Prototype pipeline</p>
                  <h2 className="text-2xl font-semibold">Build route analysis</h2>
                </div>
                <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">Buildable</div>
              </div>

              <div className="grid gap-3">
                {buildStages.map((stage, index) => (
                  <div key={stage} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-400">Stage {index + 1}</p>
                        <p className="font-medium text-white">{stage}</p>
                      </div>
                      <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-orange-300" style={{ width: `${54 + index * 8}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-4">
                <p className="text-sm font-medium text-orange-100">Recommended route</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Start with CNC aluminum prototype, loosen non-critical tolerance by 0.05mm, add local anodizing partner, and run first article QA before low-volume batch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">Interactive MVP</p>
            <h2 className="mt-3 text-4xl font-semibold">Prototype build planner</h2>
            <p className="mt-4 text-slate-300">
              The core workflow turns product requirements into supplier routing, manufacturing risk, cost range, and a build-ready prototype plan.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-sm text-slate-400">{metric.label}</p>
                <p className="mt-3 text-4xl font-semibold text-white">{metric.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{metric.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-xl font-semibold">Build intake</h3>
              <div className="mt-5 grid gap-4">
                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-sm text-slate-400">Product type</p>
                  <p className="mt-1 font-medium">Precision hardware enclosure</p>
                </div>
                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-sm text-slate-400">Material and process</p>
                  <p className="mt-1 font-medium">6061 aluminum, CNC, bead blast, anodize</p>
                </div>
                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-sm text-slate-400">Constraint</p>
                  <p className="mt-1 font-medium">20 units in under 3 weeks with tight exterior finish</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-orange-300/20 bg-orange-300/[0.06] p-6">
              <h3 className="text-xl font-semibold">Generated build plan</h3>
              <div className="mt-5 space-y-4">
                {[
                  "Use CNC for first article because tolerance and finish matter more than tooling cost.",
                  "Route finishing to a separate local partner to avoid slowing machining capacity.",
                  "Flag cosmetic finish as QA risk because anodize consistency can delay batch acceptance.",
                  "Prepare supplier packet with STEP file, tolerance notes, finish sample, inspection checklist, and delivery window.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 font-semibold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Built for hardware startups, industrial teams, robotics builders, and fast prototype operations.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">Pricing</p>
              <h2 className="mt-3 text-4xl font-semibold">Manufacturing clarity before the quote chaos.</h2>
              <p className="mt-4 text-slate-300">
                Start with prototype planning, then expand into supplier routing, RFQ packages, QA workflows, and hardware operations intelligence.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Startup", "Hardware Team", "Enterprise"].map((tier) => (
                <div key={tier} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <p className="font-semibold">{tier}</p>
                  <p className="mt-3 text-2xl font-semibold">{tier === "Startup" ? "$49" : tier === "Hardware Team" ? "$299" : "Custom"}</p>
                  <p className="mt-3 text-sm text-slate-400">Prototype planning, supplier routing, cost ranges, and build-readiness reports.</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-4 text-sm leading-6 text-orange-100">
            ForgeFlow helps teams prepare better manufacturing decisions. Final supplier pricing, quality control, and production commitments should be confirmed directly with qualified manufacturing partners.
          </div>
        </div>
      </section>
    <MarketingGraphicsStack />
    </main>
  );
}
