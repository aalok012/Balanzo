import React from "react";
import { SlCalender } from "react-icons/sl";

export const TopBar = () => {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "Good evening";
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }

  const storedName =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("userFullname")) ||
    "";
  const firstName = storedName.trim().split(" ")[0] || "there";

  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-4 mt-2 border-b border-white/10 px-4 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="block text-sm font-semibold tracking-wide text-[#E8EAED]">
            {greeting}, {firstName}!
          </span>
          <span className="block text-xs text-slate-400">{formattedDate}</span>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-[0_0_0_1px_rgba(48,120,255,0.35)] transition-colors hover:bg-white/10">
          <SlCalender />
          <span>Last 30 days</span>
        </button>
      </div>
    </div>
  );
};
