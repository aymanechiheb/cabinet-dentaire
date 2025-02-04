/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addPatient, editPatient,fetchPatients } from "../../../Stores/PatientSlice";
import { toast } from "react-toastify";

const PatientFormModal = ({ show, setShow, patient }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    datenaissance: "",
    adresse: "",
    telephone: "",
    cin: "",
    email: "",
    etatCivil: "",
    nombreEnfants: 0,
    cnss: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        fullname: patient.fullname,
        datenaissance: patient.datenaissance,
        adresse: patient.adresse,
        telephone: patient.telephone,
        cin: patient.cin,
        email: patient.email,
        etatCivil: patient.etatCivil,
        nombreEnfants: patient.nombreEnfants,
        cnss: patient.cnss,
      });
    } else {
      setFormData({
        fullname: "",
        datenaissance: "",
        adresse: "",
        telephone: "",
        cin: "",
        email: "",
        etatCivil: "",
        nombreEnfants: 0,
        cnss: "",
      });
    }
  }, [patient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (patient) {
        // Dispatch the edit action
        await dispatch(editPatient({ id: patient.id, patient: formData })).unwrap();
        toast.success("Patient updated successfully.");
         dispatch(fetchPatients());
        
      } else {
        // Dispatch the add action
        await dispatch(addPatient(formData)).unwrap();
        dispatch(fetchPatients());

        toast.success("Patient added successfully.");
      }
      setShow(false); // Close the modal
    } catch (error) {
      toast.error(
        error.message || "An unexpected error occurred while saving the patient."
      );
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="sm">
      <DialogTitle>{patient ? "Edit Patient" : "Add Patient"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="datenaissance"
                type="date"
                value={formData.datenaissance}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CIN"
                name="cin"
                value={formData.cin}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Etat Civil"
                name="etatCivil"
                value={formData.etatCivil}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre d’Enfants"
                name="nombreEnfants"
                type="number"
                value={formData.nombreEnfants}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="CNSS"
                name="cnss"
                value={formData.cnss}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {patient ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientFormModal;
