import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Stores/userSlice';
import { fetchPatients } from '../Stores/PatientSlice';
import { fetchAppointments } from '../Stores/appointmentSlice';
import { fetchProduits } from '../Stores/produitSlice';
import { getSalles } from '../Stores/salleConsultationSlice';
import CardComponent from './Card';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import InventoryIcon from '@mui/icons-material/Inventory';

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();

  // Accéder aux données depuis Redux
  const users = useSelector((state) => state.users.users);
  const patients = useSelector((state) => state.patients.list);
  const appointments = useSelector((state) => state.appointments.appointments);
  const produits = useSelector((state) => state.produits.produits);
  const salles = useSelector((state) => state.salleConsultation.salles);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(fetchPatients());
    dispatch(fetchAppointments());
    dispatch(fetchProduits());
    dispatch(getSalles());
  }, [dispatch]);

  // Données du graphique
  const chartData = {
    labels: ['Utilisateurs', 'Patients', 'Rendez-vous', 'Produits', 'Salles'],
    datasets: [
      {
        label: 'Statistiques',
        data: [users.length, patients.length, appointments.length, produits.length, salles.length],
        backgroundColor: ['#3f51b5', '#4caf50', '#f44336', '#ff9800', '#8bc34a'],
        borderColor: ['#303f9f', '#388e3c', '#d32f2f', '#f57c00', '#689f38'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
        <CardComponent
          title="Total Utilisateurs"
          value={users.length}
          icon={<PeopleIcon sx={{ fontSize: 40, color: '#3f51b5' }} />}
        />
        <CardComponent
          title="Total Patients"
          value={patients.length}
          icon={<MedicalServicesIcon sx={{ fontSize: 40, color: '#4caf50' }} />}
        />
        <CardComponent
          title="Total Produits"
          value={produits.length}
          icon={<InventoryIcon sx={{ fontSize: 40, color: '#ff9800' }} />}
        />
        <CardComponent
          title="Total Salles"
          value={salles.length}
          icon={<LocalHospitalIcon sx={{ fontSize: 40, color: '#8bc34a' }} />}
        />
      </div>
      
      {/* Graphique */}
      <div style={{ width: '60%', margin: 'auto' }}>
        <h3>Statistiques Générales</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
