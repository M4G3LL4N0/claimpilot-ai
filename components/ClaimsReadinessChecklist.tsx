import type { ClaimsReadinessItem } from "@/src/lib/claimpilot-engine";

export function ClaimsReadinessChecklist({ items }: { items: ClaimsReadinessItem[] }) {
  return (
    <article className="panel space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Claims readiness checklist</h2>
        <p className="text-sm text-slate-400">Operational readiness items that affect claim response and renewal underwriting.</p>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-3 rounded-lg border border-white/10 px-3 py-3">
            <span className={item.ready ? "check ready" : "check"} aria-hidden="true" />
            <div>
              <p className="font-medium text-white">{item.label}</p>
              <p className="text-sm text-slate-400">{item.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
