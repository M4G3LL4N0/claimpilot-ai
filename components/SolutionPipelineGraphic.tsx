"use client";
export function SolutionPipelineGraphic() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
        <p className="text-xs uppercase text-sky-300">Unified pipeline</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"><div key="Profile" className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"><span className="text-sky-300 font-semibold">1</span> <span className="text-sm text-white">Profile</span></div><div key="Stack" className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"><span className="text-sky-300 font-semibold">2</span> <span className="text-sm text-white">Stack</span></div><div key="Gaps" className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"><span className="text-sky-300 font-semibold">3</span> <span className="text-sm text-white">Gaps</span></div><div key="Broker pack" className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"><span className="text-sky-300 font-semibold">4</span> <span className="text-sm text-white">Broker pack</span></div></div>
      </div>
    </section>
  );
}