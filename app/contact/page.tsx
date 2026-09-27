import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function ContactPage() {
  return (
    <>
    <SubpageVisual variant="contact" />
      <div className="space-y-6">
      <section className="cockpit-hero">
        <p className="cockpit-kicker">Contact</p>
        <h1 className="text-3xl font-semibold text-white">Talk with us about coverage gaps, renewal planning, or broker workflows.</h1>
        <p className="max-w-3xl text-slate-300">
          Whether you are an SMB owner preparing for renewal or a broker building a cleaner submission workflow, we can help you map the next step.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="panel space-y-4">
          <h2 className="text-lg font-semibold text-white">For small businesses</h2>
          <p className="text-sm text-slate-300">
            Share your business type, current coverage, and renewal timing to get a clearer picture of what may be missing from your stack.
          </p>
          <Link href="/demo" className="btn-primary inline-flex">
            Start with the gap analyzer
          </Link>
        </article>

        <article className="panel space-y-4">
          <h2 className="text-lg font-semibold text-white">For brokers and agencies</h2>
          <p className="text-sm text-slate-300">
            Ask about broker-ready summaries, quote comparison workflows, and agency pricing for books of business with recurring renewal pressure.
          </p>
          <Link href="/pricing" className="btn-secondary inline-flex">
            Review pricing
          </Link>
        </article>
      </section>
    </div>
  </>
  )
}
