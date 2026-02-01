import { Sidebar } from "../Sidebar/Sidebar.jsx";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <main className="relative grid min-h-[calc(100vh-80px)] grid-cols-1 gap-4 bg-[#040B18] px-4 py-4 text-[#E8EAED] sm:px-6 sm:py-6 lg:grid-cols-[260px_1fr] lg:gap-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#3078ff22_0,_transparent_55%),radial-gradient(circle_at_bottom,_#3dfac822_0,_transparent_55%)]" />
      <Sidebar />
      <div className="relative z-10 flex flex-col">
        <div className="mb-4 flex items-center justify-end">
          <button
            type="button"
            onClick={() => navigate("/logout")}
            className="rounded-full border border-rose-500/70 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200 shadow-sm transition hover:bg-rose-500/20 hover:text-rose-50"
          >
            Logout
          </button>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-slate-700/60 bg-[#050A16]/95 px-4 py-2 text-[11px] text-slate-300 shadow-[0_8px_30px_rgba(0,0,0,0.7)] sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full rounded-full border border-slate-600/80 bg-transparent px-3 py-1 text-center text-xs font-medium text-slate-200 transition hover:border-sky-400 hover:text-sky-300 sm:w-auto"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
