import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Stores/userSlice";
import { fetchPatients } from "../Stores/PatientSlice";
import { fetchAppointments } from "../Stores/appointmentSlice";
import { fetchProduits } from "../Stores/produitSlice";
import { getSalles } from "../Stores/salleConsultationSlice";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  People as PeopleIcon,
  MedicalServices as MedicalServicesIcon,
  LocalHospital as LocalHospitalIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  // Access data from Redux
  const users = useSelector((state) => state.users.users);
  const patients = useSelector((state) => state.patients.list);
  const appointments = useSelector((state) => state.appointments.appointments);
  const produits = useSelector((state) => state.produits.produits);
  const salles = useSelector((state) => state.salleConsultation.salles);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getAllUsers()),
        dispatch(fetchPatients()),
        dispatch(fetchAppointments()),
        dispatch(fetchProduits()),
        dispatch(getSalles()),
      ]);
      setLoading(false); // Data fetched, stop loading
    };
    fetchData();
  }, [dispatch]);

  // Mock percentage growth for demo purposes
  const mockGrowth = (current, previous) => ((current - previous) / previous) * 100;

  // Previous data for comparison (demo values)
  const previousData = {
    users: 50,
    patients: 120,
    appointments: 80,
    produits: 30,
    salles: 10,
  };

  // Chart data
  const chartData = {
    labels: ["Users", "Patients", "Appointments", "Products", "Rooms"],
    datasets: [
      {
        label: "Statistics",
        data: [users.length, patients.length, appointments.length, produits.length, salles.length],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.error.main,
          theme.palette.warning.main,
          theme.palette.info.main,
        ],
        borderColor: [
          theme.palette.primary.dark,
          theme.palette.success.dark,
          theme.palette.error.dark,
          theme.palette.warning.dark,
          theme.palette.info.dark,
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3, color: "#1565c0" }}>
        Dashboard
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: theme.palette.primary.main, color: "#ffffff" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ backgroundColor: theme.palette.primary.dark }}>
                  <PeopleIcon />
                </Avatar>
                <Typography variant="h6" sx={{ marginLeft: 2 }}>
                  Total Users
                </Typography>
              </Box>
              <Typography variant="h4">{users.length}</Typography>
              <Typography variant="body2">
                Growth: {mockGrowth(users.length, previousData.users).toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: theme.palette.success.main, color: "#ffffff" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ backgroundColor: theme.palette.success.dark }}>
                  <MedicalServicesIcon />
                </Avatar>
                <Typography variant="h6" sx={{ marginLeft: 2 }}>
                  Total Patients
                </Typography>
              </Box>
              <Typography variant="h4">{patients.length}</Typography>
              <Typography variant="body2">
                Growth: {mockGrowth(patients.length, previousData.patients).toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: theme.palette.warning.main, color: "#ffffff" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ backgroundColor: theme.palette.warning.dark }}>
                  <InventoryIcon />
                </Avatar>
                <Typography variant="h6" sx={{ marginLeft: 2 }}>
                  Total Products
                </Typography>
              </Box>
              <Typography variant="h4">{produits.length}</Typography>
              <Typography variant="body2">
                Growth: {mockGrowth(produits.length, previousData.produits).toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: theme.palette.info.main, color: "#ffffff" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ backgroundColor: theme.palette.info.dark }}>
                  <LocalHospitalIcon />
                </Avatar>
                <Typography variant="h6" sx={{ marginLeft: 2 }}>
                  Total Rooms
                </Typography>
              </Box>
              <Typography variant="h4">{salles.length}</Typography>
              <Typography variant="body2">
                Growth: {mockGrowth(salles.length, previousData.salles).toFixed(2)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#ffffff" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, color: "#333" }}>
          General Statistics
        </Typography>
        <Box sx={{ height: "400px" }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;