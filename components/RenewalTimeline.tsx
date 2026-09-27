import type { RenewalMilestone } from "@/src/lib/claimpilot-engine";

export function RenewalTimeline({ milestones }: { milestones: RenewalMilestone[] }) {
  return (
    <article className="panel space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Renewal timeline</h2>
        <p className="text-sm text-slate-400">Key milestones from coverage inventory through bind date.</p>
      </div>
      <ol className="timeline">
        {milestones.map((milestone) => (
          <li key={milestone.label} className={`timeline-item timeline-${milestone.status}`}>
            <div className="timeline-marker" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-white">{milestone.label}</p>
                <span className="timeline-date">{milestone.date}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{milestone.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
