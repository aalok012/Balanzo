import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../axiosApi.jsx";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!token) {
      setError("Reset token is missing. Please request a new link.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/reset-password", { token, password });
      setStatus("Password updated. You can sign in now.");

      // Small pause so the user notices the success message.
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Could not reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/85 shadow-[0_18px_45px_rgba(15,23,42,0.8)] backdrop-blur">
        <div className="border-b border-slate-800 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300/80">
            Password reset
          </p>
          <h1 className="mt-2 text-xl font-semibold text-slate-50">
            Set a new password
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Choose a strong password you’ll remember.
          </p>
        </div>

        <div className="px-6 py-6">
          {!token && (
            <div className="mb-4 rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-200">
              Missing token. Please request a new reset link.
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-200">
                New password
              </label>
              <input
                className="block w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a new password"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-200">
                Confirm password
              </label>
              <input
                className="block w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter the password"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-rose-500/50 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-200">
                {error}
              </div>
            )}
            {status && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-200">
                {status}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !token}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:via-blue-500 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Updating…" : "Update password"}
            </button>

            <div className="text-center text-xs text-slate-400">
              <Link to="/login" className="text-sky-300 hover:text-sky-200">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

