// src/services/PCareService.js
import axios from "axios";

const API_URL = "http://localhost:8088/api/pcare/";

const createPCare = async (pcareData) => {
  const response = await axios.post(API_URL, pcareData);
  console.log("📡 Réponse API après ajout:", response.data); // Ajout du log

  return response.data;
};

const updatePCare = async (pcareId, pcareData) => {
  const response = await axios.put(`${API_URL}${pcareId}`, pcareData);
  return response.data;
};

const deletePCare = async (pcareId) => {
  await axios.delete(`${API_URL}${pcareId}`);
};

const fetchPCares = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const fetchPCareById = async (pcareId) => {
  const response = await axios.get(`${API_URL}${pcareId}`);
  return response.data;
};

const fetchPCareByFacture = async (factureId) => {
  const response = await axios.get(`${API_URL}search-by-facture/${factureId}`);
  return response.data;
};

const fetchPCareByAppointment = async (appointmentId) => {
  const response = await axios.get(`${API_URL}appointment/${appointmentId}`);
  return response.data;
};
const PCareService = {
  createPCare,
  updatePCare,
  deletePCare,
  fetchPCares,
  fetchPCareById,
  fetchPCareByFacture,
  fetchPCareByAppointment
};

export default PCareService;
