import type { ActionItem } from "@/src/lib/claimpilot-engine";

export function NextActionChecklist({ items }: { items: ActionItem[] }) {
  return (
    <article className="panel space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Next action checklist</h2>
        <p className="text-sm text-slate-400">Prioritized renewal tasks for owners, finance, and broker partners.</p>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3 rounded-lg border border-white/10 px-3 py-3">
            <span className={item.done ? "check ready" : "check"} aria-hidden="true" />
            <div>
              <p className="font-medium text-white">{item.label}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.priority} priority</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
