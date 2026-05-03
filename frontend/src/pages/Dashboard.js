import React, { useMemo } from "react";
import DashboardCards from "../components/DashboardCards";
import { formatDate, statusLabelStyles } from "../utils/format";

export default function Dashboard({ leads, loading }) {
  const stats = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter((lead) => lead.status === "Converted").length;
    const lost = leads.filter((lead) => lead.status === "Lost").length;
    const visitsScheduled = leads.filter((lead) => lead.status === "Visit Scheduled").length;
    const newLeads = leads.filter((lead) => lead.status === "New").length;
    const contacted = leads.filter((lead) => lead.status === "Contacted").length;
    const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

    return { total, converted, lost, visitsScheduled, newLeads, contacted, conversionRate };
  }, [leads]);

  const recentLeads = [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">Pipeline Overview</h2>
            <p className="mt-1 text-sm text-slate-500">Monitor lead progress, visits, and conversion health.</p>
          </div>
          <div className="rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            {loading ? "Refreshing leads..." : `${leads.length} leads loaded`}
          </div>
        </div>
      </div>

      <DashboardCards stats={stats} />

      <section className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Recent Leads</h3>
            <p className="text-sm text-slate-500">Latest entries from your CRM</p>
          </div>
          <p className="rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">Conversion rate: {stats.conversionRate}%</p>
        </div>

        <div className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-[10px] border border-slate-100">
          {recentLeads.length ? (
            recentLeads.map((lead) => (
              <div key={lead._id} className="flex items-center justify-between bg-white p-3 transition hover:bg-blue-50/50">
                <div>
                  <p className="font-semibold text-slate-900">{lead.name}</p>
                  <p className="text-sm text-slate-500">{lead.phone}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusLabelStyles[lead.status]}`}>
                    {lead.status}
                  </div>
                  {lead.visitDate && (
                    <p className="mt-1 text-xs font-semibold text-purple-700">{formatDate(lead.visitDate)}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="text-slate-300">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="mt-4 text-sm font-semibold text-slate-900">No leads yet</h4>
              <p className="mt-1 text-sm text-slate-500">Add your first lead to see recent activity</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
