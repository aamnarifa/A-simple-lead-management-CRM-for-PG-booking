import React from "react";

const navItems = ["Dashboard", "Leads", "Pipeline"];

export default function Navbar({ currentPage, onChangePage }) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-semibold shadow-sm">
            CRM
          </div>
          <div>
            <p className="text-sm text-slate-500">Lead Management</p>
            <h1 className="text-2xl font-semibold text-slate-900">Sales CRM</h1>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onChangePage(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
