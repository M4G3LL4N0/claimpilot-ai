import type { QuoteCard } from "@/src/lib/claimpilot-engine";

export function QuoteComparisonCards({ quotes }: { quotes: QuoteCard[] }) {
  return (
    <article className="panel space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Quote comparison</h2>
        <p className="text-sm text-slate-400">Mock carrier cards for renewal benchmarking and broker discussion.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {quotes.map((quote) => (
          <div key={quote.carrier} className={quote.highlight ? "quote-card quote-card-highlight" : "quote-card"}>
            <p className="text-sm text-slate-400">{quote.carrier}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{quote.annualPremium}</p>
            <p className="mt-1 text-sm text-slate-300">Deductible {quote.deductible}</p>
            <p className="mt-4 text-sm text-slate-400">{quote.fit}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
