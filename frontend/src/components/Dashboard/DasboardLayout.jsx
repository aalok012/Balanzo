import { Sidebar } from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px_1fr]">
      <Sidebar />
      <Outlet />
    </main>
  );
}