import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiPlusCircle } from "react-icons/fi";
import api from "../axiosApi.jsx";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [income, setIncome] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["recentTransactions"] });
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

    mutate({
      amount: Number(amount),
      description,
      date,
      category,
      income: Number(income)
    });
  };

  return (
    <section className="flex flex-1 flex-col bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-xl flex-1 items-center px-4 py-10 lg:py-12">
        <div className="w-full rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Add expense</h1>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <FiPlusCircle />
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="1200"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          
          <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Income
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="Short note"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-rose-600" role="alert">
              {errorMessage}
            </p>
          )}
          {success && !errorMessage && (
            <p className="text-sm text-emerald-600" role="status">
              Saved.
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiPlusCircle className="h-4 w-4" />
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
          </form>
        </div>
      </div>
    </section>
  );
}
