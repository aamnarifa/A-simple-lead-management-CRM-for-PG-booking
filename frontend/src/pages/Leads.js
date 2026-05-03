import React from "react";
import LeadForm from "../components/LeadForm";
import { formatDate, statusLabelStyles } from "../utils/format";

const ASSIGNEES = ["Unassigned", "Agent A", "Agent B"];

export default function Leads({ leads, loading, modalOpen, onOpenModal, onCloseModal, onCreateLead, statuses, onUpdateStatus, onUpdateAssignedTo, onUpdateVisitDate, pendingVisitLeadId }) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">All Leads</h2>
            <p className="mt-2 text-sm text-slate-500">Manage and track all your leads in one place</p>
          </div>
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Lead
          </button>
        </div>
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">Name</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Phone</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Owner</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Visit Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {leads.length ? (
                leads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-slate-900">{lead.name}</div>
                        <div className="text-sm text-slate-500">ID: {lead._id.slice(-6)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateStatus(lead._id, e.target.value)}
                          className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <span className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${statusLabelStyles[lead.status]}`}>
                          {lead.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.assignedTo || "Unassigned"}
                        onChange={(e) => onUpdateAssignedTo(lead._id, e.target.value)}
                        className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        {ASSIGNEES.map((assignee) => (
                          <option key={assignee} value={assignee}>
                            {assignee}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {lead.status === "Visit Scheduled" || pendingVisitLeadId === lead._id ? (
                        <div className="flex flex-col gap-2">
                          <input
                            type="date"
                            value={lead.visitDate ? new Date(lead.visitDate).toISOString().split("T")[0] : ""}
                            onChange={(e) => onUpdateVisitDate(lead._id, e.target.value)}
                            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                          {lead.visitDate && <span className="text-xs font-semibold text-purple-700">{formatDate(lead.visitDate)}</span>}
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    {loading ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                        <p className="text-slate-500">Loading leads...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-slate-300">
                          <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">No leads yet</h3>
                          <p className="mt-1 text-slate-500">Start by adding your first lead to get organized</p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 py-8">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Add a new lead</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Create Lead</h3>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                className="rounded-full bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <LeadForm onSubmit={onCreateLead} onClose={onCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
