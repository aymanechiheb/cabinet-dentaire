/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduit, updateProduit } from "../../../Stores/produitSlice";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const ProduitFormModal = ({ produit, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nom: "",
    quantite: "",
    fournisseur: "",
    prixUnitaire: "",
  });

  useEffect(() => {
    if (produit) {
      setFormData({
        nom: produit.nom,
        quantite: produit.quantite,
        fournisseur: produit.fournisseur,
        prixUnitaire: produit.prixUnitaire,
      });
    }
  }, [produit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (produit) {
      dispatch(updateProduit({ ...produit, ...formData }));
    } else {
      dispatch(addProduit(formData));
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        {produit ? "Edit Product" : "Add New Product"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            style={{ borderRadius: "10px" }}
          />
          <TextField
            label="Quantity"
            name="quantite"
            value={formData.quantite}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            required
            variant="outlined"
            style={{ borderRadius: "10px" }}
          />
          <TextField
            label="Supplier"
            name="fournisseur"
            value={formData.fournisseur}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            style={{ borderRadius: "10px" }}
          />
          <TextField
            label="Unit Price"
            name="prixUnitaire"
            value={formData.prixUnitaire}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            required
            variant="outlined"
            style={{ borderRadius: "10px" }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained" style={{ borderRadius: "5px" }}>
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" style={{ borderRadius: "5px", fontWeight: "bold" }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProduitFormModal;
