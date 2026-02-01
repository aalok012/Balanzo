import React from "react";
import { FiChevronDown, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const AccountToggle = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef(null);

  const fullName =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("userFullname")) ||
    "";
  const email =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("userEmail")) ||
    "";
  const displayName = fullName || "Guest";

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onClickOutside = (e) => {
      const el = wrapperRef.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative mb-4 mt-1 border-b border-white/10 pb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative flex w-full items-center gap-3 rounded-2xl bg-white/5 px-2.5 py-2 transition hover:bg-white/10 hover:shadow-[0_0_0_1px_rgba(61,250,200,0.6)]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
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

        <FiChevronDown
          className={`absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform group-hover:text-[#3DFAC8] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/95 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur-xl"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              navigate("/logout");
            }}
            className="w-full px-4 py-3 text-left text-xs font-semibold text-rose-200 transition hover:bg-white/5"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
