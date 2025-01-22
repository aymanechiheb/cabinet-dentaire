/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPCareByAppointment } from "../../Stores/PCare";
import { fetchProduitConsomablesByAppointmentId } from "../../Stores/produitConsomableSlice";
import { Box, Typography, CircularProgress, Paper, Button, Card, CardContent, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import PcareForm from "./PcareForm";
import ProduitConsommableForm from "../forms/ProduitConsomable/ProduitConsommableForm";
import { fetchSoins } from "../../Stores/SoinSlice"; 
import { useLocation } from "react-router-dom";
import { generateFacturePDF } from "../../Helpers/generateFacturePDF"; 

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
  };

  if (error) {
    return <Typography color="error">Erreur lors du chargement des soins.</Typography>;
  }

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      {/* Header Section */}
      <Box sx={{ marginBottom: 3, backgroundColor: "#f0f4f8", padding: 2, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Détails des Soins - {patientName}
        </Typography>
        <Typography variant="h6" sx={{ color: "gray" }}>
          Doctor: {doctorName}
        </Typography>
      </Box>

      <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
        {/* Soins Details */}
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Détails des soins
        </Typography>

        <div id="factureContent">
          {pcareData.length > 0 ? (
            pcareData.map((item, index) => (
              <Card sx={{ marginBottom: 2 }} key={index}>
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    <strong>Date et Heure:</strong> {new Date(item.dateTime).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Commentaire:</strong> {item.comment}
                  </Typography>
                  <Typography variant="body1">
                    <strong>ID Facture:</strong> {item.idFacture}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Prix du soin:</strong> {getSoinPrice(item.idSoin)} dh
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>Aucun soin trouvé.</Typography>
          )}
        </div>
      </Paper>

      {/* Toggle for Form to Add Soins */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ marginTop: 2 }}
      >
        {showForm ? "Annuler" : "Ajouter un soin"}
      </Button>

      {showForm && <PcareForm appointmentId={appointmentId} onPcareAdded={handlePcareAdded} />}

      {/* Produits Consommables */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 4 }}>
        Produits Consommables
      </Typography>

      {produitsLoading ? (
        <CircularProgress />
      ) : produitsError ? (
        <Typography color="error">Erreur lors du chargement des produits consommables.</Typography>
      ) : Array.isArray(produitConsommables) && produitConsommables.length > 0 ? (
        produitConsommables.map((produit, index) => (
          <Card key={produit.id || index} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="body1">
                <strong>Produit:</strong> {produit.idProduct} - Quantité: {produit.qte}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>Aucun produit consommable trouvé pour ce rendez-vous.</Typography>
      )}

      {/* Button to add consumable product */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleProduitFormToggle}
        sx={{ marginTop: 2 }}
      >
        {showProduitForm ? "Annuler" : "Ajouter un produit consommable"}
      </Button>

      {showProduitForm && <ProduitConsommableForm appointmentId={appointmentId} />}

      {/* Button to generate PDF */}
      <Button
        variant="contained"
        color="secondary"
        onClick={generatePDF}
        sx={{ marginTop: 3 }}
      >
        Générer Facture PDF
      </Button>
    </Box>
  );
};

export default PcareComponent;
