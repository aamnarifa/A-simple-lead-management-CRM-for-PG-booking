import axios from "axios";

const client = axios.create({
  baseURL: "https://pg-crm-backend.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export const getLeads = async () => {
  const response = await client.get("/leads");
  return response.data;
};

export const createLead = async (lead) => {
  const response = await client.post("/leads", lead);
  return response.data;
};

export const updateLead = async (id, updates) => {
  const response = await client.put(`/leads/${id}`, updates);
  return response.data;
};
