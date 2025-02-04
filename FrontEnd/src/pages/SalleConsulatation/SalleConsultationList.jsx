import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalles, removeSalle } from "../../Stores/salleConsultationSlice";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Paper,
  Typography,
  IconButton,
  Box,
  Toolbar,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import SalleConsultationFormModal from "../../Components/SalleConsultation/SalleConsultationFormModal";

const SalleConsultationList = () => {
  const dispatch = useDispatch();
  const { salles, loading, error } = useSelector((state) => state.salleConsultation);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [currentSalle, setCurrentSalle] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDisponibilite, setFilterDisponibilite] = useState("");

  useEffect(() => {
    dispatch(getSalles());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    dispatch(removeSalle(id))
      .unwrap()
      .then(() => {
        setToastMessage("Salle deleted successfully.");
        setOpenToast(true);
        dispatch(getSalles());
      })
      .catch(() => {
        setToastMessage("Failed to delete salle.");
        setOpenToast(true);
      });
  };

  const handleEditSalle = (salle) => {
    setCurrentSalle(salle);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setCurrentSalle(null);
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDisponibiliteFilterChange = (e) => {
    setFilterDisponibilite(e.target.value);
  };

  const filteredSalles = salles.filter((salle) => {
    const matchesSearch =
      salle.numero.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDisponibilite =
      filterDisponibilite === "" ||
      salle.disponibilite === (filterDisponibilite === "available");

    return matchesSearch && matchesDisponibilite;
  });

  const paginatedSalles = filteredSalles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#e3f2fd" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1565c0" }}>
            Salle Consultation Management
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
            startIcon={<Add />}
            onClick={handleAddNew}
          >
            Add New Salle
          </Button>
        </Toolbar>
      </Paper>

      {/* Filters */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#f3e5f5" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Search by Numero"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flex: 2, backgroundColor: "#ffffff" }}
          />
          <Select
            value={filterDisponibilite}
            onChange={handleDisponibiliteFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="unavailable">Unavailable</MenuItem>
          </Select>
        </Box>
      </Paper>

      {/* Salle Table */}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#e8f5e9" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#81c784" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>ID</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Numero</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Disponibilité</TableCell>
              <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4}>Error: {error}</TableCell>
              </TableRow>
            ) : paginatedSalles.length > 0 ? (
              paginatedSalles.map((salle) => (
                <TableRow key={salle.id} sx={{ "&:hover": { backgroundColor: "#f1f8e9" } }}>
                  <TableCell>{salle.id}</TableCell>
                  <TableCell>{salle.numero}</TableCell>
                  <TableCell>{salle.disponibilite ? "Yes" : "No"}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleEditSalle(salle)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#e57373" }}
                      onClick={() => handleDelete(salle.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No salles found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredSalles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal */}
      {showModal && (
        <SalleConsultationFormModal
          show={showModal}
          setShow={setShowModal}
          salleToEdit={currentSalle}
          onSuccess={() => dispatch(getSalles())}
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

export default SalleConsultationList;