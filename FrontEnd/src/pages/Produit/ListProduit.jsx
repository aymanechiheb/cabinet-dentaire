import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduits, deleteProduit } from "../../Stores/produitSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  TextField,
  Box,
  IconButton,
  Toolbar,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProduitFormModal from "../../Components/forms/Produit/ProduitFormModal";

const ListProduit = () => {
  const dispatch = useDispatch();
  const { produits, loading, error } = useSelector((state) => state.produits);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduit, setCurrentProduit] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSupplier, setFilterSupplier] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSupplierFilterChange = (e) => {
    setFilterSupplier(e.target.value);
  };

  const filteredProduits = produits.filter((produit) => {
    const matchesSearch =
      produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produit.fournisseur.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSupplier =
      filterSupplier === "" || produit.fournisseur === filterSupplier;

    return matchesSearch && matchesSupplier;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProduits = filteredProduits.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#e3f2fd" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1565c0" }}>
            Product Management
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
            onClick={handleAddNew}
          >
            Add New Product
          </Button>
        </Toolbar>
      </Paper>

      {/* Filters */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#f3e5f5" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Search by Name or Supplier"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleFilterChange}
            sx={{ flex: 2, backgroundColor: "#ffffff" }}
          />
          <Select
            value={filterSupplier}
            onChange={handleSupplierFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All Suppliers</MenuItem>
            {[...new Set(produits.map((produit) => produit.fournisseur))].map((supplier) => (
              <MenuItem key={supplier} value={supplier}>
                {supplier}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Paper>

      {/* Product Table */}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#e8f5e9" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#81c784" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>Name</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Quantity</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Supplier</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Unit Price</TableCell>
              <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5}>Error: {error}</TableCell>
              </TableRow>
            ) : paginatedProduits.length > 0 ? (
              paginatedProduits.map((produit) => (
                <TableRow key={produit.id} sx={{ "&:hover": { backgroundColor: "#f1f8e9" } }}>
                  <TableCell>{produit.nom}</TableCell>
                  <TableCell>{produit.quantite}</TableCell>
                  <TableCell>{produit.fournisseur}</TableCell>
                  <TableCell>{produit.prixUnitaire}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleEdit(produit)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#e57373" }}
                      onClick={() => handleDelete(produit.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No products found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredProduits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal */}
      {modalOpen && (
        <ProduitFormModal
          produit={currentProduit}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Snackbar */}
      <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
        <Alert severity="success" onClose={() => setOpenToast(false)}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListProduit;