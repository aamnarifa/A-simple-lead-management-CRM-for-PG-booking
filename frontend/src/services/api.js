import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000/api",
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
