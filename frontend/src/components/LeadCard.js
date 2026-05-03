import React from "react";
import { formatDate, statusLabelStyles, statusBorderStyles } from "../utils/format";

const ASSIGNEES = ["Unassigned", "Agent A", "Agent B"];

export default function LeadCard({ lead, statuses, onUpdateStatus, onUpdateVisitDate, onUpdateAssignedTo, pendingVisitLeadId }) {
  const formattedDate = lead.visitDate ? new Date(lead.visitDate).toISOString().split("T")[0] : "";
  const isVisitDateOpen = lead.status === "Visit Scheduled" || pendingVisitLeadId === lead._id;
  const statusClasses = statusLabelStyles[lead.status] || "bg-slate-100 text-slate-700 border-slate-200";
  const borderClasses = statusBorderStyles[lead.status] || "border-slate-200";

  return (
    <article className={`group relative rounded-2xl border-2 ${borderClasses} bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}>
      {/* Status indicator */}
      <div className="absolute -top-2 -right-2">
        <span className={`inline-flex rounded-full border-2 border-white px-3 py-1 text-xs font-semibold shadow-sm ${statusClasses}`}>
          {lead.status}
        </span>
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {lead.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{lead.phone}</p>
        </div>

        {/* Owner badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Owner:</span>
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {lead.assignedTo || "Unassigned"}
          </span>
        </div>

        {/* Visit date badge */}
        {lead.status === "Visit Scheduled" && lead.visitDate && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Visit:</span>
            <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-200">
              {formatDate(lead.visitDate)}
            </span>
          </div>
        )}

        {/* Controls */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600 uppercase tracking-wide">Status</label>
            <select
              value={lead.status}
              onChange={(event) => onUpdateStatus(lead._id, event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {statuses.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600 uppercase tracking-wide">Assign Owner</label>
            <select
              value={lead.assignedTo || "Unassigned"}
              onChange={(event) => onUpdateAssignedTo(lead._id, event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {ASSIGNEES.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>

          {isVisitDateOpen && (
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600 uppercase tracking-wide">Visit Date</label>
            <input
              type="date"
              value={formattedDate}
              onChange={(event) => onUpdateVisitDate(lead._id, event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          )}
        </div>
      </div>
    </article>
  );
}
