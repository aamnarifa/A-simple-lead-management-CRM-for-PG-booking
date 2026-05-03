import React from "react";
import LeadCard from "./LeadCard";

export default function PipelineColumn({ title, leads, statuses, onUpdateStatus, onUpdateVisitDate, onUpdateAssignedTo }) {
  return (
    <section className="min-w-[300px] rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">{title} <span className="text-sm text-slate-500">({leads.length})</span></h2>
      </div>
      <div className="space-y-4">
        {leads.length ? (
          leads.map((lead) => (
            <LeadCard
              key={lead._id}
              lead={lead}
              statuses={statuses}
              onUpdateStatus={onUpdateStatus}
              onUpdateVisitDate={onUpdateVisitDate}
              onUpdateAssignedTo={onUpdateAssignedTo}
            />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            No leads yet — add a lead to get started.
          </div>
        )}
      </div>
    </section>
  );
}
