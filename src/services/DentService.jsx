// src/services/DentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8083/api/dents'; 

// Get all dents
const getAllDents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching dents:", error);
    throw error;
  }
};

// Get a dent by ID
const getDentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching dent with ID ${id}:`, error);
    throw error;
  }
};

// Create a new dent
const createDent = async (dent) => {
  try {
    const response = await axios.post(API_URL, dent);
    return response.data;
  } catch (error) {
    console.error("Error creating dent:", error);
    throw error;
  }
};

// Update a dent
const updateDent = async (id, dent) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, dent);
    return response.data;
  } catch (error) {
    console.error(`Error updating dent with ID ${id}:`, error);
    throw error;
  }
};

// Delete a dent
const deleteDent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting dent with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAllDents,
  getDentById,
  createDent,
  updateDent,
  deleteDent
};
