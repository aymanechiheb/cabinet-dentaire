/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../../Stores/AppointmentSlice";
import { getAllUsers } from "../../../Stores/UserSlice"; // Assuming you have this action to get users
import { ToastContainer, toast } from "react-toastify";

const AppointmentFormModal = ({ show, setShow, patientId }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users); // Get all users for selecting the doctor
  const [startDateTime, setStartDateTime] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [motif, setMotif] = useState("");
  const [notes, setNotes] = useState("");
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    dispatch(getAllUsers()); // Fetch users when the modal is opened
  }, [dispatch]);

  const handleCreateAppointment = () => {
    const newAppointment = {
      startDateTime,
      status,
      motif,
      notes,
      idUser,
      idPatient: patientId,
    };
    dispatch(createAppointment(newAppointment))
    .unwrap()
    .then(() => {
      toast.success("Appointment created successfully!"); // Success toast
      setShow(false); // Close modal after appointment creation
    })
    .catch((error) => {
      toast.error("Failed to create appointment. Please try again."); // Error toast
    });// Close modal after appointment creation
  };

  return (
    <Modal open={show} onClose={() => setShow(false)}>
      <Box sx={{ padding: 3, backgroundColor: "#fff", borderRadius: 2, width: 400, margin: "auto", marginTop: 5 }}>
        <Typography variant="h6">Create New Appointment</Typography>
        <TextField
          label="Start Date & Time"
          type="datetime-local"
          fullWidth
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Motif"
          fullWidth
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Notes"
          fullWidth
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
  <InputLabel>DOCTOR</InputLabel>
  <Select
    value={idUser}
    onChange={(e) => setIdUser(e.target.value)}
    label="User"
  >
    {users
      .filter((user) => user.role === "DOCTOR") // Filter users by role
      .map((user) => (
        <MenuItem key={user.id} value={user.id}>
          {user.name}
        </MenuItem>
      ))}
  </Select>
</FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAppointment}
          fullWidth
        >
          Create Appointment
        </Button>
      </Box>
    </Modal>
  );
};

export default AppointmentFormModal;
