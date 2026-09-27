import type { RiskRadarPoint } from "@/src/lib/claimpilot-engine";

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 78;

function point(angleIndex: number, value: number) {
  const angle = (Math.PI * 2 * angleIndex) / 6 - Math.PI / 2;
  const distance = (value / 100) * RADIUS;
  return {
    x: CENTER + Math.cos(angle) * distance,
    y: CENTER + Math.sin(angle) * distance,
  };
}

export function RiskExposureRadar({ points }: { points: RiskRadarPoint[] }) {
  const polygon = points
    .map((entry, index) => {
      const { x, y } = point(index, entry.score);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <article className="panel space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Risk exposure radar</h2>
        <p className="text-sm text-slate-400">Relative exposure across liability, property, cyber, people, operations, and compliance.</p>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto h-56 w-56 text-sky-400">
          {[25, 50, 75, 100].map((ring) => (
            <circle key={ring} cx={CENTER} cy={CENTER} r={(ring / 100) * RADIUS} fill="none" stroke="currentColor" strokeOpacity={0.12} />
          ))}
          <polygon points={polygon} fill="rgba(56,189,248,0.22)" stroke="rgb(56,189,248)" strokeWidth="2" />
          {points.map((entry, index) => {
            const { x, y } = point(index, entry.score);
            return <circle key={entry.axis} cx={x} cy={y} r="4" fill="rgb(125,211,252)" />;
          })}
        </svg>
        <ul className="grid flex-1 gap-2 sm:grid-cols-2">
          {points.map((entry) => (
            <li key={entry.axis} className="rounded-lg border border-white/10 px-3 py-2">
              <p className="text-sm text-slate-400">{entry.axis}</p>
              <p className="text-lg font-semibold text-white">{entry.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
