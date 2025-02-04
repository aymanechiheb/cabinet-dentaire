import axios from "axios";

const API_URL = "http://localhost:9080/api/produits";

export const fetchProduitsApi = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduitApi = async (produit) => {
  const response = await axios.post(API_URL, produit);
  return response.data;
};

export const updateProduitApi = async (produit) => {
  const response = await axios.put(`${API_URL}/${produit.id}`, produit);
  return response.data;
};

export const deleteProduitApi = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
