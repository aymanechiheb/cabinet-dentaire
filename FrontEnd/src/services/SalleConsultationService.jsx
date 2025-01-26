import axios from 'axios';

const API_URL = 'http://localhost:9080/api/salles';

export const fetchSalles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchSalleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createSalle = async (salle) => {
  const response = await axios.post(API_URL, salle);
  return response.data;
};

export const updateSalle = async (id, salle) => {
  const response = await axios.put(`${API_URL}/${id}`, salle);
  return response.data;
};

export const deleteSalle = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
