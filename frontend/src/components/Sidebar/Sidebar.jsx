import React from "react";
import { AccountToggle } from "./AccountToggle.jsx";
import { Search } from "./Search.jsx";
import { RouteSelect } from "./RouteSelect.jsx";
import { Plan } from "./Plan.jsx";

export const Sidebar = () => {
  return (
    <aside className="relative z-10 flex flex-col lg:h-full">
      <div className="flex flex-col rounded-3xl border border-white/10 bg-white/5 px-3 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl lg:sticky lg:top-4 lg:h-[calc(100vh-32px-64px)] lg:overflow-y-auto">
        <AccountToggle />
        <Search />
        <RouteSelect />
        <div className="mt-auto">
          <Plan />
        </div>
      </div>
    </aside>
  );
};
