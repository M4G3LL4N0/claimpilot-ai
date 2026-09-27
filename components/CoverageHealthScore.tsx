export function CoverageHealthScore({ score, riskScore }: { score: number; riskScore: number }) {
  const degrees = Math.round((score / 100) * 360);

  return (
    <article className="panel flex items-center gap-5">
      <div
        className="health-score-ring"
        style={{ background: `conic-gradient(rgb(56,189,248) ${degrees}deg, rgba(148,163,184,0.18) 0deg)` }}
      >
        <div className="health-score-core">
          <p className="text-3xl font-semibold text-white">{score}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Health</p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">Coverage health score</h2>
        <p className="mt-2 text-sm text-slate-300">Risk exposure score {riskScore}/100 based on profile, claims history, and stack completeness.</p>
      </div>
    </article>
  );
}
