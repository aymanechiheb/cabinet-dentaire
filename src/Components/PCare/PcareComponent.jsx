import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPCareByAppointment } from "../../Stores/PCare";
import { fetchProduitConsomablesByAppointmentId } from "../../Stores/produitConsomableSlice";
import { Box, Typography, CircularProgress, Paper, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import PcareForm from "./PcareForm";
import ProduitConsommableForm from "../forms/ProduitConsomable/ProduitConsommableForm";

const PcareComponent = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.pcare);
  const { produitConsommables, loading: produitsLoading, error: produitsError } = useSelector(
    (state) => state.produitsConsommables
  );
  console.log("produitConsommables state:", produitConsommables); // Updated key name

  const { appointmentId } = useParams();
  const [pcareData, setPcare] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showProduitForm, setShowProduitForm] = useState(false);
  const [isPcareAdded, setIsPcareAdded] = useState(false);

  // Effect to fetch PCare and Produits when appointmentId changes
  useEffect(() => {
    if (appointmentId) {
      console.log("Fetching PCare and Produits for appointment:", appointmentId);

      dispatch(fetchPCareByAppointment(appointmentId))
        .unwrap()
        .then((data) => {
          setPcare(data);
          console.log("PCare data:", data);
        })
        .catch(() => {});

      // Fetch produits consommables
      dispatch(fetchProduitConsomablesByAppointmentId(appointmentId))
        .unwrap()
        .then((produits) => {
          console.log("Fetched Produits Consommables:", produits);
        })
        .catch((err) => {
          console.error("Error fetching produits consommables:", err);
        });
    }
  }, [dispatch, appointmentId, isPcareAdded]);

  const handlePcareAdded = () => {
    setIsPcareAdded(!isPcareAdded);
  };

  const handleProduitFormToggle = () => {
    setShowProduitForm(!showProduitForm);
  };

  if (error) {
    return <Typography color="error">Erreur lors du chargement des soins.</Typography>;
  }

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Détails des soins
        </Typography>

        {pcareData.length > 0 ? (
          pcareData.map((item, index) => (
            <Box key={index}>
              <Typography variant="body1">
                <strong>Date et Heure:</strong> {new Date(item.dateTime).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                <strong>Commentaire:</strong> {item.comment}
              </Typography>
              <Typography variant="body1">
                <strong>ID Facture:</strong> {item.idFacture}
              </Typography>
              <Typography variant="body1">
                <strong>ID Soin:</strong> {item.idSoin}
              </Typography>
              <Typography variant="body1">
                <strong>ID Rendez-vous:</strong> {item.appointmentId}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>Aucun soin trouvé.</Typography>
        )}
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ marginTop: 2 }}
      >
        {showForm ? "Annuler" : "Ajouter un soin"}
      </Button>

      {showForm && <PcareForm appointmentId={appointmentId} onPcareAdded={handlePcareAdded} />}

      {/* Affichage des produits consommables */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 4 }}>
        Produits Consommables
      </Typography>

      {produitsLoading ? (
        <CircularProgress />
      ) : produitsError ? (
        <Typography color="error">Erreur lors du chargement des produits consommables.</Typography>
      ) : Array.isArray(produitConsommables) && produitConsommables.length > 0 ? (
        produitConsommables.map((produit, index) => (
          <Box key={produit.id || index}>
            <Typography variant="body1">
              <strong>Produit:</strong> {produit.idProduct} - Quantité: {produit.qte}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography>Aucun produit consommable trouvé pour ce rendez-vous.</Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleProduitFormToggle}
        sx={{ marginTop: 2 }}
      >
        {showProduitForm ? "Annuler" : "Ajouter un produit consommable"}
      </Button>

      {showProduitForm && <ProduitConsommableForm appointmentId={appointmentId} />}
    </Box>
  );
};

export default PcareComponent;