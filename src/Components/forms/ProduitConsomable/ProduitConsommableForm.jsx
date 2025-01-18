/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduitConsomable } from "../../../Stores/produitConsomableSlice";
import { fetchProduits } from "../../../Stores/produitSlice"; // Import action to fetch products
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const ProduitConsommableForm = ({ appointmentId, onProduitAdded }) => {
  const dispatch = useDispatch();
  const { produits, loading, error } = useSelector((state) => state.produits); // Get products from the store
  const [formData, setFormData] = useState({ idProduct: "", qte: "" });

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProduits()); // Fetch products when the component is mounted
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.idProduct || !formData.qte) {
      toast.error("Tous les champs sont obligatoires !");
      return;
    }

    dispatch(createProduitConsomable({ ...formData, appointmentId }))
      .unwrap()
      .then(() => {
        toast.success("Produit ajouté avec succès !");
        onProduitAdded(); // Call the callback to notify parent
      })
      .catch(() => toast.error("Erreur lors de l'ajout du produit."));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      {/* Product Select Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Produit</InputLabel>
        <Select
          label="Produit"
          name="idProduct"
          value={formData.idProduct}
          onChange={handleChange}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : error ? (
            <MenuItem disabled>Erreur lors du chargement des produits</MenuItem>
          ) : produits?.length > 0 ? (
            produits.map((produit) => (
              <MenuItem key={produit.id} value={produit.id}>
                {produit.nom}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Aucun produit trouvé</MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Quantity Input */}
      <TextField
        fullWidth
        label="Quantité"
        name="qte"
        value={formData.qte}
        onChange={handleChange}
        type="number"
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Ajouter Produit
      </Button>
    </Box>
  );
};

export default ProduitConsommableForm;
