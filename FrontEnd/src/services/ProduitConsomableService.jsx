import axios from "axios";

const API_URL = "http://localhost:8088/api/cproducts";

const ProduitConsomableService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  getByAppointmentId: async (appointmentId) => {
    const response = await axios.get(`${API_URL}/appointment/${appointmentId}`);
    return response.data;
  },

  create: async (produit) => {
    const response = await axios.post(`${API_URL}`, produit);
    return response.data;
  },

  update: async (id, produit) => {
    const response = await axios.put(`${API_URL}/${id}`, produit);
    return response.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

export default ProduitConsomableService;
