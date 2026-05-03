import React from "react";
import { formatDate, statusLabelStyles, statusBorderStyles } from "../utils/format";

const ASSIGNEES = ["Unassigned", "Agent A", "Agent B"];

export default function LeadCard({ lead, statuses, onUpdateStatus, onUpdateVisitDate, onUpdateAssignedTo }) {
  const formattedDate = lead.visitDate ? new Date(lead.visitDate).toISOString().split("T")[0] : "";
  const statusClasses = statusLabelStyles[lead.status] || "bg-slate-100 text-slate-700";
  const borderClasses = statusBorderStyles[lead.status] || "border-slate-200";

  return (
    <article className={`rounded-[24px] border ${borderClasses} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{lead.phone}</p>
          </div>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}>
            {lead.status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {lead.assignedTo || "Unassigned"}
          </span>
          {lead.status === "Visit Scheduled" && lead.visitDate && (
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              {formatDate(lead.visitDate)}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Status</label>
          <select
            value={lead.status}
            onChange={(event) => onUpdateStatus(lead._id, event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {statuses.map((statusOption) => (
              <option
                key={statusOption}
                value={statusOption}
                disabled={statusOption === "Visit Scheduled" && !lead.visitDate}
              >
                {statusOption}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Assign Owner</label>
          <select
            value={lead.assignedTo || "Unassigned"}
            onChange={(event) => onUpdateAssignedTo(lead._id, event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {ASSIGNEES.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Visit Date</label>
          <input
            type="date"
            value={formattedDate}
            onChange={(event) => onUpdateVisitDate(lead._id, event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </article>
  );
}
