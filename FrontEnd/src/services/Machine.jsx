import axios from "axios";

const BASE_URL = "http://localhost:9080/api/machines";

// Fetch all machines
export const fetchAllMachines = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Fetch a machine by ID
export const fetchMachineById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Create a new machine
export const createMachine = async (machineData) => {
  const response = await axios.post(BASE_URL, machineData);
  return response.data;
};

// Update an existing machine
export const updateMachine = async (id, machineData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, machineData);
  return response.data;
};

// Delete a machine
export const deleteMachine = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};


