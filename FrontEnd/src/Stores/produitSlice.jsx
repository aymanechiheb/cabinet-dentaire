import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProduitsApi,
  createProduitApi,
  updateProduitApi,
  deleteProduitApi,
} from "../services/ProduitService";

// Fetch products
export const fetchProduits = createAsyncThunk("produits/fetchAll", async () => {
  const produits = await fetchProduitsApi();
  return produits;
});

// Create product
export const addProduit = createAsyncThunk("produits/add", async (produit) => {
  const newProduit = await createProduitApi(produit);
  return newProduit;
});

// Update product
export const updateProduit = createAsyncThunk("produits/update", async (produit) => {
  const updatedProduit = await updateProduitApi(produit);
  return updatedProduit;
});

// Delete product
export const deleteProduit = createAsyncThunk("produits/delete", async (id) => {
  await deleteProduitApi(id);
  return id;
});

const produitSlice = createSlice({
  name: "produits",
  initialState: {
    produits: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduits.fulfilled, (state, action) => {
        state.loading = false;
        state.produits = action.payload;
      })
      .addCase(fetchProduits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduit.fulfilled, (state, action) => {
        state.produits.push(action.payload);
      })
      .addCase(updateProduit.fulfilled, (state, action) => {
        const index = state.produits.findIndex((p) => p.id === action.payload.id);
        state.produits[index] = action.payload;
      })
      .addCase(deleteProduit.fulfilled, (state, action) => {
        state.produits = state.produits.filter((produit) => produit.id !== action.payload);
      });
  },
});

export default produitSlice.reducer;
