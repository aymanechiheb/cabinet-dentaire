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
import { createDent, updateDent } from "../../../Stores/DentSlice";
import { toast } from "react-toastify";

const DentFormModal = ({ show, setShow, dent }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    code: "",
    position: "",
  });

  useEffect(() => {
    if (dent) {
      setFormData({
        code: dent.code,
        position: dent.position,
      });
    } else {
      setFormData({
        code: "",
        position: "",
      });
    }
  }, [dent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (dent) {
        // Dispatch the update action
        await dispatch(updateDent({ id: dent.id, dent: formData })).unwrap();
        toast.success("Dent updated successfully.");
      } else {
        // Dispatch the create action
        await dispatch(createDent(formData)).unwrap();
        toast.success("Dent added successfully.");
      }
      setShow(false); // Close the modal
    } catch (error) {
      toast.error(
        error.message || "An unexpected error occurred while saving the dent."
      );
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="sm">
      <DialogTitle>{dent ? "Edit Dent" : "Add Dent"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                fullWidth
                required
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
          {dent ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DentFormModal;
