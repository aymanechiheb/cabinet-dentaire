// src/services/SoinService.js

const API_URL = 'http://localhost:8083/api/soins';

const getSoins = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch soins');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const createSoin = async (soin) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(soin),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to create soin');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSoin = async (id, soin) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(soin),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to update soin');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteSoin = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete soin');
    return id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const SoinService = {
  getSoins,
  createSoin,
  updateSoin,
  deleteSoin,
};
