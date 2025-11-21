import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import image11 from "../images/Image_11.png";
import Footer from "./Sidebar/Footer.jsx";
export default function PublicLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/Dashboard");
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
        <nav className="px-4 py-2.5 lg:px-6">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={image11} className="h-8 w-auto sm:h-9" alt="Balanzo logo" />
            </Link>
            <div className="flex items-center gap-2 lg:order-2">
              {isAuthenticated ? (
                <Link
                  to="/logout"
                  className="rounded-full border border-slate-200 bg-slate-900 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-transform transition-colors hover:-translate-y-px hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 lg:px-5 lg:py-2"
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mr-1 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-slate-800 shadow-sm transition-transform transition-colors hover:-translate-y-px hover:border-sky-400 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 lg:mr-2 lg:px-5 lg:py-2"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm shadow-blue-300/70 transition-transform transition-colors hover:-translate-y-px hover:from-sky-400 hover:via-blue-500 hover:to-emerald-300 focus:outline-none focus:ring-2 focus:ring-sky-500 lg:px-5 lg:py-2"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
            <div
              className="hidden w-full items-center justify-between lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="mt-4 flex flex-col text-xs font-medium text-slate-700 lg:mt-0 lg:flex-row lg:space-x-8">
                {isDashboard ? (
                  <>
                    <li>
                      <NavLink
                        to="/Dashboard"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 text-xs font-medium transition-colors duration-200 lg:p-0 ${
                            isActive
                              ? "text-sky-700"
                              : "text-slate-700 hover:text-sky-700"
                          }`
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 text-xs font-medium transition-colors duration-200 lg:p-0 ${
                            isActive
                              ? "text-sky-700"
                              : "text-slate-700 hover:text-sky-700"
                          }`
                        }
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/about"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 text-xs font-medium transition-colors duration-200 lg:p-0 ${
                            isActive
                              ? "text-sky-700"
                              : "text-slate-700 hover:text-sky-700"
                          }`
                        }
                      >
                        About
                      </NavLink>
                    </li>
                    {!isAuthenticated && (
                      <li>
                      <NavLink
                          to="/register"
                          className={({ isActive }) =>
                            `block py-2 pr-4 pl-3 text-xs font-medium transition-colors duration-200 lg:p-0 ${
                              isActive
                                ? "text-sky-700"
                                : "text-slate-700 hover:text-sky-700"
                            }`
                          }
                        >
                          Register
                        </NavLink>
                      </li>
                    )}
                    {isAuthenticated && (
                      <li>
                      <NavLink
                          to="/Dashboard"
                          className={({ isActive }) =>
                            `block py-2 pr-4 pl-3 text-xs font-medium transition-colors duration-200 lg:p-0 ${
                              isActive
                                ? "text-sky-700"
                                : "text-slate-700 hover:text-sky-700"
                            }`
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
}
