import React from "react";
import { FiSearch, FiCommand } from "react-icons/fi";
import { CommandMenu } from "./commandMenu.jsx";

export const Search = () => {
  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState("");

  return (
    <>
      <div className="relative mb-4 flex items-center rounded-2xl border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-[#E8EAED] shadow-[0_0_0_1px_rgba(48,120,255,0.35)]">
        <FiSearch className="mr-2 h-3.5 w-3.5 text-slate-300" />
        <input
          value={term}
          onChange={(e) => {
            const value = e.target.value;
            setTerm(value);
            if (!open && value.trim()) {
              setOpen(true);
            }
          }}
          onFocus={() => setOpen(true)}
          type="text"
          placeholder="Search expenses or categories"
          className="w-full bg-transparent text-[11px] placeholder:text-slate-500 focus:outline-none"
        />
        <span className="absolute right-1.5 flex cursor-pointer items-center gap-0.5 rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] text-slate-200 shadow"
          onClick={() => setOpen(true)}
        >
          <FiCommand className="h-3 w-3" /> K
        </span>
      </div>

      <CommandMenu open={open} setOpen={setOpen} searchTerm={term} />
    </>
  );
};
