// src/services/AppointmentService.js
import axios from "axios";

const API_URL = "http://localhost:8088/api/appointments/"; // Your base URL

const createAppointment = async (appointmentData) => {
  const response = await axios.post(API_URL, appointmentData);
  return response.data;
};

const updateAppointment = async (appointmentId, appointmentData) => {
  const response = await axios.put(`${API_URL}${appointmentId}`, appointmentData);
  return response.data;
};

const deleteAppointment = async (appointmentId) => {
  await axios.delete(`${API_URL}${appointmentId}`);
};

const fetchAppointments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const fetchAppointmentById = async (appointmentId) => {
  const response = await axios.get(`${API_URL}${appointmentId}`);
  return response.data;
};
const fetchAppointmentsByUser = async (userId) => {
  const response = await axios.get(`${API_URL}appointmentByUser/${userId}`);
  return response.data;
};

const fetchAppointmentsByPatient = async (patientId) => {
  const response = await axios.get(`${API_URL}appointmentByPatient/${patientId}`);
  return response.data;
};

const AppointmentService = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  fetchAppointments,
  fetchAppointmentById,fetchAppointmentsByPatient,
  fetchAppointmentsByUser

};

export default AppointmentService;
