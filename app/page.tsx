import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ClaimPilot AI — coverage gaps before renewal",
  description:
    "ClaimPilot AI is a business-insurance cockpit: coverage gaps, policy stack, renewal timing, and broker-ready submissions. Demo intake, not a licensed brokerage.",
};

const stack = [
  { line: "General liability", state: "On file", note: "Primary line in the demo stack", tone: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100" },
  { line: "Property", state: "Review", note: "Limits need a broker pass", tone: "border-[#d4af67]/40 bg-[#d4af67]/10 text-[#f4e7c8]" },
  { line: "Cyber", state: "Gap", note: "Recommended for the profile", tone: "border-rose-400/30 bg-rose-400/10 text-rose-100" },
  { line: "Workers’ comp", state: "On file", note: "Tied to employee band", tone: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100" },
];

export default function Home() {
  return (
    <div className="-mx-6 -mt-10 min-h-screen bg-[#14110c] px-0 text-[#f4e7c8]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] uppercase">
          ClaimPilot
        </Link>
        <Link
          href="/intake"
          className="rounded-sm bg-[#d4af67] px-4 py-2 text-sm font-semibold text-[#1a1408]"
        >
          Run coverage intake
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <section className="grid gap-10 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af67]">
              Business insurance cockpit
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-6xl">
              Find the coverage gap before a claim finds it.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#d7c7a4] sm:text-lg">
              ClaimPilot AI walks a small business through company type, revenue,
              headcount, and risk profile, then drafts coverage gaps, quote
              comparison cards, renewal warnings, and a broker action list. It is
              demo software — not a licensed broker and not a live carrier market.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/intake"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#d4af67] px-6 text-sm font-semibold text-[#1a1408]"
              >
                Run the coverage gap intake
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#d4af67]/40 px-6 text-sm"
              >
                Open the policy cockpit
              </Link>
            </div>
          </div>

          <aside
            aria-label="Example policy stack"
            className="border border-[#d4af67]/25 bg-[#1c1810] p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#a8946a]">
              Policy stack — labeled demo
            </p>
            <ul className="mt-4 space-y-3">
              {stack.map((row) => (
                <li key={row.line} className={`border px-4 py-3 ${row.tone}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{row.line}</span>
                    <span className="text-[11px] uppercase tracking-[0.16em]">{row.state}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#cbb892]">{row.note}</p>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Coverage health", "Track stack completeness before renewal marketing starts."],
            ["Risk radar", "See liability, property, cyber, and people exposure in one view."],
            ["Renewal timeline", "Know when to inventory policies, compare quotes, and bind."],
            ["Broker summary", "Hand off a concise renewal brief instead of scattered documents."],
          ].map(([title, body]) => (
            <article key={title} className="border border-[#d4af67]/25 bg-[#1c1810] p-5">
              <h2 className="text-base font-semibold text-[#f4e7c8]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#cbb892]">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["Coverage gap analyzer", "Map required and recommended lines against what you already carry."],
            ["Policy stack cockpit", "See active lines, missing policies, and renewal timing in one view."],
            ["Broker-ready brief", "Turn profile, assets, and exposure into a submission a broker can act on."],
          ].map(([title, body]) => (
            <article key={title} className="border border-[#d4af67]/25 bg-[#1c1810] p-6">
              <h2 className="text-lg font-semibold text-[#f4e7c8]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#cbb892]">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-14 border border-[#d4af67]/20 p-6">
          <h2 className="text-xl font-semibold">How the cockpit works</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "Map business type to required and recommended policy categories",
              "Score risk exposure across liability, property, cyber, and operations",
              "Compare renewal quotes and build a prioritized action checklist",
            ].map((step, index) => (
              <li key={step} className="border border-[#d4af67]/20 bg-[#1c1810] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#d4af67]">Step {index + 1}</p>
                <p className="mt-2 text-sm text-[#d7c7a4]">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 border border-[#d4af67]/20 p-6">
          <h2 className="text-xl font-semibold">Intake fields the demo actually asks</h2>
          <ol className="mt-4 grid gap-2 text-sm text-[#d7c7a4] sm:grid-cols-2">
            <li>1. Company type — ecommerce, services, healthcare, manufacturing, logistics</li>
            <li>2. Revenue band and employee band</li>
            <li>3. Risk profile — low through critical</li>
            <li>4. Coverage needs in the operator&apos;s own words</li>
          </ol>
        </section>
      </main>

      <footer className="border-t border-[#d4af67]/20 px-4 py-8 text-center text-xs text-[#a8946a]">
        ClaimPilot AI · insurance intake demo · not a licensed brokerage
      </footer>
    </div>
  );
}
