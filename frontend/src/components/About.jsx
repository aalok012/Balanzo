import React from "react";
import profileImg from "../images/profile-img.jpeg";
export function About() {
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-slate-950 text-slate-50">
      {/* animated background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.35)_0,_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(210deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[length:160px_160px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 lg:py-24 space-y-12">
        {/* page label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-100 backdrop-blur-sm">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>About Balanzo</span>
        </div>

        {/* personal card + app section */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] items-stretch">
          {/* Personal card section */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-teal-400 opacity-60 blur-xl" />
            <div className="relative rounded-3xl bg-slate-900/70 border border-sky-500/40 shadow-[0_18px_45px_rgba(15,23,42,0.8)] px-6 py-7 sm:px-7 sm:py-8 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl overflow-hidden border border-sky-300/60 shadow-lg shadow-sky-500/40 bg-slate-800">
                  <img
                    src={profileImg}
                    alt="Founder portrait"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-sky-300/80">
                    Founder
                  </p>
                  <h1 className="text-xl sm:text-2xl font-bold">
                    <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                      Alok Kumar Thakur
                    </span>
                  </h1>
                  <p className="text-[13px] text-slate-300">
                    Developer
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                I built Balanzo to make it easy to see where your money goes.
                When you open the app, you should quickly understand what you
                spent and what you have left.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                
              </p>

              <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-sky-500/15 border border-sky-400/40 px-3 py-1 text-sky-100">
                  Personal finance app
                </span>
                <span className="rounded-full bg-cyan-500/15 border border-cyan-400/40 px-3 py-1 text-cyan-100">
                  Built for everyday use
                </span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-400/40 px-3 py-1 text-emerald-100">
                  Clear, Clean with Graphs
                </span>
              </div>
            </div>
          </div>

          {/* Balanzo app section */}
          <div className="relative">
            {/* floating icons */}
            <div className="pointer-events-none absolute -top-6 -right-4 h-10 w-10 rounded-2xl bg-sky-500/30 blur-sm animate-pulse" />
            <div className="pointer-events-none absolute bottom-0 -left-6 h-12 w-12 rounded-full bg-emerald-400/25 blur-md animate-pulse" />

            <div className="relative rounded-3xl bg-gradient-to-br from-sky-600 via-blue-700 to-slate-900 border border-sky-300/40 shadow-[0_22px_60px_rgba(15,23,42,0.9)] px-6 py-7 sm:px-9 sm:py-9 text-slate-50 overflow-hidden">
              {/* top strip */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-sky-100/80">
                    The app
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Balanzo, your money dashboard.
                  </h2>
                </div>
                <div className="hidden sm:flex flex-col items-end text-[11px] text-sky-100/80">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/40 px-3 py-1 border border-sky-300/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Live insights
                  </span>
                </div>
              </div>
              

              {/*  dashboard preview */}
              <div className="grid gap-4 md:grid-cols-[1.2fr_0.9fr] items-start">
                {/* charts area */}
                <div className="rounded-2xl bg-slate-950/40 border border-sky-400/40 p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-200">Spending overview</p>
                    <span className="text-[11px] text-emerald-300">
                      +18.4% this month
                    </span>
                  </div>
                  {/* animated bars */}
                  <div className="flex items-end gap-1.5 h-24 mb-3">
                    {[30, 55, 45, 75, 60, 90].map((h, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-full bg-gradient-to-t from-sky-400/40 to-cyan-300 ${
                          idx === 5 ? "shadow-lg shadow-cyan-400/60" : ""
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>

                {/* side stats */}
                <div className="space-y-3 text-xs">
                  <div className="rounded-2xl bg-slate-950/40 border border-emerald-300/40 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-200">This month&apos;s budget</span>
                      <span className="text-emerald-300 text-[11px]">
                        Calm zone
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-slate-50">
                      ₹ 24,560
                    </p>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-400 to-sky-300 animate-pulse" />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                     
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-950/40 border border-sky-300/40 p-3">
                    <ul className="space-y-2 text-[12px] text-slate-300">
                      <li>• Keep all expenses in one clean place.</li>
                      <li>• Spot patterns that are easy to miss on your own.</li>
                      <li>• Turn confusing numbers into clear daily decisions.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
