import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://pg-crm-backend.onrender.com/api",
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
  const response = await client.patch(`/leads/${id}`, updates);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await client.delete(`/leads/${id}`);
  return response.data;
};
