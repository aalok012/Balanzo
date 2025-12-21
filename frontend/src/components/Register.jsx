import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axiosApi";

const FormRegistration = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [DOB, setDOB] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", {
        username,
        password,
        email,
        fullname,
        DOB,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="mb-3 flex w-full max-w-3xl justify-end">
        <div className="flex items-center gap-2 text-[11px] text-slate-300">
          <span>Calm mode</span>
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={darkMode}
              readOnly
            />
            <div
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className="relative h-5 w-9 rounded-full bg-slate-700/80 transition peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 peer-checked:bg-sky-500"
            >
              <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-slate-950 shadow transition peer-checked:translate-x-4" />
            </div>
          </label>
        </div>
      </div>
      <div
        className={`w-full max-w-3xl rounded-2xl border border-slate-800/80 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.8)] backdrop-blur ${
          darkMode ? "bg-slate-950/90" : "bg-slate-900/85"
        }`}
      >
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300/80">
            Create your secure account
          </p>
          <h1 className="mt-2 text-xl font-semibold text-slate-50 sm:text-3xl">
            Join Balanzo today!
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            One account to track balances, budgets, and long-term goals.
          </p>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleRegister}
            className="mx-auto flex max-w-xs flex-col gap-4 sm:max-w-md md:max-w-lg"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm font-medium text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
                type="text"
                required
                value={fullname}
                placeholder="Full name"
                onChange={(e) => setFullname(e.target.value)}
              />

              <input
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm font-medium text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
                type="email"
                required
                value={email}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm font-medium text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
              type="text"
              required
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm font-medium text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
              type="date"
              required
              value={DOB}
              placeholder="Date of birth"
              onChange={(e) => setDOB(e.target.value)}
            />
            <input
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-4 py-2.5 text-sm font-medium text-slate-100 placeholder-slate-500 outline-none ring-1 ring-transparent transition focus:border-sky-500 focus:ring-sky-500/40"
              type="password"
              required
              value={password}
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:from-sky-400 hover:via-blue-500 hover:to-emerald-300 focus:outline-none focus:ring-2 focus:ring-sky-500/70"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span>Create account</span>
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
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
              <span>Stay aware of your Expenses</span>
            </p>
            <p className="mt-4 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link to="/login">
                <span className="font-semibold text-sky-300 hover:text-sky-200">
                  Log in
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FormRegistration;
