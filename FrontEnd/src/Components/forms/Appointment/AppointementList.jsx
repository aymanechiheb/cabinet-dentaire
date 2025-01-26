import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments, fetchAppointmentsByPatient, fetchAppointmentsByUser } from "../../../Stores/AppointmentSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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
import { Add, Edit, Delete, Visibility, Info, Search, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import AppointmentFormModal from "../Appointment/AppointmentFormModal";

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
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateAppointment = (appointmentData) => {
    dispatch(appointmentData)
      .unwrap()
      .then(() => {
        setToastMessage("Rendez-vous ajouté avec succès.");
        setOpenToast(true);
      })
      .catch(() => {
        setToastMessage("Échec de l'ajout du rendez-vous.");
        setOpenToast(true);
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

  const handleNavigateToDetails = (appointmentId, doctorName, patientName) => {
    navigate(`/rendezvous/details/${appointmentId}`, {
      state: { doctorName, patientName },
    });
  };

  const handleSortByDate = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const doctorName = users.find((user) => user.id === appointment.idUser)?.name || "";
    const patientName = patients.find((patient) => patient.id === appointment.idPatient)?.fullname || "";
    const matchesSearch =
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "" || appointment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.startDateTime).getTime();
    const dateB = new Date(b.startDateTime).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const paginatedAppointments = sortedAppointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#F7F7F7", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#4ABDAC" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#FFFFFF" }}>
            Liste des Rendez-vous
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FC4A1A", "&:hover": { backgroundColor: "#E43A1A" } }}
            startIcon={<Add />}
            onClick={() => {
              setSelectedAppointment(null);
              setShowAppointmentModal(true);
            }}
          >
            Ajouter un Rendez-vous
          </Button>
        </Toolbar>
      </Paper>

      {/* Filters */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#f3e5f5" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Rechercher par médecin ou patient"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 2, backgroundColor: "#ffffff" }}
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">Tous les statuts</MenuItem>
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </Box>
      </Paper>

      {/* Appointments Table */}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#e8f5e9" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#81c784" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <span>Date & Heure</span>
                  <IconButton
                    size="small"
                    onClick={handleSortByDate}
                    sx={{ color: "#ffffff", marginLeft: 1 }}
                  >
                    {sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Statut</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Motif</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Notes</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Docteur</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Patient</TableCell>
              <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7}>Error: {error}</TableCell>
              </TableRow>
            ) : paginatedAppointments.length > 0 ? (
              paginatedAppointments.map((appointment) => (
                <TableRow key={appointment.id} sx={{ "&:hover": { backgroundColor: "#f1f8e9" } }}>
                  <TableCell>{new Date(appointment.startDateTime).toLocaleString()}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>{appointment.motif}</TableCell>
                  <TableCell>{appointment.notes}</TableCell>
                  <TableCell>{users.find((user) => user.id === appointment.idUser)?.name || "Utilisateur inconnu"}</TableCell>
                  <TableCell>{patients.find((patient) => patient.id === appointment.idPatient)?.fullname || "Patient inconnu"}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleViewAppointment(appointment)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowAppointmentModal(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#e57373" }}
                      onClick={() => handleDelete(appointment.id)}
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
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>Aucun rendez-vous trouvé.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredAppointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal */}
      {showAppointmentModal && (
        <AppointmentFormModal
          show={showAppointmentModal}
          setShow={setShowAppointmentModal}
          appointment={selectedAppointment}
          onCreateAppointment={handleCreateAppointment}
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

export default RendezvousListComponent;