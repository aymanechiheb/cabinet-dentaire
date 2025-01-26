/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPCare } from "../../Stores/PCare"; // Action for adding pcare
import { fetchSoins } from "../../Stores/SoinSlice"; // Action for fetching soins
import { useParams, useNavigate } from "react-router-dom";

const PcareForm = ({ appointmentId, onPcareAdded }) => {
  const dispatch = useDispatch();
  const soins = useSelector((state) => state.soins.soins); // Assuming soins are stored in `state.soin.soins`
  const [formData, setFormData] = useState({
    dateTime: "",
    comment: "",
    idFacture: "",
    idSoin: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchSoins()); // Fetch the list of soins when the component mounts
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.dateTime || !formData.comment || !formData.idFacture || !formData.idSoin) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      const result = await dispatch(createPCare({ ...formData, appointmentId }));

      if (result.error) {
        setError(result.error.message || "Erreur inconnue");
        return;
      }

      // Notify parent that care has been added
      onPcareAdded();

      setFormData({
        dateTime: "",
        comment: "",
        idFacture: "",
        idSoin: "",
      });

      // Redirect after adding
    } catch (error) {
      setError(error.message || "Erreur lors de l'ajout du soin");
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Ajouter un soin
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Date et Heure"
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Commentaire"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="ID Facture"
          name="idFacture"
          value={formData.idFacture}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        {/* ID Soin dropdown */}
        <FormControl sx={{ marginBottom: 2 }}>
          <InputLabel id="idSoin-label">ID Soin</InputLabel>
          <Select
            labelId="idSoin-label"
            name="idSoin"
            value={formData.idSoin}
            onChange={handleChange}
            label="ID Soin"
          >
            {soins.map((soin) => (
              <MenuItem key={soin.id} value={soin.id}>
                {soin.code} 
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </Box>
    </Box>
  );
};

export default PcareForm;
