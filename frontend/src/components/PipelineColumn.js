import React from "react";
import LeadCard from "./LeadCard";
import { statusDotStyles } from "../utils/format";

export default function PipelineColumn({ title, leads, statuses, onUpdateStatus, onUpdateVisitDate, onUpdateAssignedTo, pendingVisitLeadId }) {
  return (
    <section className="min-w-[300px] rounded-[10px] border border-slate-200 bg-slate-50/80 p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">{title}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{leads.length} lead{leads.length !== 1 ? 's' : ''}</p>
        </div>
        <div className={`h-3 w-3 rounded-full ${statusDotStyles[title] || "bg-slate-300"}`}></div>
      </div>

      <div className="space-y-3">
        {leads.length ? (
          leads.map((lead) => (
            <LeadCard
              key={lead._id}
              lead={lead}
              statuses={statuses}
              onUpdateStatus={onUpdateStatus}
              onUpdateVisitDate={onUpdateVisitDate}
              onUpdateAssignedTo={onUpdateAssignedTo}
              pendingVisitLeadId={pendingVisitLeadId}
            />
          ))
        ) : (
          <div className="rounded-[10px] border border-dashed border-slate-300 bg-white p-6 text-center">
            <div className="text-slate-400">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-sm font-medium text-slate-900">No leads yet</h3>
            <p className="mt-1 text-sm text-slate-500">Leads in this stage will appear here</p>
          </div>
        )}
      </div>
    </section>
  );
}
