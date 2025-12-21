import React from "react";
import { Command } from "cmdk";
import api from "../../axiosApi.jsx";

export const CommandMenu = ({ open, setOpen, searchTerm }) => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  React.useEffect(() => {
    const q = (searchTerm || "").trim();
    if (!open || !q) {
      setResults([]);
      setError("");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.post("/v1/expenses/searchExpense", {
          search: q,
        });
        if (!cancelled) {
          setResults(res.data.data || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              err?.response?.data?.error ||
              "Unable to search expenses."
          );
          setResults([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchResults();

    return () => {
      cancelled = true;
    };
  }, [open, searchTerm]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search expenses"
      className="fixed inset-0 z-50 bg-slate-950/60"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto mt-12 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        <Command.Input
          value={searchTerm}
          readOnly
          placeholder="Search by category..."
          className="w-full border-b border-slate-200 p-3 text-sm placeholder:text-slate-400 focus:outline-none"
        />
        <Command.List className="max-h-80 overflow-y-auto bg-white">
          {loading && (
            <div className="p-3 text-xs text-slate-500">Searching…</div>
          )}
          {!loading && error && (
            <div className="p-3 text-xs text-rose-600">{error}</div>
          )}
          {!loading && !error && results.length === 0 && searchTerm && (
            <Command.Empty className="p-3 text-xs text-slate-500">
              No results found.
            </Command.Empty>
          )}
          {results.map((item) => (
            <Command.Item
              key={item.category}
              value={item.category}
              className="flex cursor-pointer items-center justify-between px-3 py-2 text-xs text-slate-700 aria-selected:bg-slate-100"
            >
              <div>
                <div className="font-medium">{item.category}</div>
                <div className="text-[10px] text-slate-500">
                  {item.count} transactions • ₹{item.totalAmount}
                </div>
              </div>
              {item.latestDate && (
                <div className="text-[10px] text-slate-400">
                  {new Date(item.latestDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </div>
              )}
            </Command.Item>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
