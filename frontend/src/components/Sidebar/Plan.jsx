import React from "react";

export const Plan = () => {
  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold tracking-wide text-[#E8EAED]">Balanzo</p>
          <p className="text-[10px] text-slate-400">Plan your money with calm.</p>
        </div>
        <button className="rounded-full bg-[#3078FF] px-2.5 py-1 text-[10px] font-medium text-white shadow-[0_0_0_1px_rgba(48,120,255,0.6)] transition hover:bg-[#3b82ff]">
          Support
        </button>
      </div>
    </div>
  );
};
