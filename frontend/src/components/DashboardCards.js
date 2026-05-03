import React from "react";

const cardMeta = {
  "Total Leads": { icon: "📊", accent: "bg-sky-500/10 text-sky-700" },
  Converted: { icon: "✅", accent: "bg-emerald-500/10 text-emerald-700" },
  Lost: { icon: "❌", accent: "bg-rose-500/10 text-rose-700" },
  "Visits Scheduled": { icon: "📅", accent: "bg-violet-500/10 text-violet-700" },
  New: { icon: "🆕", accent: "bg-blue-500/10 text-blue-700" },
  Contacted: { icon: "☎️", accent: "bg-amber-500/10 text-amber-700" },
  "Conversion Rate": { icon: "📈", accent: "bg-purple-500/10 text-purple-700" },
};

export default function DashboardCards({ stats }) {
  const cards = [
    { title: "Total Leads", value: stats.total },
    { title: "Converted", value: stats.converted },
    { title: "Lost", value: stats.lost },
    { title: "Visits Scheduled", value: stats.visitsScheduled },
    { title: "New", value: stats.newLeads },
    { title: "Contacted", value: stats.contacted },
    { title: "Conversion Rate", value: `${stats.conversionRate}%` },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const meta = cardMeta[card.title];
        return (
          <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{card.title}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${meta.accent}`}>
                <span className="text-xl">{meta.icon}</span>
              </div>
            </div>
          </div>
        );
      } return (
          <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{card.title}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${meta.accent}`}>
                <span className="text-xl">{meta.icon}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
