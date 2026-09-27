import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function AboutPage() {
  return (
    <>
    <SubpageVisual variant="about" />
      <div className="space-y-6">
      <section className="cockpit-hero">
        <p className="cockpit-kicker">About ClaimPilot AI</p>
        <h1 className="text-3xl font-semibold text-white">Clearer business insurance starts before the renewal deadline or the claim.</h1>
        <p className="max-w-3xl text-slate-300">
          Small business owners usually know they need insurance. They rarely know what is missing until a loss exposes it. ClaimPilot AI exists to make coverage gaps visible while there is still time to fix them.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="panel">
          <h2 className="text-lg font-semibold text-white">Mission</h2>
          <p className="mt-2 text-sm text-slate-300">
            Help SMBs understand coverage gaps, compare policy options, prepare renewal decisions, and organize the risk details brokers need to place better protection.
          </p>
        </article>
        <article className="panel">
          <h2 className="text-lg font-semibold text-white">What we are not building</h2>
          <p className="mt-2 text-sm text-slate-300">
            Not a generic insurance landing page, not a claims filing chatbot, and not a basic quote form. ClaimPilot is an operating layer for business insurance decisions.
          </p>
        </article>
      </section>

      <section className="panel space-y-3">
        <h2 className="text-lg font-semibold text-white">Who it is for</h2>
        <p className="text-sm text-slate-300">
          Owners, operators, and finance leaders who need a clearer view of policy stack health, underinsured areas, and renewal timing without waiting on scattered broker emails.
        </p>
        <Link href="/demo" className="btn-primary inline-flex">
          Explore the coverage gap analyzer
        </Link>
      </section>
    </div>
  </>
  )
}
