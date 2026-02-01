import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import api from "../../axiosApi.jsx";

const COLORS = [
  "#3078FF",
  "#3DFAC8",
  "#8B4FFF",
  "#F59E0B",
  "#EF4444",
  "#22C55E",
  "#60A5FA",
  "#A78BFA",
  "#F472B6",
  "#94A3B8",
];

const monthLabel = (year, month) => {
  const d = new Date(year, month - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
};

const formatMoney = (value) => {
  const n = Number(value || 0);
  if (Number.isNaN(n)) return value;
  return n.toLocaleString(undefined);
};

const sameMonth = (dateIso, year, month) => {
  const d = new Date(dateIso);
  if (!dateIso || Number.isNaN(d.getTime())) return false;
  return d.getFullYear() === year && d.getMonth() + 1 === month;
};

export default function MonthlyBreakdowns() {
  const { data: monthlyData, isLoading: monthlyLoading } = useQuery({
    queryKey: ["monthlyAvg"],
    queryFn: async () => {
      const res = await api.get("/expenses/monthlyAvg");
      return res.data.data || [];
    },
  });

  const { data: allExpenses, isLoading: expensesLoading, error } = useQuery({
    queryKey: ["allExpensesForMonthlyBreakdown"],
    queryFn: async () => {
      const res = await api.get("/expenses/getAllExpenses");
      return res.data.data || [];
    },
  });

  const months = React.useMemo(() => {
    const list = Array.isArray(monthlyData) ? monthlyData : [];
    return list
      .filter((m) => m?._id?.year && m?._id?.month)
      .map((m) => ({
        year: m._id.year,
        month: m._id.month,
        income: Number(m.income || 0),
      }));
  }, [monthlyData]);

  const defaultMonth = months[months.length - 1] || null;
  const [selected, setSelected] = React.useState(() =>
    defaultMonth ? `${defaultMonth.year}-${String(defaultMonth.month).padStart(2, "0")}` : ""
  );

  // Keep selection in sync when data loads the first time.
  React.useEffect(() => {
    if (!selected && defaultMonth) {
      setSelected(
        `${defaultMonth.year}-${String(defaultMonth.month).padStart(2, "0")}`
      );
    }
  }, [defaultMonth, selected]);

  const selectedYear = Number(selected.split("-")[0] || 0);
  const selectedMonth = Number(selected.split("-")[1] || 0);

  const income = React.useMemo(() => {
    const found = months.find((m) => m.year === selectedYear && m.month === selectedMonth);
    return Number(found?.income || 0);
  }, [months, selectedYear, selectedMonth]);

  const categoryTotals = React.useMemo(() => {
    const list = Array.isArray(allExpenses) ? allExpenses : [];
    const inMonth = list.filter((e) => sameMonth(e.date, selectedYear, selectedMonth));

    const map = new Map();
    for (const e of inMonth) {
      const key = String(e.category || "Other");
      map.set(key, (map.get(key) || 0) + Number(e.amount || 0));
    }

    const rows = Array.from(map.entries())
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);

    return rows;
  }, [allExpenses, selectedYear, selectedMonth]);

  const totalSpent = React.useMemo(
    () => categoryTotals.reduce((acc, r) => acc + Number(r.total || 0), 0),
    [categoryTotals]
  );

  const remaining = Math.max(0, income - totalSpent);
  const spentPercent = income > 0 ? (totalSpent / income) * 100 : 0;

  const pieData = React.useMemo(() => {
    if (!income) return [];

    const slices = categoryTotals
      .filter((r) => Number(r.total) > 0)
      .map((r) => ({
        name: r.category,
        value: (Number(r.total) / income) * 100, // % of income
        amount: Number(r.total),
      }));

    if (remaining > 0) {
      slices.push({
        name: "Remaining",
        value: (remaining / income) * 100,
        amount: remaining,
        isRemaining: true,
      });
    }

    return slices;
  }, [income, categoryTotals, remaining]);

  const loading = monthlyLoading || expensesLoading;

  return (
    <section className="h-full rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-5">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-base font-semibold text-[#E8EAED]">
            Monthly breakdowns
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Pie chart shows how much of your monthly income went into each
            category.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block">
            <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
              Month
            </span>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 outline-none transition focus:border-[#3078FF80] sm:w-56"
            >
              {months.map((m) => {
                const val = `${m.year}-${String(m.month).padStart(2, "0")}`;
                return (
                  <option key={val} value={val} className="bg-[#040B18]">
                    {monthLabel(m.year, m.month)}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </header>

      {error && (
        <div className="mb-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
          {error?.response?.data?.message ||
            error?.message ||
            "Could not load monthly data."}
        </div>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <SummaryCard
          title="Income"
          value={`₹ ${formatMoney(income)}`}
          subtitle={income ? "From your monthly summary" : "No income for this month"}
        />
        <SummaryCard
          title="Spent"
          value={`₹ ${formatMoney(totalSpent)}`}
          subtitle={`${spentPercent.toFixed(1)}% of income`}
        />
        <SummaryCard
          title="Remaining"
          value={`₹ ${formatMoney(remaining)}`}
          subtitle="Income left after spending"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/70 shadow-[0_14px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-xs font-semibold text-[#E8EAED]">
              Pie chart (% of income)
            </h2>
            <span className="text-[10px] text-slate-400">
              {loading ? "Loading…" : monthLabel(selectedYear, selectedMonth)}
            </span>
          </div>

          <div className="h-72 px-2 py-3">
            {!income && !loading ? (
              <div className="flex h-full items-center justify-center px-6 text-center text-xs text-slate-400">
                No income found for this month. Add an expense with income set,
                then try again.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell
                        key={`slice-${entry.name}`}
                        fill={
                          entry.isRemaining
                            ? "#1f2a44"
                            : COLORS[idx % COLORS.length]
                        }
                        stroke="#040B18"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#040B18",
                      border: "1px solid #22304a",
                      borderRadius: "0.75rem",
                      color: "#E8EAED",
                      fontSize: 11,
                    }}
                    formatter={(val, name, props) => {
                      const pct = Number(val || 0).toFixed(1);
                      const amt = props?.payload?.amount ?? 0;
                      return [`${pct}% (₹${formatMoney(amt)})`, name];
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "#9ca3c7" }}
                    formatter={(value) => (
                      <span style={{ color: "#9ca3c7" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/70 shadow-[0_14px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="text-xs font-semibold text-[#E8EAED]">
              Category breakdown
            </h2>
            <span className="text-[10px] text-slate-400">
              {categoryTotals.length} categories
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full table-auto text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-300">
                  <th className="text-start pb-2 pt-3 px-4">Category</th>
                  <th className="text-end pb-2 pt-3">Amount</th>
                  <th className="text-end pb-2 pt-3">% of income</th>
                  <th className="text-end pb-2 pt-3 px-4">% of spending</th>
                </tr>
              </thead>
              <tbody>
                {!loading && categoryTotals.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-xs text-slate-400"
                    >
                      No expenses found for this month.
                    </td>
                  </tr>
                )}
                {categoryTotals.map((row) => {
                  const pctIncome = income > 0 ? (row.total / income) * 100 : 0;
                  const pctSpend = totalSpent > 0 ? (row.total / totalSpent) * 100 : 0;
                  return (
                    <tr
                      key={row.category}
                      className="border-b border-white/5 text-slate-100 transition-colors hover:bg-white/5"
                    >
                      <td className="py-2 px-4">{row.category}</td>
                      <td className="py-2 text-end">₹ {formatMoney(row.total)}</td>
                      <td className="py-2 text-end">{pctIncome.toFixed(1)}%</td>
                      <td className="py-2 px-4 text-end">{pctSpend.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

const SummaryCard = ({ title, value, subtitle }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <h3 className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300">
        {title}
      </h3>
      <p className="mt-2 text-2xl font-semibold text-[#E8EAED]">{value}</p>
      <p className="mt-2 text-[11px] text-slate-400">{subtitle}</p>
    </div>
  );
};

