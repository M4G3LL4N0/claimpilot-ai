import { SubpageVisual } from "@/components/SubpageVisual";
export default function PricingPage() {
  const tiers = [
    {
      name: "SMB",
      price: "$199/mo",
      points: ["Coverage gap analyzer", "Policy stack cockpit", "Renewal timeline and reminders"],
    },
    {
      name: "Broker",
      price: "$1,250/mo",
      points: ["Multi-client renewal workspace", "Broker-ready summaries", "Quote comparison workflows"],
    },
    {
      name: "Agency",
      price: "$3,800/mo",
      points: ["Agency-wide coverage intelligence", "Producer handoff templates", "Renewal calendar for books of business"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      points: ["Portfolio risk reporting", "Custom policy category mapping", "Dedicated onboarding and controls review"],
    },
  ];

  return (
    <>
    <SubpageVisual variant="pricing" />
      <div className="space-y-6">
      <section className="cockpit-hero">
        <p className="cockpit-kicker">Pricing</p>
        <h1 className="text-3xl font-semibold text-white">Plans for SMB owners, brokers, agencies, and enterprise risk teams.</h1>
        <p className="max-w-3xl text-slate-300">
          Start with gap analysis and renewal visibility, then scale into broker workflows and portfolio intelligence as your coverage program matures.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier) => (
          <article key={tier.name} className="panel">
            <h2 className="text-xl font-semibold text-white">{tier.name}</h2>
            <p className="mt-2 text-2xl text-sky-300">{tier.price}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
              {tier.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </>
  )
}
