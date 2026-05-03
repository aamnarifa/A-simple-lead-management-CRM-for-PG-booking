import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";
import Toast from "./components/Toast";
import { createLead, getLeads, updateLead } from "./services/api";

const STATUS_OPTIONS = ["New", "Contacted", "Visit Scheduled", "Converted", "Lost"];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [pendingVisitLeadId, setPendingVisitLeadId] = useState("");

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      setErrorMessage("Unable to load leads from the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const groupedLeads = useMemo(() => {
    const groups = STATUS_OPTIONS.reduce((acc, status) => {
      acc[status] = [];
      return acc;
    }, {});

    leads.forEach((lead) => {
      const key = STATUS_OPTIONS.includes(lead.status) ? lead.status : "New";
      groups[key].push(lead);
    });

    return groups;
  }, [leads]);

  const handleCreateLead = useCallback(async (leadData) => {
    setErrorMessage("");
    setValidationMessage("");

    try {
      const savedLead = await createLead(leadData);
      setLeads((prev) => [savedLead, ...prev]);
      setModalOpen(false);
      showToast("Lead added");
    } catch (error) {
      console.error("Failed to create lead:", error);
      setErrorMessage(error.response?.data?.error || "Unable to add new lead. Please try again.");
    }
  }, [showToast]);

  const updateLeadInState = useCallback((id, updater) => {
    setLeads((prev) => prev.map((lead) => (lead._id === id ? updater(lead) : lead)));
  }, []);

  const patchLeadGlobally = useCallback(async (id, updates, successMessage, optimisticUpdates = updates) => {
    const previousLeads = leads;
    setErrorMessage("");
    updateLeadInState(id, (lead) => ({ ...lead, ...optimisticUpdates }));

    try {
      const updatedLead = await updateLead(id, updates);
      updateLeadInState(id, () => updatedLead);
      showToast(successMessage);
      return updatedLead;
    } catch (error) {
      console.error("Failed to update lead:", error);
      setLeads(previousLeads);
      setErrorMessage(error.response?.data?.error || "Unable to update lead. Please try again.");
      throw error;
    }
  }, [leads, showToast, updateLeadInState]);

  const handleStatusChange = useCallback(async (id, status) => {
    if (status === "Visit Scheduled") {
      setPendingVisitLeadId(id);
      showToast("Pick a visit date to schedule");
      return;
    }

    try {
      await patchLeadGlobally(id, { status }, "Lead updated", { status, visitDate: null });
      setPendingVisitLeadId((current) => (current === id ? "" : current));
    } catch {
      return null;
    }
  }, [patchLeadGlobally, showToast]);

  const handleVisitDateChange = useCallback(async (id, visitDate) => {
    if (!visitDate) {
      setPendingVisitLeadId((current) => (current === id ? "" : current));
      return;
    }

    try {
      await patchLeadGlobally(id, { visitDate }, "Visit scheduled", { visitDate, status: "Visit Scheduled" });
      setPendingVisitLeadId("");
    } catch {
      return null;
    }
  }, [patchLeadGlobally]);

  const handleAssignChange = useCallback(async (id, assignedTo) => {
    try {
      await patchLeadGlobally(id, { assignedTo }, "Lead updated", { assignedTo });
    } catch {
      return null;
    }
  }, [patchLeadGlobally]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar currentPage={page} onChangePage={setPage} />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {errorMessage && (
          <div className="mb-4 rounded-[10px] border border-red-200 bg-red-50 p-3 text-sm text-red-700 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-red-500">!</span>
              {errorMessage}
            </div>
          </div>
        )}
        {validationMessage && (
          <div className="mb-4 rounded-[10px] border border-orange-200 bg-orange-50 p-3 text-sm text-orange-700 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">i</span>
              {validationMessage}
            </div>
          </div>
        )}

        {page === "Dashboard" && <Dashboard leads={leads} loading={loading} />}
        {page === "Leads" && (
          <Leads
            leads={leads}
            loading={loading}
            modalOpen={modalOpen}
            onOpenModal={() => setModalOpen(true)}
            onCloseModal={() => setModalOpen(false)}
            onCreateLead={handleCreateLead}
            statuses={STATUS_OPTIONS}
            onUpdateStatus={handleStatusChange}
            onUpdateAssignedTo={handleAssignChange}
            onUpdateVisitDate={handleVisitDateChange}
            pendingVisitLeadId={pendingVisitLeadId}
          />
        )}
        {page === "Pipeline" && (
          <Pipeline
            groupedLeads={groupedLeads}
            statuses={STATUS_OPTIONS}
            onUpdateStatus={handleStatusChange}
            onUpdateVisitDate={handleVisitDateChange}
            onUpdateAssignedTo={handleAssignChange}
            pendingVisitLeadId={pendingVisitLeadId}
          />
        )}
      </main>

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}

export default App;
