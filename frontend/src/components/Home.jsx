import React from "react";
import { Link } from "react-router-dom";
//designed the home
export default function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return (
    <section className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-sky-50 via-sky-100 to-white text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25)_0,_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.2)_0,_transparent_55%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 lg:py-24">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text / CTA */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3 py-1 text-xs font-medium text-sky-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Glimpse of your daily spending</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Track your spending
              <span className="block bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                in one clear view.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 max-w-xl">
              Balanzo shows what you earn, what you spend, and how much is left
              for the month. 
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-400/40 hover:bg-blue-500 transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    Get started for free
                    <span className="ml-2 translate-y-px">→</span>
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center rounded-xl border border-blue-200 bg-white/80 px-6 py-3 text-sm sm:text-base font-medium text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    Already have an account?
                  </Link>
                </>
              ) : (
                <Link
                  to="/Dashboard"
                  className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-400/40 hover:bg-blue-500 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Go to your dashboard
                  <span className="ml-2 translate-y-px">↗</span>
                </Link>
              )}
            </div>
          </div>

          {/* Sample charts */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-sky-300 via-blue-400 to-indigo-400 opacity-40 blur-2xl" />
              <div className="relative rounded-3xl border border-sky-100 bg-white/90 p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      This month
                    </p>
                    <p className="text-2xl sm:text-3xl font-semibold text-slate-900">
                      ₹ 24,560
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Up 18% from last month
                  </span>
                </div>

                {/* Mini bar chart */}
                <div className="mb-4">
                  <div className="flex items-end gap-1.5 h-28">
                    {[40, 60, 55, 80, 65, 90].map((height, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-full bg-gradient-to-t from-sky-200 to-sky-500 ${
                          idx === 5 ? "shadow-md shadow-sky-400" : ""
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-slate-400 uppercase tracking-wide">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>

                {/* Simple line graph */}
                <div className="mb-6">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Last 7 days</span>
                  </div>
                  <div className="h-24 w-full rounded-xl bg-slate-50 px-3 py-2">
                    <svg
                      viewBox="0 0 120 40"
                      className="h-full w-full"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="homeLineGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M0 28 L20 24 L40 26 L60 18 L80 22 L100 15 L120 19"
                        fill="none"
                        stroke="url(#homeLineGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0 40 L0 28 L20 24 L40 26 L60 18 L80 22 L100 15 L120 19 L120 40 Z"
                        fill="url(#homeLineGradient)"
                        opacity="0.16"
                      />
                    </svg>
                  </div>
                </div>

                {/* Category split chart */}
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24">
                    <div className="absolute inset-0 rounded-full bg-slate-100" />
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500" />
                    <div className="absolute inset-4 rounded-full bg-white" />
                  </div>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-500" />
                      <span>Essentials • 45%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      <span>Lifestyle • 30%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>Savings • 25%</span>
                    </div>
                    <Link
                      to="/Dashboard"
                      className="inline-flex items-center gap-1 pt-2 text-[11px] font-medium text-sky-600 hover:text-sky-700"
                    >
                      Open dashboard
                      <span>↗</span>
                    </Link>
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
