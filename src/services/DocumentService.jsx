import axios from "axios";

const API_URL = "http://localhost:8084/api/documents";


export const fetchDocuments = async (patientId) => {
  try {
    const response = await axios.get(`${API_URL}/patient/${patientId}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

export const addDocumentService = async (patientId, file) => {
  try {
    const formData = new FormData();
    formData.append("patientId", patientId);
    formData.append("file", file); // Only file and patientId are sent

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};


export const downloadDocument = async (documentId) => {
  try {
    const response = await axios.get(`${API_URL}/download/${documentId}`, {
      responseType: 'blob', // To handle binary data (file download)
    });
    return response.data; // This will contain the file content (Blob)
  } catch (error) {
    console.error("Error downloading document:", error);
    throw error;
  }
};
export const deleteDocument = async (documentId) => {
  try {
    const response = await axios.delete(`${API_URL}${documentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
