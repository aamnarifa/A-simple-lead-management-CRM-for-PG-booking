import React from "react";
import PipelineColumn from "../components/PipelineColumn";

export default function Pipeline({ groupedLeads, statuses, onUpdateStatus, onUpdateVisitDate, onUpdateAssignedTo }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Pipeline</h2>
            <p className="mt-2 text-sm text-slate-500">Drag your focus through the lead lifecycle and keep every stage visible.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 overflow-x-auto px-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        <div className="flex min-h-[calc(100vh-240px)] gap-4 overflow-x-auto pb-6">
          {statuses.map((status) => (
            <PipelineColumn
              key={status}
              title={status}
              leads={groupedLeads[status] || []}
              statuses={statuses}
              onUpdateStatus={onUpdateStatus}
              onUpdateVisitDate={onUpdateVisitDate}
              onUpdateAssignedTo={onUpdateAssignedTo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
