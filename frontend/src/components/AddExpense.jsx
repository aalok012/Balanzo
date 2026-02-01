import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiPlusCircle } from "react-icons/fi";
import api from "../axiosApi.jsx";

const monthLabel = (year, month) => {
  const d = new Date(year, month - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
};

const parseMonthKey = (isoDate) => {
  if (!isoDate) return null;
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return null;
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
};

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [income, setIncome] = useState("");
  const [editIncome, setEditIncome] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  const { data: monthlyData } = useQuery({
    queryKey: ["monthlyAvg"],
    queryFn: async () => {
      const res = await api.get("/expenses/monthlyAvg");
      return res.data.data || [];
    },
  });

  const selectedMonth = React.useMemo(() => {
    // Date is required anyway, but we keep a safe fallback for nicer UI.
    return parseMonthKey(date) || parseMonthKey(new Date().toISOString());
  }, [date]);

  const monthIncome = React.useMemo(() => {
    const list = Array.isArray(monthlyData) ? monthlyData : [];
    if (!selectedMonth) return 0;
    const found = list.find(
      (m) =>
        m?._id?.year === selectedMonth.year && m?._id?.month === selectedMonth.month
    );
    return Number(found?.income || 0);
  }, [monthlyData, selectedMonth]);

  const effectiveIncome = editIncome ? Number(income || 0) : monthIncome;
  const incomeAlreadySet = monthIncome > 0;

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => api.post("/expenses/addExpenseToDb", payload),
    onSuccess: () => {
      setAmount("");
      setDescription("");
      setDate("");
      setCategory("");
      setErrorMessage("");
      setSuccess(true);
      setIncome("");
      setEditIncome(false);
      queryClient.invalidateQueries({ queryKey: ["recentTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyAvg"] });
      queryClient.invalidateQueries({ queryKey: ["totalexpenses"] });
      queryClient.invalidateQueries({ queryKey: ["expenseByCategory"] });
      queryClient.invalidateQueries({ queryKey: ["allExpensesForMonthlyBreakdown"] });
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Could not save expense.";
      setSuccess(false);
      setErrorMessage(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccess(false);

    if (!amount || !description || !date || !category) {
      setErrorMessage("Fill in all fields.");
      return;
    }

    // Income is a once-per-month setting. If it’s not set for this month yet,
    // we ask for it once, then reuse it for the rest of the month.
    if (!incomeAlreadySet && !editIncome && monthIncome <= 0) {
      setEditIncome(true);
    }
    if (!incomeAlreadySet && (!income || Number(income) <= 0)) {
      setErrorMessage("Add your monthly income once so we can calculate percentages.");
      return;
    }

    mutate({
      amount: Number(amount),
      description,
      date,
      category,
      income: Number(effectiveIncome || income || monthIncome || 0),
    });
  };

  return (
    <section className="relative flex flex-1 flex-col overflow-hidden bg-[#040B18] text-[#E8EAED]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#3078ff22_0,_transparent_55%),radial-gradient(circle_at_bottom,_#3dfac822_0,_transparent_55%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 items-center px-4 py-10 lg:py-12">
        <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <header className="flex items-start justify-between border-b border-white/10 px-5 py-4 sm:px-6">
            <div>
              <h1 className="text-base font-semibold">Add expense</h1>
              <p className="mt-1 text-xs text-slate-400">
                Quick entry that matches your dashboard style.
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-slate-200 shadow-[0_0_0_1px_rgba(48,120,255,0.35)]">
              <FiPlusCircle />
            </div>
          </header>

          <div className="px-5 py-5 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Amount">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none transition focus:border-[#3078FF80]"
                    placeholder="1200"
                  />
                </Field>

                <Field label="Date">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setSuccess(false);
                      setErrorMessage("");
                      setEditIncome(false);
                    }}
                    className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none transition focus:border-[#3078FF80]"
                  />
                </Field>

                <div className="sm:col-span-2">
                  {incomeAlreadySet && !editIncome ? (
                    <div className="flex flex-col gap-2 rounded-2xl border border-[#3DFAC8]/30 bg-[#0B1120]/70 px-4 py-3 text-xs text-slate-200 shadow-[0_14px_36px_rgba(0,0,0,0.55)]">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-[#E8EAED]">
                          Income already set for{" "}
                          {selectedMonth
                            ? monthLabel(selectedMonth.year, selectedMonth.month)
                            : "this month"}
                          .
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setIncome(String(monthIncome || ""));
                            setEditIncome(true);
                          }}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-100 transition hover:bg-white/10"
                        >
                          Change
                        </button>
                      </div>
                      <span className="text-slate-300">
                        Using ₹{monthIncome.toLocaleString(undefined)} for your monthly
                        calculations.
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-[#0B1120]/70 p-4 shadow-[0_14px_36px_rgba(0,0,0,0.55)]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-[#E8EAED]">
                            Monthly income
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">
                            You only need to enter this once per month. We’ll reuse it
                            for the rest of the month.
                          </p>
                        </div>
                        {incomeAlreadySet && (
                          <button
                            type="button"
                            onClick={() => {
                              setIncome("");
                              setEditIncome(false);
                            }}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-100 transition hover:bg-white/10"
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                      <div className="mt-3">
                        <input
                          type="number"
                          value={income}
                          onChange={(e) => setIncome(e.target.value)}
                          className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none transition focus:border-[#3078FF80]"
                          placeholder="e.g. 50000"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Field label="Category">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none transition focus:border-[#3078FF80]"
                >
                  <option value="" className="bg-[#040B18]">
                    Select a category
                  </option>
                  <option value="Food" className="bg-[#040B18]">
                    Food
                  </option>
                  <option value="Transport" className="bg-[#040B18]">
                    Transport
                  </option>
                  <option value="Bills" className="bg-[#040B18]">
                    Bills
                  </option>
                  <option value="Shopping" className="bg-[#040B18]">
                    Shopping
                  </option>
                  <option value="Health" className="bg-[#040B18]">
                    Health
                  </option>
                  <option value="Other" className="bg-[#040B18]">
                    Other
                  </option>
                </select>
              </Field>

              <Field label="Description">
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none transition focus:border-[#3078FF80]"
                  placeholder="Short note"
                />
              </Field>

              {errorMessage && (
                <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-200" role="alert">
                  {errorMessage}
                </div>
              )}
              {success && !errorMessage && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200" role="status">
                  Saved.
                </div>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3078FF] via-[#3b82f6] to-[#3DFAC8] px-4 py-2.5 text-sm font-semibold text-[#040B18] shadow-[0_12px_30px_rgba(48,120,255,0.25)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <FiPlusCircle className="h-4 w-4" />
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
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
