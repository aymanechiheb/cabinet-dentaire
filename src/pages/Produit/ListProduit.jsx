import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduits, deleteProduit } from "../../Stores/produitSlice";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Snackbar, Alert } from "@mui/material";
import ProduitFormModal from "../../Components/forms/Produit/ProduitFormModal";

const ListProduit = () => {
  const dispatch = useDispatch();
  const { produits, loading, error } = useSelector((state) => state.produits);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduit, setCurrentProduit] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  const handleEdit = (produit) => {
    setCurrentProduit(produit);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduit(id))
      .then(() => {
        setToastMessage("Product deleted successfully!");
        setOpenToast(true);
      })
      .catch(() => {
        setToastMessage("Error deleting product.");
        setOpenToast(true);
      });
  };

  const handleAddNew = () => {
    setCurrentProduit(null);
    setModalOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddNew} style={{ marginBottom: "0px", borderRadius: "10px", fontWeight: "bold" }}>
        Add New Product
      </Button>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error" variant="h6">Error: {error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Supplier</strong></TableCell>
                <TableCell><strong>Unit Price</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produits.map((produit) => (
                <TableRow key={produit.id}>
                  <TableCell>{produit.nom}</TableCell>
                  <TableCell>{produit.quantite}</TableCell>
                  <TableCell>{produit.fournisseur}</TableCell>
                  <TableCell>{produit.prixUnitaire}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(produit)} style={{ marginRight: "10px", borderRadius: "5px", fontWeight: "bold" }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(produit.id)} style={{ borderRadius: "5px", fontWeight: "bold" }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {modalOpen && (
        <ProduitFormModal
          produit={currentProduit}
          onClose={() => setModalOpen(false)}
        />
      )}

      <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
        <Alert severity="success">{toastMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default ListProduit;
