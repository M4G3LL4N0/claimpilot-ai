import type { PolicyStackItem } from "@/src/lib/claimpilot-engine";

export function PolicyStackView({ policies }: { policies: PolicyStackItem[] }) {
  return (
    <article className="panel space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Policy stack</h2>
        <p className="text-sm text-slate-400">Active lines, review items, and missing coverage in one stack.</p>
      </div>
      <div className="policy-stack">
        {policies.map((policy, index) => (
          <div
            key={`${policy.name}-${index}`}
            className={`policy-card policy-${policy.status}`}
            style={{ transform: `translateY(${index * 10}px)` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{policy.name}</p>
                <p className="text-sm text-slate-400">{policy.limit}</p>
              </div>
              <span className="policy-status">{policy.status}</span>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">Renewal {policy.renewal}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
