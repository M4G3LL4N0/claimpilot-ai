export function BrokerReadySummary({ summary }: { summary: string }) {
  return (
    <article className="panel space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-white">Broker-ready summary</h2>
        <p className="text-sm text-slate-400">A concise handoff paragraph for your broker or agency partner.</p>
      </div>
      <p className="rounded-xl border border-sky-400/20 bg-sky-500/5 p-4 text-sm leading-6 text-slate-200">{summary}</p>
    </article>
  );
}
