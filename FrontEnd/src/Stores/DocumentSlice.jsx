/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  fetchDocuments as fetchDocumentsService, 
  addDocumentService as addDocumentService, 
  downloadDocument as downloadDocumentService, 
  deleteDocument as deleteDocumentService // Import the delete service
} from "../services/DocumentService";

// Async action for downloading a document
export const downloadDocument = createAsyncThunk(
  "documents/downloadDocument",
  async (documentId) => {
    const response = await downloadDocumentService(documentId);
    return response;
  }
);

// Async action for fetching documents by patientId
export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async (patientId) => {
    const response = await fetchDocumentsService(patientId);
    return response;
  }
);

// Async action for adding a new document
export const addDocument = createAsyncThunk(
  "documents/addDocument",
  async ({ patientId, file }, { rejectWithValue }) => {
    try {
      // Call the service to handle the API request
      const response = await addDocumentService(patientId, file); // Passing only patientId and file
      return response.data; // Ensure only the data part is returned
    } catch (error) {
      // Handle errors and reject with a value for better error feedback
      return rejectWithValue(
        error.response?.data || "An error occurred while adding the document."
      );
    }
  }
);



// Async action for deleting a document
export const deleteDocument = createAsyncThunk(
  "documents/deleteDocument",
  async (documentId) => {
    const response = await deleteDocumentService(documentId); // Call the delete service
    return documentId; // Return the ID of the deleted document
  }
);

const documentSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
      })
      .addCase(addDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(downloadDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(downloadDocument.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter(
          (document) => document.id !== action.payload
        );
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default documentSlice.reducer;
