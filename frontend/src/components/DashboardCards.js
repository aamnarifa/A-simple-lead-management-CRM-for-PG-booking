import React from "react";

const cardMeta = {
  "Total Leads": { icon: "TL", accent: "bg-sky-500/10 text-sky-700", bg: "bg-sky-50" },
  Converted: { icon: "CV", accent: "bg-emerald-500/10 text-emerald-700", bg: "bg-emerald-50" },
  Lost: { icon: "LS", accent: "bg-rose-500/10 text-rose-700", bg: "bg-rose-50" },
  "Visits Scheduled": { icon: "VS", accent: "bg-violet-500/10 text-violet-700", bg: "bg-violet-50" },
  New: { icon: "NW", accent: "bg-blue-500/10 text-blue-700", bg: "bg-blue-50" },
  Contacted: { icon: "CT", accent: "bg-amber-500/10 text-amber-700", bg: "bg-amber-50" },
  "Conversion Rate": { icon: "%", accent: "bg-purple-500/10 text-purple-700", bg: "bg-purple-50" },
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
          <div key={card.title} className={`rounded-[10px] border border-slate-200 ${meta.bg} p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{card.title}</p>
                <p className="mt-2 text-4xl font-bold text-slate-950">{card.value}</p>
              </div>
              <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${meta.accent}`}>
                <span className="text-sm font-bold">{meta.icon}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
