import React from "react";
import { FiUser } from "react-icons/fi";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "../../axiosApi.jsx";

export const ActivityGraph = () => {
  const { data } = useQuery({
    queryKey: ["monthlyAvg"],
    queryFn: async () => {
      const res = await api.get("/expenses/monthlyAvg");
      return res.data.data;
    },
  });

  const last7Months = data?.slice(-7) ?? [];

  const labelFor = (idx, fallback) => {
    const m = last7Months[idx];
    return m && m._id ? `${m._id.month}/${m._id.year}` : fallback;
  };

  const chartData = Array.from({ length: 7 }).map((_, idx) => ({
    name: labelFor(idx, `M${idx + 1}`),
    Income: last7Months[idx]?.income ?? 0,
    Expenses: last7Months[idx]?.avgAmt ?? 0,
  }));

  return (
    <div className="col-span-12 min-w-0 overflow-hidden rounded-2xl border border-[#3078FF40] bg-[#0B1120]/75 shadow-[0_14px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:col-span-8">
      <div className="flex items-center justify-between p-4">
        <h3 className="flex items-center gap-1.5 text-sm font-medium text-[#E8EAED]">
          <FiUser /> Activity
        </h3>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
          Latest monthly income vs expenses
        </span>
      </div>

      <div className="px-4 pb-4 text-slate-200">
        <div className="h-64 sm:h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#1b2942" strokeDasharray="1 4" />
              <XAxis
                dataKey="name"
                padding={{ left: 30, right: 30 }}
                tick={{ fill: "#7d8bb6", fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                width={50}
                tick={{ fill: "#7d8bb6", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#040B18",
                  border: "1px solid #22304a",
                  borderRadius: "0.75rem",
                  color: "#E8EAED",
                  fontSize: 11,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: "#9ca3c7" }} />
              <Line
                type="monotone"
                dataKey="Income"
                stroke="#3078FF"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "#040B18",
                  strokeWidth: 2,
                  fill: "#3DFAC8",
                }}
              />
              <Line
                type="monotone"
                dataKey="Expenses"
                stroke="#3DFAC8"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "#040B18",
                  strokeWidth: 2,
                  fill: "#8B4FFF",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
