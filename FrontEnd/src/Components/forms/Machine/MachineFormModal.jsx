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
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addMachine, updateMachine, fetchMachines } from "../../../Stores/MachineSlice";
import { getSalles } from "../../../Stores/salleConsultationSlice";
import { toast } from "react-toastify";

const MachineFormModal = ({ show, setShow, machineToEdit }) => {
  const [formData, setFormData] = useState({
    nom: "",
    model: "",
    numerodeserie: "",
    etat: "En fonctionnement", // Default state
    salleConsultationId: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); // State to store API error messages

  const dispatch = useDispatch();
  const { salles } = useSelector((state) => state.salleConsultation);

  useEffect(() => {
    dispatch(getSalles());
    if (machineToEdit) {
      setFormData({
        nom: machineToEdit.nom || "",
        model: machineToEdit.model || "",
        numerodeserie: machineToEdit.numerodeserie || "",
        etat: machineToEdit.etat || "En fonctionnement",
        salleConsultationId: machineToEdit.salleConsultationId || "",
      });
    } else {
      setFormData({
        nom: "",
        model: "",
        numerodeserie: "",
        etat: "En fonctionnement",
        salleConsultationId: "",
      });
    }
  }, [dispatch, machineToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Nom is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.numerodeserie) newErrors.numerodeserie = "Serial number is required";
    if (!formData.salleConsultationId) newErrors.salleConsultationId = "Salle Consultation ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (machineToEdit) {
        await dispatch(updateMachine({ id: machineToEdit.id, machine: formData })).unwrap();
        toast.success("Machine updated successfully.");
      } else {
        await dispatch(addMachine(formData)).unwrap();
        toast.success("Machine added successfully.");
      }
      setShow(false);
      dispatch(fetchMachines()); // Refresh the machine list
    } catch (error) {
      // Handle API errors
      setApiError(error.message || "An error occurred while saving the machine.");
      toast.error(error.message || "An error occurred while saving the machine.");
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="sm">
      <DialogTitle>{machineToEdit ? "Edit Machine" : "Add Machine"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Machine Name"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!errors.nom}
                helperText={errors.nom}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Machine Model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!errors.model}
                helperText={errors.model}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Serial Number"
                name="numerodeserie"
                value={formData.numerodeserie}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!errors.numerodeserie}
                helperText={errors.numerodeserie}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.etat}>
                <InputLabel>Machine Status</InputLabel>
                <Select
                  name="etat"
                  value={formData.etat}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="En fonctionnement">En fonctionnement</MenuItem>
                  <MenuItem value="Hors service">Hors service</MenuItem>
                </Select>
                {errors.etat && <FormHelperText>{errors.etat}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.salleConsultationId}>
                <InputLabel>Choose Salle Consultation</InputLabel>
                <Select
                  name="salleConsultationId"
                  value={formData.salleConsultationId}
                  onChange={handleInputChange}
                >
                  {salles.map((salle) => (
                    <MenuItem key={salle.id} value={salle.id}>
                      {salle.numero}
                    </MenuItem>
                  ))}
                </Select>
                {errors.salleConsultationId && <FormHelperText>{errors.salleConsultationId}</FormHelperText>}
              </FormControl>
            </Grid>
            {/* Display API Error */}
            {apiError && (
              <Grid item xs={12}>
                <FormHelperText error>{apiError}</FormHelperText>
              </Grid>
            )}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {machineToEdit ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MachineFormModal;