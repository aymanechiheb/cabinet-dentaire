import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, removePatient } from "../../../Stores/PatientSlice";
import { toast, ToastContainer } from "react-toastify"; // Ensure ToastContainer is imported
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
  IconButton,
  Box,
  Toolbar,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete, Visibility, DocumentScanner, History } from "@mui/icons-material";
import PatientFormModal from "./PatientformModal";
import { createAppointment } from "../../../Stores/AppointmentSlice";
import AppointmentFormModal from "../Appointment/AppointmentFormModal";
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported

const PatientList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: patients, loading, error } = useSelector((state) => state.patients);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

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
        setToastMessage("Patient deleted successfully.");
        setOpenToast(true);
      })
      .catch(() => {
        setToastMessage("Failed to delete patient.");
        setOpenToast(true);
      });
  };

  const handleEditPatient = (patient) => {
    setCurrentPatient(patient);
    setShowPatientModal(true);
  };

  const handleViewDocuments = (patientId) => {
    navigate(`/documents/${patientId}`, { state: { patientId } });
  };

  const handleHistory = (patientId) => {
    navigate(`/appointments/patient/${patientId}`);
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
        autoClose: 8000, // Auto-close after 8 seconds
        pauseOnHover: true, // Pause on hover
        position: "top-right", // Position of the toast
        closeButton: true, // Show close button
      }
    );
  };

  const handleAddRendezvous = (patientId) => {
    setSelectedPatientId(patientId);
    setShowAppointmentModal(true);
  };

  const handleCreateAppointment = (appointmentData) => {
    dispatch(createAppointment(appointmentData))
      .unwrap()
      .then(() => {
        setToastMessage("Appointment scheduled successfully.");
        setOpenToast(true);
      })
      .catch(() => {
        setToastMessage("Failed to schedule appointment.");
        setOpenToast(true);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "" || patient.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const paginatedPatients = filteredPatients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#e3f2fd" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1565c0" }}>
            Patient Management
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
            startIcon={<Add />}
            onClick={() => {
              setShowPatientModal(true);
              setCurrentPatient(null);
            }}
          >
            Add New Patient
          </Button>
        </Toolbar>
      </Paper>

      {/* Filters */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#f3e5f5" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Search by Name, Address, Phone, or CIN"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flex: 2, backgroundColor: "#ffffff" }}
          />
          <Select
            value={filterStatus}
            onChange={handleStatusFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </Box>
      </Paper>

      {/* Patients Table */}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#e8f5e9" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#81c784" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>Full Name</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Address</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Phone Number</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>CIN</TableCell>
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
            ) : paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient) => (
                <TableRow key={patient.id} sx={{ "&:hover": { backgroundColor: "#f1f8e9" } }}>
                  <TableCell>{patient.fullname}</TableCell>
                  <TableCell>{patient.adresse}</TableCell>
                  <TableCell>{patient.telephone}</TableCell>
                  <TableCell>{patient.cin}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleViewPatient(patient)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleEditPatient(patient)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#e57373" }}
                      onClick={() => handleDeletePatient(patient.id)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#ba68c8" }}
                      onClick={() => handleViewDocuments(patient.id)}
                    >
                      <DocumentScanner />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleAddRendezvous(patient.id)}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#666" }}
                      onClick={() => handleHistory(patient.id)}
                    >
                      <History />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No patients found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredPatients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modals */}
      {showPatientModal && (
        <PatientFormModal
          show={showPatientModal}
          setShow={setShowPatientModal}
          patient={currentPatient}
        />
      )}

      {showAppointmentModal && (
        <AppointmentFormModal
          show={showAppointmentModal}
          setShow={setShowAppointmentModal}
          patientId={selectedPatientId}
          onCreateAppointment={handleCreateAppointment}
        />
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Snackbar */}
      <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
        <Alert severity="success" onClose={() => setOpenToast(false)}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientList;