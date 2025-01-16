/* eslint-disable no-useless-catch */
import axios from "axios";

// API base URL
const API_URL = "http://localhost:8084/api/patients";

// Function to fetch all patients
export const getPatients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPatientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Function to create a new patient
export const createPatient = async (patient) => {
  try {
    const response = await axios.post(API_URL, patient);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update a patient's information
export const updatePatient = async (id, patient) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, patient);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a patient
export const deletePatient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
