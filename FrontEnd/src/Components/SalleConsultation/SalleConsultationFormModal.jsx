/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addSalle, editSalle } from "../../Stores/salleConsultationSlice";
import { toast } from "react-toastify";

const SalleConsultationFormModal = ({ show, setShow, salleToEdit }) => {
  const [formData, setFormData] = useState({
    numero: "",
    disponibilite: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (salleToEdit) {
      setFormData({
        numero: salleToEdit.numero || "",
        disponibilite: salleToEdit.disponibilite || false,
      });
    } else {
      setFormData({
        numero: "",
        disponibilite: false,
      });
    }
  }, [salleToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, disponibilite: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (salleToEdit) {
        await dispatch(editSalle({ id: salleToEdit.id, salle: formData })).unwrap();
        toast.success("Salle updated successfully.");
      } else {
        await dispatch(addSalle(formData)).unwrap();
        toast.success("Salle added successfully.");
      }
      setShow(false);
    } catch (error) {
      toast.error(error.message || "An error occurred while saving the salle.");
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="sm">
      <DialogTitle>{salleToEdit ? "Edit Salle" : "Add Salle"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Numero"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.disponibilite}
                    onChange={handleSwitchChange}
                  />
                }
                label="Disponibilité"
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
          {salleToEdit ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalleConsultationFormModal;
