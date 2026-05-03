import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";
import Toast from "./components/Toast";
import { createLead, getLeads, updateLead } from "./services/api";

const STATUS_OPTIONS = ["New", "Contacted", "Visit Scheduled", "Converted", "Lost"];
const DEFAULT_ASSIGNEE = "Unassigned";

function App() {
  const [page, setPage] = useState("Dashboard");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const normalizeLead = (lead) => {
    const normalized = { ...lead };
    normalized.assignedTo = normalized.assignedTo || DEFAULT_ASSIGNEE;

    if (normalized.visitDate && normalized.status !== "Visit Scheduled") {
      normalized.status = "Visit Scheduled";
    }

    if (normalized.status === "Visit Scheduled" && !normalized.visitDate) {
      normalized.status = "New";
      normalized.visitDate = null;
    }

    if (normalized.status !== "Visit Scheduled" && normalized.visitDate) {
      normalized.visitDate = null;
    }

    return normalized;
  };

  const showToast = (message) => {
    setToastMessage(message);
  };

  const fetchLeads = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await getLeads();
      setLeads(data.map(normalizeLead));
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to load leads from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

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

  const handleCreateLead = async (leadData) => {
    setErrorMessage("");
    setValidationMessage("");
    const tempId = `temp-${Date.now()}`;
    const temporaryLead = {
      _id: tempId,
      ...leadData,
      status: "New",
      assignedTo: DEFAULT_ASSIGNEE,
      visitDate: null,
    };

    setLeads((prev) => [temporaryLead, ...prev]);
    setModalOpen(false);

    try {
      const savedLead = await createLead({ ...leadData, assignedTo: DEFAULT_ASSIGNEE });
      setLeads((prev) => prev.map((lead) => (lead._id === tempId ? normalizeLead(savedLead) : lead)));
      showToast("Lead added");
    } catch (error) {
      console.error(error);
      setLeads((prev) => prev.filter((lead) => lead._id !== tempId));
      setErrorMessage("Unable to add new lead. Please try again.");
    }
  };

  const updateLeadField = async (id, updates, toastText) => {
    const lead = leads.find((item) => item._id === id);
    if (!lead) return;

    const nextLead = normalizeLead({ ...lead, ...updates });
    setLeads((prev) => prev.map((item) => (item._id === id ? nextLead : item)));
    setErrorMessage("");
    setValidationMessage("");

    try {
      await updateLead(id, {
        status: nextLead.status,
        visitDate: nextLead.visitDate,
        assignedTo: nextLead.assignedTo,
      });
      if (toastText) showToast(toastText);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to save changes. Refreshing data.");
      fetchLeads();
    }
  };

  const handleStatusChange = (id, status) => {
    const lead = leads.find((item) => item._id === id);
    if (!lead) return;

    if (status === "Visit Scheduled" && !lead.visitDate) {
      setValidationMessage("Please select a visit date before setting this status.");
      return;
    }

    const updates = { status };
    if (status !== "Visit Scheduled" && lead.visitDate) {
      updates.visitDate = null;
    }

    setValidationMessage("");
    updateLeadField(id, updates, "Status updated");
  };

  const handleVisitDateChange = (id, visitDate) => {
    const lead = leads.find((item) => item._id === id);
    if (!lead) return;

    const updates = { visitDate: visitDate || null };
    if (visitDate) {
      updates.status = "Visit Scheduled";
    } else if (lead.status === "Visit Scheduled") {
      updates.status = "New";
    }

    updateLeadField(id, updates, visitDate ? "Visit scheduled" : "Visit date cleared");
  };

  const handleAssignChange = (id, assignedTo) => {
    updateLeadField(id, { assignedTo }, "Owner updated");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar currentPage={page} onChangePage={setPage} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {errorMessage && (
          <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 shadow-sm">
            {errorMessage}
          </div>
        )}
        {validationMessage && (
          <div className="mb-6 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 shadow-sm">
            {validationMessage}
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
          />
        )}
        {page === "Pipeline" && (
          <Pipeline
            groupedLeads={groupedLeads}
            statuses={STATUS_OPTIONS}
            onUpdateStatus={handleStatusChange}
            onUpdateVisitDate={handleVisitDateChange}
            onUpdateAssignedTo={handleAssignChange}
          />
        )}
      </main>

      <Toast message={toastMessage} onClose={() => setToastMessage("")} /onUpdateAssignedTo={handleAssignChange}
          />
        )}
        {page === "Pipeline" && (
          <Pipeline
            groupedLeads={groupedLeads}
            statuses={STATUS_OPTIONS}
            onUpdateStatus={handleStatusChange}
            onUpdateVisitDate={handleVisitDateChange}
            onUpdateAssignedTo={handleAssignChange}
          />
        )}
      </main>

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}

export default App;
