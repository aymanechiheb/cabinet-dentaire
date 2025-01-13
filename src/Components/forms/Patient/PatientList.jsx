import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, removePatient } from "../../../Stores/PatientSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
import { Add, Edit, Delete, Visibility, DocumentScanner } from "@mui/icons-material";
import PatientFormModal from "./PatientformModal";

const PatientList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: patients, loading, error } = useSelector((state) => state.patients);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showModal, setShowModal] = React.useState(false);
  const [currentPatient, setCurrentPatient] = React.useState(null);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeletePatient = async (id) => {
    dispatch(removePatient(id))
      .unwrap()
      .then(() => {
        toast.success("Patient deleted successfully.");
      })
      .catch(() => {
        toast.error("Failed to delete patient.");
      });
  };

  const handleEditPatient = (patient) => {
    setCurrentPatient(patient);
    setShowModal(true);
  };

  const handleViewDocuments = (patientId) => {
    navigate(`/documents/${patientId}`, { state: { patientId } });
  };

  const handleViewPatient = (patient) => {
    toast.info(
      <div style={{ textAlign: "left" }}>
        <strong>Patient Information</strong>
        <p><strong>Name:</strong> {patient.fullname}</p>
        <p><strong>Address:</strong> {patient.adresse}</p>
        <p><strong>Phone:</strong> {patient.telephone}</p>
        <p><strong>État Civil:</strong> {patient.etatCivil}</p>
        <p><strong>CNSS:</strong> {patient.cnss}</p>
        <p><strong>Nombre d’Enfants:</strong> {patient.nombreEnfants}</p>
      </div>,
      {
        autoClose: 8000,
        pauseOnHover: true,
      }
    );
  };

  const paginatedPatients = patients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box sx={{ width: "90%", maxWidth: "1200px", padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#333", marginBottom: 3, textAlign: "center" }}>
          Patient List
        </Typography>
        

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginBottom: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              setShowModal(true);
              setCurrentPatient(null);
            }}
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Add New Patient
          </Button>
        </Stack>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>Full Name</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Phone Number</strong></TableCell>
                <TableCell><strong>CIN</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPatients.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell>{patient.fullname}</TableCell>
                  <TableCell>{patient.adresse}</TableCell>
                  <TableCell>{patient.telephone}</TableCell>
                  <TableCell>{patient.cin}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewPatient(patient)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#e0f7fa",
                          },
                        }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditPatient(patient)}
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
                        onClick={() => handleDeletePatient(patient.id)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#ffebee",
                          },
                        }}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="info"
                        onClick={() => handleViewDocuments(patient.id)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#e3f2fd",
                          },
                        }}
                      >
                        <DocumentScanner />
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
            count={patients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {showModal && (
          <PatientFormModal
            show={showModal}
            setShow={setShowModal}
            patient={currentPatient}
          />
        )}

        <ToastContainer />
      </Box>
    </Box>
  );
};

export default PatientList;