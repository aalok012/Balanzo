import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import api from "../../axiosApi.jsx";

export const StatCards = () => {
  const {
    data: totalData,
    isLoading: totalLoading,
    error: totalError,
  } = useQuery({
    queryKey: ["totalexpenses"],
    queryFn: async () => {
      const res = await api.get("/v1/expenses/sumAmount");
      return res.data.data; // array: [{ _id: null, totalAmt }]
    },
  });

  const {
    data: monthlyData,
    isLoading: monthlyLoading,
    error: monthlyError,
  } = useQuery({
    queryKey: ["monthlyAvg"],
    queryFn: async () => {
      const res = await api.get("/v1/expenses/monthlyAvg");
      return res.data.data; // array of { _id, avgAmt }
    },
  });

const mostRecentMonth = monthlyData?.[monthlyData.length - 1] ?? null;
const avgAmt = mostRecentMonth?.avgAmt || 0;
const latestIncome = mostRecentMonth?.income || 0;
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateString = mostRecentMonth 
  ? `${monthNames[mostRecentMonth._id.month - 1]} ${mostRecentMonth._id.year}`
  : "N/A";



  return (
    <>
      <Card
        title="Total Expenses"
        value={totalData?.[0]?.totalAmt ?? 0}
        pillText="+12.5%"
        trend="up"
        period="From all time"
        variant="blue"
      />
      <Card
        title="Monthly Expenses"
        value={avgAmt}
        pillText="+10.5%"
        trend="up"
        period={dateString}
        variant="green"
      />
      <Card
        title="Monthly Income"
        value={latestIncome}
        pillText="Latest"
        trend="up"
        period={dateString}
        variant="purple"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
  variant = "blue",
}) => {
  const pillClasses =
    trend === "up"
      ? "bg-[#3DFAC8]/20 text-[#3DFAC8]"
      : "bg-rose-500/20 text-rose-200";

  const base =
    "col-span-4 rounded-2xl p-4 shadow-[0_18px_40px_rgba(0,0,0,0.65)] border backdrop-blur-xl";

  const variantClasses =
    variant === "green"
      ? "border-[#3DFAC8]/40 bg-[linear-gradient(135deg,#061926,#0b2f29)]"
      : variant === "purple"
      ? "border-[#8B4FFF]/40 bg-[linear-gradient(135deg,#0a1024,#221046)]"
      : "border-[#3078FF]/40 bg-[linear-gradient(135deg,#061526,#102f5e)]";

  return (
    <div className={`${base} ${variantClasses}`}>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
            {title}
          </h3>
          <p className="text-3xl font-semibold text-[#E8EAED]">{value}</p>
        </div>

        <span
          className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${pillClasses}`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>
      <p className="text-xs text-slate-400">{period}</p>
    </div>
  );
};
