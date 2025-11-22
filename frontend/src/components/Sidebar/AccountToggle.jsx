import React from "react";
import { FiChevronDown, FiUser } from "react-icons/fi";

export const AccountToggle = () => {
  const fullName =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("userFullname")) ||
    "";
  const email =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("userEmail")) ||
    "";
  const displayName = fullName || "Guest";

  return (
    <div className="mb-4 mt-1 border-b border-white/10 pb-4">
      <button className="group relative flex w-full items-center gap-3 rounded-2xl bg-white/5 px-2.5 py-2 transition hover:bg-white/10 hover:shadow-[0_0_0_1px_rgba(61,250,200,0.6)]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3078FF] via-[#8B4FFF] to-[#3DFAC8] shadow-[0_0_0_1px_rgba(61,250,200,0.8)]">
          <FiUser className="h-5 w-5 text-[#E8EAED]" />
        </div>
        <div className="text-start">
          <span className="block text-xs font-semibold tracking-wide text-[#E8EAED]">
            {displayName}
          </span>
          {email && (
            <span className="block text-[10px] text-slate-400">
              {email}
            </span>
          )}
        </div>

        <FiChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-hover:text-[#3DFAC8]" />
      </button>
    </div>
  );
};
