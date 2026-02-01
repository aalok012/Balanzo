import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../axiosApi.jsx";

const CATEGORIES = [
  "",
  "Shopping",
  "Food",
  "Transport",
  "Rent",
  "Entertainment",
  "Bills",
  "Health",
  "Other",
];

const formatMoney = (value) => {
  const n = Number(value || 0);
  if (Number.isNaN(n)) return value;
  return n.toLocaleString(undefined);
};

export default function DetailsByCategory() {
  const [category, setCategory] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("desc");

  const {
    data: allExpenses,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["detailsByCategoryAllExpenses"],
    queryFn: async () => {
      const res = await api.get("/expenses/getAllExpenses");
      return res.data.data || [];
    },
    enabled: false,
  });

  const {
    data: categoryHints,
    isFetching: searchingCategories,
    error: searchError,
  } = useQuery({
    queryKey: ["detailsByCategorySearch", search],
    queryFn: async () => {
      const q = (search || "").trim();
      if (!q) return [];
      const res = await api.post("/expenses/searchExpense", { search: q });
      return res.data.data || [];
    },
    enabled: Boolean(search && search.trim()),
  });

  const activeCategory = category || (categoryHints?.[0]?.category ?? "");

  const filtered = React.useMemo(() => {
    const list = Array.isArray(allExpenses) ? allExpenses : [];
    const byCategory = activeCategory
      ? list.filter((e) => String(e.category || "") === activeCategory)
      : list;

    const dir = sortOrder === "asc" ? 1 : -1;
    return [...byCategory].sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      if (Number.isNaN(ta) || Number.isNaN(tb)) return 0;
      return dir * (ta - tb);
    });
  }, [allExpenses, activeCategory, sortOrder]);

  const summary = React.useMemo(() => {
    const total = filtered.reduce((acc, e) => acc + Number(e.amount || 0), 0);
    return { total, count: filtered.length };
  }, [filtered]);

  const selectedHint = React.useMemo(() => {
    const hints = Array.isArray(categoryHints) ? categoryHints : [];
    if (!activeCategory) return null;
    return hints.find((h) => h.category === activeCategory) || null;
  }, [categoryHints, activeCategory]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await refetch();
  };

  return (
    <section className="h-full rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-5">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-base font-semibold text-[#E8EAED]">
            Details by category
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Choose a category (or type to search), then fetch matching expenses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-slate-300 shadow-[0_0_0_1px_rgba(48,120,255,0.25)]">
            {isFetching ? "Loading…" : "Ready"}
          </span>
        </div>
      </header>

      <form
        onSubmit={handleSearch}
        className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-[#0B1120]/70 p-4 shadow-[0_14px_36px_rgba(0,0,0,0.6)] sm:grid-cols-2 lg:grid-cols-5"
      >
        <Field label="Pick a category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 outline-none transition focus:border-[#3078FF80]"
          >
            {CATEGORIES.map((c) => (
              <option key={c || "none"} value={c} className="bg-[#040B18]">
                {c ? c : "Select a category"}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Or search category">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type e.g. foo, sho, trans…"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#3078FF80]"
          />
        </Field>

        <Field label="Sort by date">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 outline-none transition focus:border-[#3078FF80]"
          >
            <option value="desc" className="bg-[#040B18]">
              Newest first
            </option>
            <option value="asc" className="bg-[#040B18]">
              Oldest first
            </option>
          </select>
        </Field>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#3078FF] via-[#3b82f6] to-[#3DFAC8] px-4 py-2 text-xs font-semibold text-[#040B18] shadow-[0_12px_30px_rgba(48,120,255,0.25)] transition hover:opacity-95"
          >
            Search
          </button>
        </div>

        <div className="lg:col-span-5">
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-slate-400">Suggestions:</span>
            {searchingCategories && (
              <span className="text-[10px] text-slate-300">Searching…</span>
            )}
            {!searchingCategories &&
              (categoryHints || []).slice(0, 6).map((h) => (
                <button
                  key={h.category}
                  type="button"
                  onClick={() => setCategory(h.category)}
                  className={`rounded-full border px-2.5 py-1 text-[10px] transition ${
                    h.category === activeCategory
                      ? "border-[#3DFAC8]/50 bg-[#3DFAC8]/10 text-[#E8EAED]"
                      : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {h.category}
                </button>
              ))}
          </div>
          {searchError && (
            <div className="mt-2 text-[10px] text-rose-200">
              {searchError?.response?.data?.message ||
                searchError?.message ||
                "Search failed."}
            </div>
          )}
        </div>
      </form>

      {error && (
        <div className="mb-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200">
          {error?.response?.data?.message ||
            error?.message ||
            "Could not load expenses."}
        </div>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <SummaryCard
          title="Category"
          value={activeCategory || "—"}
          subtitle="Current selection"
        />
        <SummaryCard
          title="Matching transactions"
          value={summary.count}
          subtitle="Count in this category"
        />
        <SummaryCard
          title="Total amount"
          value={`₹ ${formatMoney(summary.total)}`}
          subtitle="Sum of matching expenses"
        />
      </div>

      {selectedHint && (
        <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[11px] text-slate-200 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <span className="text-slate-300">Quick stats: </span>
          <span className="font-semibold text-[#E8EAED]">
            {selectedHint.count}
          </span>{" "}
          transactions •{" "}
          <span className="font-semibold text-[#E8EAED]">
            ₹{formatMoney(selectedHint.totalAmount)}
          </span>{" "}
          total
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/70 shadow-[0_14px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="text-xs font-semibold text-[#E8EAED]">Results</h2>
          <span className="text-[10px] text-slate-400">{filtered.length} rows</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full table-auto text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-300">
                <th className="text-start pb-2 pt-3 px-4">Date</th>
                <th className="text-start pb-2 pt-3">Description</th>
                <th className="text-start pb-2 pt-3">Category</th>
                <th className="text-end pb-2 pt-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-xs text-slate-400"
                  >
                    Pick a category (or search one) and hit Search.
                  </td>
                </tr>
              )}
              {filtered.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b border-white/5 text-slate-100 transition-colors hover:bg-white/5"
                >
                  <td className="py-2 px-4 whitespace-nowrap">
                    {formatDate(tx.date)}
                  </td>
                  <td className="py-2 pr-4">{tx.description || "—"}</td>
                  <td className="py-2 pr-4">{tx.category || "—"}</td>
                  <td className="py-2 px-4 text-end whitespace-nowrap">
                    ₹ {formatMoney(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const Field = ({ label, children }) => {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
};

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

const formatDate = (date) => {
  const d = new Date(date);
  if (!date || Number.isNaN(d.getTime())) return date || "—";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

