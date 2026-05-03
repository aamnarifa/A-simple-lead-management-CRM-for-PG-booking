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
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Welcome back</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Pipeline Overview</h2>
            <p className="mt-2 text-sm text-slate-500">Monitor lead progress, schedule visits, and keep your sales pipeline moving.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Updated just now
          </div>
        </div>
      </div>

      <DashboardCards stats={stats} />

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Recent Leads</h3>
            <p className="text-sm text-slate-500">Latest entries from your CRM</p>
          </div>
          <p className="text-sm text-slate-500">{loading ? "Refreshing leads..." : `${leads.length} leads loaded`}</p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-100 bg-slate-50 p-2">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-4 font-medium text-slate-500">Name</th>
                <th className="px-4 py-4 font-medium text-slate-500">Phone</th>
                <th className="px-4 py-4 font-medium text-slate-500">Status</th>
                <th className="px-4 py-4 font-medium text-slate-500">Assigned To</th>
                <th className="px-4 py-4 font-medium text-slate-500">Visit Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {recentLeads.length ? (
                recentLeads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-slate-50">
                    <td className="px-4 py-4 text-slate-800">{lead.name}</td>
                    <td className="px-4 py-4 text-slate-600">{lead.phone}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusLabelStyles[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{lead.assignedTo || "Unassigned"}</td>
                    <td className="px-4 py-4 text-slate-600">{lead.status === "Visit Scheduled" && lead.visitDate ? formatDate(lead.visitDate
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{lead.assignedTo || "Unassigned"}</td>
                    <td className="px-4 py-4 text-slate-600">{lead.status === "Visit Scheduled" && lead.visitDate ? formatDate(lead.visitDate) : "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center text-slate-500">
                    No leads available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
