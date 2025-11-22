
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../axiosApi"; // adjust path

const LoginWithGoogleButton = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.post("/v1/users/login", { email, password });
    const { accessToken, user } = res.data.data;

    localStorage.setItem("token", accessToken);
    if (user?.fullname) {
      localStorage.setItem("userFullname", user.fullname);
    } else if (user?.username) {
      localStorage.setItem("userFullname", user.username);
    }
    if (user?.email) {
      localStorage.setItem("userEmail", user.email);
    }
    if (user?.username) {
      localStorage.setItem("username", user.username);
    }
    navigate("/Dashboard");
  };

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/85 shadow-[0_18px_45px_rgba(15,23,42,0.8)] backdrop-blur">
        <div className="hidden md:flex lg:w-1/2 flex-col justify-between border-r border-slate-800 bg-gradient-to-br from-sky-600/20 via-sky-900/70 to-slate-950 px-8 py-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200/80">
              Balanzo Secure Access
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-50">
              Built for calm, secure finance.
            </h2>
            <p className="mt-3 text-sm text-slate-200/85">
              Bank‑grade encryption, real-time monitoring, and thoughtful design
              to keep your money where it belongs.
            </p>
          </div>
          <div className="mt-6 space-y-3 text-xs text-slate-100/90">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 text-emerald-300">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 2.75 16 4.5v5.25c0 3.5-2.5 6.75-6 7.5-3.5-.75-6-4-6-7.5V4.5l5.25-1.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 10.25 9.75 12 13 8.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <div>
                <p className="font-medium text-slate-50">Bank-level security</p>
                <p className="text-[11px] text-slate-200/80">
                  256‑bit encryption across all sessions.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-sky-400/60 bg-sky-500/10 text-sky-300">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 11.5 8.25 15 16 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <div>
                <p className="font-medium text-slate-50">Protected accounts</p>
                <p className="text-[11px] text-slate-200/80">
                  Continuous monitoring and sign-in alerts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-7 sm:px-8 lg:w-1/2">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300/80">
              Secure sign in
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-50">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Sign in to continue tracking balances, budgets, and insights.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-200">
                Email address
              </label>
              <input
                className="block w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-medium text-slate-200">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[11px] font-medium text-sky-300 hover:text-sky-200"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="mt-6">
            <form onSubmit={handleLogin}>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:via-blue-500 hover:to-emerald-300 focus:outline-none focus:ring-2 focus:ring-sky-500/70"
              >
                Login securely
              </button>
            </form>
          </div>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/60">
                <svg className="h-4 w-4" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <span className="whitespace-nowrap text-sm text-slate-100">
                Sign in with Google
              </span>
            </div>
          </button>
          <div className="mt-4 flex w-full items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-500/10 text-emerald-300">
                <svg
                  className="h-2.5 w-2.5"
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7.25 5.25 10.5 12 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </span>
              <span>Bank-level security • Encrypted sign in</span>
            </div>
          </div>
          <div className="mt-3 flex items-center w-full text-center">
            <Link
              to="/register"
              className="w-full text-center text-xs text-slate-400"
            >
              Don&apos;t have any account yet?
              <span className="text-sky-300"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginWithGoogleButton;
