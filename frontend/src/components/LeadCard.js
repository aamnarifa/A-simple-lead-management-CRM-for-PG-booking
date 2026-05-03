import React from "react";
import { formatDate, statusLabelStyles, statusBorderStyles } from "../utils/format";

const ASSIGNEES = ["Unassigned", "Agent A", "Agent B"];

export default function LeadCard({ lead, statuses, onUpdateStatus, onUpdateVisitDate, onUpdateAssignedTo, pendingVisitLeadId }) {
  const formattedDate = lead.visitDate ? new Date(lead.visitDate).toISOString().split("T")[0] : "";
  const isVisitDateOpen = lead.status === "Visit Scheduled" || pendingVisitLeadId === lead._id;
  const statusClasses = statusLabelStyles[lead.status] || "bg-slate-100 text-slate-700 border-slate-200";
  const borderClasses = statusBorderStyles[lead.status] || "border-slate-200";

  return (
    <article className={`group relative rounded-[10px] border ${borderClasses} bg-white p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md`}>
      {/* Status indicator */}
      <div className="absolute right-3 top-3">
        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm ${statusClasses}`}>
          {lead.status}
        </span>
      </div>

      <div className="space-y-3 pr-2">
        <div className="pr-24">
          <h3 className="text-base font-bold text-slate-950 transition-colors group-hover:text-blue-700">
            {lead.name}
          </h3>
          <p className="mt-0.5 text-sm text-slate-500">{lead.phone}</p>
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

        <div className="space-y-2 border-t border-slate-100 pt-3">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600">Status</label>
            <select
              value={lead.status}
              onChange={(event) => onUpdateStatus(lead._id, event.target.value)}
              className="w-full rounded-[10px] border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              className="w-full rounded-[10px] border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              className="w-full rounded-[10px] border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          )}
        </div>
      </div>
    </article>
  );
}
