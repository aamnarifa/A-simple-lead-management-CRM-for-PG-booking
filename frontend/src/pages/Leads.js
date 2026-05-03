import React from "react";
import LeadForm from "../components/LeadForm";
import { formatDate, statusLabelStyles } from "../utils/format";

const ASSIGNEES = ["Unassigned", "Agent A", "Agent B"];

export default function Leads({ leads, loading, modalOpen, onOpenModal, onCloseModal, onCreateLead, statuses, onUpdateStatus, onUpdateAssignedTo }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">All Leads</h2>
            <p className="mt-2 text-sm text-slate-500">Review and manage your full lead list from one place.</p>
          </div>
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add Lead
          </button>
        </div>
      </div>

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-4 font-medium text-slate-500">Name</th>
                <th className="px-4 py-4 font-medium text-slate-500">Phone</th>
                <th className="px-4 py-4 font-medium text-slate-500">Status</th>
                <th className="px-4 py-4 font-medium text-slate-500">Assigned To</th>
                <th className="px-4 py-4 font-medium text-slate-500">Visit Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {leads.length ? (
                leads.map((lead) => (
                  <tr key={lead._id} className="transition hover:bg-slate-50">
                    <td className="px-4 py-4 text-slate-800">{lead.name}</td>
                    <td className="px-4 py-4 text-slate-600">{lead.phone}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateStatus(lead._id, e.target.value)}
                          className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status} disabled={status === "Visit Scheduled" && !lead.visitDate}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusLabelStyles[lead.status]}`}>
                          {lead.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={lead.assignedTo || "Unassigned"}
                        onChange={(e) => onUpdateAssignedTo(lead._id, e.target.value)}
                        className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      >
                        {ASSIGNEES.map((assignee) => (
                          <option key={assignee} value={assignee}>
                            {assignee}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{lead.status === "Visit Scheduled" && lead.visitDate ? formatDate(lead.visitDate) : "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-16 text-center text-slate-500">
                    {loading ? "Loading leads..." : "No leads yet — start by adding a new lead === "Visit Scheduled" && lead.visitDate ? formatDate(lead.visitDate) : "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-16 text-center text-slate-500">
                    {loading ? "Loading leads..." : "No leads yet — start by adding a new lead."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 py-8">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Add a new lead</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Create Lead</h3>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>
            <LeadForm onSubmit={onCreateLead} onClose={onCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
