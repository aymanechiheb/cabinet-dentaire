import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPCareByAppointment } from "../../Stores/PCare";
import { fetchProduitConsomablesByAppointmentId } from "../../Stores/produitConsomableSlice";
import { fetchSoins } from "../../Stores/SoinSlice";
import { useParams, useLocation } from "react-router-dom";
import { generateFacturePDF } from "../../Helpers/generateFacturePDF";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Card,
  CardContent,
  Grid,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Download, Delete } from "@mui/icons-material";
import PcareForm from "./PcareForm";
import ProduitConsommableForm from "../forms/ProduitConsomable/ProduitConsommableForm";

const PcareComponent = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.pcare);
  const { soins } = useSelector((state) => state.soins);
  const { produitConsommables, loading: produitsLoading, error: produitsError } = useSelector(
    (state) => state.produitsConsommables
  );
  const location = useLocation();
  const { doctorName, patientName } = location.state || {};
  const { appointmentId } = useParams();
  const [pcareData, setPcare] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showProduitForm, setShowProduitForm] = useState(false);
  const [isPcareAdded, setIsPcareAdded] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (appointmentId) {
      dispatch(fetchSoins());
      dispatch(fetchPCareByAppointment(appointmentId))
        .unwrap()
        .then((data) => setPcare(data))
        .catch(() => {});
      dispatch(fetchProduitConsomablesByAppointmentId(appointmentId))
        .unwrap()
        .catch((err) => console.error("Error fetching produits consommables:", err));
    }
  }, [dispatch, appointmentId, isPcareAdded]);

  const getSoinPrice = (idSoin) => {
    const soin = soins.find((s) => s.id === idSoin);
    return soin ? soin.prix : "N/A";
  };

  const handlePcareAdded = () => {
    setIsPcareAdded(!isPcareAdded);
  };

  const handleProduitFormToggle = () => {
    setShowProduitForm(!showProduitForm);
  };

  const generatePDF = () => {
    const soinsWithPrices = pcareData.map((item) => ({
      id: item.idSoin,
      dateTime: item.dateTime,
      comment: item.comment,
      price: getSoinPrice(item.idSoin),
    }));
    generateFacturePDF(doctorName, patientName, soinsWithPrices);
    setToastMessage("Facture générée avec succès.");
    setOpenToast(true);
  };

  if (error) {
    return <Typography color="error">Erreur lors du chargement des soins.</Typography>;
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#e3f2fd" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1565c0" }}>
            Détails des Soins - {patientName}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#1565c0", marginRight: 2 }}>
            Doctor: {doctorName}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Download />}
            onClick={generatePDF}
          >
            Générer Facture PDF
          </Button>
        </Toolbar>
      </Paper>

      {/* Soins Details */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 3, backgroundColor: "#ffffff" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, color: "#333" }}>
          Détails des soins
        </Typography>

        <Grid container spacing={2}>
          {pcareData.length > 0 ? (
            pcareData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: "#f9f9f9", boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                      <strong>Date et Heure:</strong> {new Date(item.dateTime).toLocaleString()}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#555" }}>
                      <strong>Commentaire:</strong> {item.comment}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#555" }}>
                      <strong>ID Facture:</strong> {item.idFacture}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#555" }}>
                      <strong>Prix du soin:</strong> {getSoinPrice(item.idSoin)} dh
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>Aucun soin trouvé.</Typography>
          )}
        </Grid>
      </Paper>

      {/* Add Soin Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setShowForm(!showForm)}
        sx={{ marginBottom: 3 }}
      >
        {showForm ? "Annuler" : "Ajouter un soin"}
      </Button>

      {showForm && <PcareForm appointmentId={appointmentId} onPcareAdded={handlePcareAdded} />}

      {/* Produits Consommables Section */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 3, backgroundColor: "#ffffff" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, color: "#333" }}>
          Produits Consommables
        </Typography>

        {produitsLoading ? (
          <CircularProgress />
        ) : produitsError ? (
          <Typography color="error">Erreur lors du chargement des produits consommables.</Typography>
        ) : Array.isArray(produitConsommables) && produitConsommables.length > 0 ? (
          <Grid container spacing={2}>
            {produitConsommables.map((produit, index) => (
              <Grid item xs={12} sm={6} md={4} key={produit.id || index}>
                <Card sx={{ backgroundColor: "#f9f9f9", boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ color: "#555" }}>
                      <strong>Produit:</strong> {produit.idProduct} - Quantité: {produit.qte}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>Aucun produit consommable trouvé pour ce rendez-vous.</Typography>
        )}
      </Paper>

      {/* Add Produit Consommable Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleProduitFormToggle}
        sx={{ marginBottom: 3 }}
      >
        {showProduitForm ? "Annuler" : "Ajouter un produit consommable"}
      </Button>

      {showProduitForm && <ProduitConsommableForm appointmentId={appointmentId} />}

      {/* Snackbar for Notifications */}
      <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
        <Alert severity="success" onClose={() => setOpenToast(false)}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PcareComponent;