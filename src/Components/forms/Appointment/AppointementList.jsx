/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, fetchAppointmentsByPatient, fetchAppointmentsByUser } from "../../../Stores/AppointmentSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate,useLocation,useParams  } from "react-router-dom";
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
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import AppointmentFormModal from "../Appointment/AppointmentFormModal";

const RendezvousListComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientId,userId } = useParams();  

  console.log("Received patientId:", patientId)
  const { appointments, loading, error } = useSelector((state) => state.appointments);
  const users = useSelector((state) => state.users.users);
  const patients = useSelector((state) => state.patients.list);
  console.log("Received patientId:", patientId); // Vérifier que patientId est bien récupéré

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (patientId) {
      console.log("Fetching appointments for patient:", patientId);

      dispatch(fetchAppointmentsByPatient(patientId)); // Fetch by patientId
    } else if (userId) {
      dispatch(fetchAppointmentsByUser(userId)); // Fetch by userId
    } else {
      dispatch(fetchAppointments()); // Fetch all appointments
    }
  }, [dispatch, patientId, userId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

  const paginatedAppointments = appointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box sx={{ width: "90%", maxWidth: "1200px", padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#333", marginBottom: 3, textAlign: "center" }}>
          Liste des Rendez-vous
        </Typography>

        {loading && <Typography>Chargement...</Typography>}
        {error && <Typography color="error">Erreur: {error}</Typography>}

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>Date & Heure</strong></TableCell>
                <TableCell><strong>Statut</strong></TableCell>
                <TableCell><strong>Motif</strong></TableCell>
                <TableCell><strong>Notes</strong></TableCell>
                <TableCell><strong>Doctor</strong></TableCell>
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
                        sx={{ "&:hover": { backgroundColor: "#e0f7fa" } }}
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
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={appointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

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
