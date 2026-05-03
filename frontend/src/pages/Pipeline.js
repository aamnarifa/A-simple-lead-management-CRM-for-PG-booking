import React from "react";
import PipelineColumn from "../components/PipelineColumn";

export default function Pipeline({ groupedLeads, statuses, onUpdateStatus, onUpdateVisitDate, onUpdateAssignedTo, pendingVisitLeadId }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">Pipeline</h2>
            <p className="mt-1 text-sm text-slate-500">Track ownership, stage movement, and scheduled visits in one working view.</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-h-[calc(100vh-210px)] gap-3 overflow-x-auto pb-4">
          {statuses.map((status) => (
            <PipelineColumn
              key={status}
              title={status}
              leads={groupedLeads[status] || []}
              statuses={statuses}
              onUpdateStatus={onUpdateStatus}
              onUpdateVisitDate={onUpdateVisitDate}
              onUpdateAssignedTo={onUpdateAssignedTo}
              pendingVisitLeadId={pendingVisitLeadId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
