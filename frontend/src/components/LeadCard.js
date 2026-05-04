import React from "react";
import { formatDate, formatDateInput, statusLabelStyles, statusBorderStyles } from "../utils/format";

const ASSIGNEES = ["Unassigned", "Agent A", "Agent B"];

export default function LeadCard({ lead, statuses, onUpdateStatus, onUpdateVisitDate, onUpdateAssignedTo, onDeleteLead, pendingVisitLeadId }) {
  const formattedDate = formatDateInput(lead.visitDate);
  const isVisitDateOpen = lead.status === "Visit Scheduled" || pendingVisitLeadId === lead._id;
  const statusClasses = statusLabelStyles[lead.status] || "bg-slate-100 text-slate-700 border-slate-200";
  const borderClasses = statusBorderStyles[lead.status] || "border-slate-200";

  return (
    <article className={`group relative rounded-lg border ${borderClasses} bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg`}>
      {/* Status indicator */}
      <div className="absolute right-3 top-3">
        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm ${statusClasses}`}>
          {lead.status}
        </span>
      </div>

      <div className="space-y-4 pr-2">
        <div className="pr-24">
          <h3 className="text-lg font-bold leading-snug text-slate-950 transition-colors group-hover:text-blue-700">
            {lead.name}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-500">{lead.phone}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Owner</span>
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            {lead.assignedTo || "Unassigned"}
          </span>
        </div>

        {lead.status === "Visit Scheduled" && lead.visitDate && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Visit</span>
            <span className="inline-flex rounded-full border border-purple-200 bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
              {formatDate(lead.visitDate)}
            </span>
          </div>
        )}

        <div className="space-y-3 border-t border-slate-100 pt-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Status</label>
            <select
              value={lead.status}
              onChange={(event) => onUpdateStatus(lead._id, event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {statuses.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Owner</label>
            <select
              value={lead.assignedTo || "Unassigned"}
              onChange={(event) => onUpdateAssignedTo(lead._id, event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {ASSIGNEES.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>

          {isVisitDateOpen && (
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Visit Date</label>
            <input
              type="date"
              value={formattedDate}
              onChange={(event) => onUpdateVisitDate(lead._id, event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDeleteLead(lead._id)}
          className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
        >
          Delete Lead
        </button>
      </div>
    </article>
  );
}
