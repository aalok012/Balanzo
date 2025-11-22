import React from "react";
import { TopBar } from "./TopBar.jsx";
import { Grid } from "./Grid.jsx";

export const Dashboard = () => {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/5 pb-4 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl">
      <TopBar />
      <Grid />
    </div>
  );
};
