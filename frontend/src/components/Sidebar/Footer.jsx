import React from "react";
import { Link } from "react-router-dom";
import image11 from "../../images/Image_11.png";

export default function Footer() {
    return (
        <footer className="relative border-t border-slate-800/80 bg-slate-950/95 backdrop-blur">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-500/30 via-blue-500/40 to-indigo-500/30" />
            <div className="mx-auto w-full max-w-6xl px-3 py-2">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1.5 md:max-w-xs">
                        <Link to="/" className="flex items-center gap-2">
                            
                            <span className="text-xs font-semibold tracking-wide text-slate-100">
                                Balanzo</span>
                        </Link>
                        <p className="text-[10px] leading-snug text-slate-400">
                            A secure way to manage your money and grow
                            your financial future.
                        </p>
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5">
                            <svg
                                className="h-3.5 w-3.5 text-emerald-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M10.75 2.75 16 4.5v5.25c0 3.5-2.5 6.75-6 7.5-3.5-.75-6-4-6-7.5V4.5l5.25-1.75" />
                                <path d="M8 10.25 9.75 12 13 8.75" />
                            </svg>
                            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-100">
                                Bank-level security
                            </span>
                        </div>
                    </div>

                    <div className="grid flex-1 grid-cols-2 gap-4 border-t border-slate-800/70 pt-3 text-[11px] sm:grid-cols-4 md:border-t-0 md:border-l md:pl-5">
                        <div className="space-y-1.5">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                Company
                            </h2>
                            <ul className="space-y-1 text-slate-400">
                                <li>
                                    <Link to="/about" className="transition-colors hover:text-slate-200">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-1.5">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                Product
                            </h2>
                            <ul className="space-y-1 text-slate-400">
                                <li>
                                    <Link to="/" className="transition-colors hover:text-slate-200">
                                        Overview
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-1.5">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                Legal
                            </h2>
                            <ul className="space-y-1 text-slate-400">
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-1.5">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                Support
                            </h2>
                            <ul className="space-y-1 text-slate-400">
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Contact Support
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="transition-colors hover:text-slate-200">
                                        Status
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex flex-col items-start justify-between gap-2 border-t border-slate-800/70 pt-2 text-[11px] text-slate-500 sm:flex-row sm:items-center">
                    <span className="text-[11px] text-slate-500">
                        © 2023{" "}
                        <a
                            href="https://github.com/aalok012"
                            className="font-medium text-slate-300 hover:text-slate-100"
                            target="_blank"
                            rel="noreferrer"
                        >
                            aalokthakur
                        </a>{" "}
                        . All rights reserved.
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                            Connect
                        </span>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="text-slate-400 transition-colors hover:text-sky-300"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <rect x="2.5" y="2.5" width="15" height="15" rx="2" />
                                    <path d="M6 8.25v6" />
                                    <path d="M6 6.25v.01" />
                                    <path d="M9.75 14.25v-3.5A2 2 0 0 1 13 10.5c1.29 0 2.25.96 2.25 2.5v1.25" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 transition-colors hover:text-sky-300"
                                aria-label="X (Twitter)"
                            >
                                <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path d="M4 4.5 15.5 16" />
                                    <path d="M15 4 10.75 8.75" />
                                    <path d="M9.25 11.25 5 16" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 transition-colors hover:text-sky-300"
                                aria-label="GitHub"
                            >
                                <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path d="M10 2.5A7.5 7.5 0 0 0 5 14.85c.39.07.53-.17.53-.38 0-.19-.01-.81-.01-1.47-1.93.35-2.43-.47-2.58-.9-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.71-.19-3.51-.86-3.51-3.79 0-.84.3-1.53.79-2.07-.08-.2-.35-1.02.08-2.12 0 0 .66-.21 2.16.79a7.33 7.33 0 0 1 3.94 0c1.5-1 2.16-.79 2.16-.79.43 1.1.16 1.92.08 2.12.49.54.79 1.23.79 2.07 0 2.94-1.8 3.59-3.52 3.78.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.53.38A7.5 7.5 0 0 0 10 2.5Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
