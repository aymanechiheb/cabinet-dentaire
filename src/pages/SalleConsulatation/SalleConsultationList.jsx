import  { useEffect, useState } from "react";
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
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import SalleConsultationFormModal from "../../Components/SalleConsultation/SalleConsultationFormModal";
import { ToastContainer, toast } from "react-toastify";

const SalleConsultationList = () => {
  const dispatch = useDispatch();
  const { salles, loading, error } = useSelector((state) => state.salleConsultation);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [currentSalle, setCurrentSalle] = useState(null);

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
      .then(() => toast.success("Salle deleted successfully."))
      .catch(() => toast.error("Failed to delete salle."));
  };

  const handleEditSalle = (salle) => {
    setCurrentSalle(salle);
    setShowModal(true);
  };

  const paginatedSalles = salles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box sx={{ width: "90%", maxWidth: "1200px", padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#333", marginBottom: 3, textAlign: "center" }}>
          Salle Consultation List
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginBottom: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              setShowModal(true);
              setCurrentSalle(null);
            }}
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Add New Salle
          </Button>
        </Stack>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Numero</strong></TableCell>
                <TableCell><strong>Disponibilité</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSalles.map((salle) => (
                <TableRow key={salle.id} hover>
                  <TableCell>{salle.id}</TableCell>
                  <TableCell>{salle.numero}</TableCell>
                  <TableCell>{salle.disponibilite ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditSalle(salle)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#e8f5e9",
                          },
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(salle.id)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#ffebee",
                          },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={salles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {showModal && (
          <SalleConsultationFormModal
            show={showModal}
            setShow={setShowModal}
            salleToEdit={currentSalle}
          />
        )}

        <ToastContainer />
      </Box>
    </Box>
  );
};

export default SalleConsultationList;
