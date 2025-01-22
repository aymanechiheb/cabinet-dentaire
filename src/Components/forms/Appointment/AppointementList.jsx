/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, fetchAppointmentsByPatient, fetchAppointmentsByUser } from "../../../Stores/AppointmentSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, InputAdornment, CircularProgress, Alert } from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  Typography,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import { Add, Edit, Delete, Visibility, Info, Search } from "@mui/icons-material";
import AppointmentFormModal from "../Appointment/AppointmentFormModal";
import "react-toastify/dist/ReactToastify.css";

const RendezvousListComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId, userId } = useParams();

  const { appointments, loading, error } = useSelector((state) => state.appointments);
  const users = useSelector((state) => state.users.users);
  const patients = useSelector((state) => state.patients.list);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (patientId) {
      dispatch(fetchAppointmentsByPatient(patientId));
    } else if (userId) {
      dispatch(fetchAppointmentsByUser(userId));
    } else {
      dispatch(fetchAppointments());
    }
  }, [dispatch, patientId, userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNavigateToDetails = (appointmentId, doctorName, patientName) => {
    navigate(`/rendezvous/details/${appointmentId}`, {
      state: { doctorName, patientName },
    });
  };
  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateAppointment = (appointmentData) => {
    dispatch(appointmentData)
      .unwrap()
      .then(() => {
        toast.success("Rendez-vous ajouté avec succès.");
      })
      .catch(() => {
        toast.error("Échec de l'ajout du rendez-vous.");
      });
  };

  const handleViewAppointment = (appointment) => {
    toast.info(
      <div style={{ textAlign: "left" }}>
        <strong>Rendez-vous Information</strong>
        <p><strong>Date:</strong> {new Date(appointment.startDateTime).toLocaleString()}</p>
        <p><strong>Statut:</strong> {appointment.status}</p>
        <p><strong>Motif:</strong> {appointment.motif}</p>
        <p><strong>Notes:</strong> {appointment.notes}</p>
      </div>,
      {
        autoClose: 8000,
        pauseOnHover: true,
      }
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName = users.find((user) => user.id === appointment.idUser)?.name || "";
    const patientName = patients.find((patient) => patient.id === appointment.idPatient)?.fullname || "";
    return (
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginatedAppointments = filteredAppointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: 4,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#333",
            marginBottom: 3,
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Liste des Rendez-vous
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher par médecin ou patient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            marginBottom: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 5 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Date & Heure</strong></TableCell>
                  <TableCell><strong>Statut</strong></TableCell>
                  <TableCell><strong>Motif</strong></TableCell>
                  <TableCell><strong>Notes</strong></TableCell>
                  <TableCell><strong>Docteur</strong></TableCell>
                  <TableCell><strong>Patient</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedAppointments.map((appointment) => (
                  <TableRow key={appointment.id} hover>
                    <TableCell>{new Date(appointment.startDateTime).toLocaleString()}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>{appointment.motif}</TableCell>
                    <TableCell>{appointment.notes}</TableCell>
                    <TableCell>{users.find((user) => user.id === appointment.idUser)?.name || "Utilisateur inconnu"}</TableCell>
                    <TableCell>{patients.find((patient) => patient.id === appointment.idPatient)?.fullname || "Patient inconnu"}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          color="primary"
                          onClick={() => handleViewAppointment(appointment)}
                          sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowAppointmentModal(true);
                          }}
                          sx={{ "&:hover": { backgroundColor: "#e8f5e9" } }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => (appointment.id)}
                          sx={{ "&:hover": { backgroundColor: "#ffebee" } }}
                        >
                          <Delete />
                        </IconButton>
                        <Button
  variant="contained"
  color="info"
  size="small"
  startIcon={<Info />}
  onClick={() =>
    handleNavigateToDetails(
      appointment.id,
      users.find((user) => user.id === appointment.idUser)?.name || "Utilisateur inconnu",
      patients.find((patient) => patient.id === appointment.idPatient)?.fullname || "Patient inconnu"
    )
  }
>
  Détails
</Button>

                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredAppointments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}

        {showAppointmentModal && (
          <AppointmentFormModal
            show={showAppointmentModal}
            setShow={setShowAppointmentModal}
            appointment={selectedAppointment}
            onCreateAppointment={handleCreateAppointment}
          />
        )}

        <ToastContainer />
      </Box>
    </Box>
  );
};

export default RendezvousListComponent;
