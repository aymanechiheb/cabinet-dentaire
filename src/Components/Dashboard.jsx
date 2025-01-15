// Dashboard.jsx
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardComponent from './Card';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { getAllUsers } from '../Stores/userSlice';  // User slice action
import { fetchPatients } from '../Stores/PatientSlice'; // Patient slice action

const Dashboard = () => {
  const dispatch = useDispatch();

  // Access data from Redux store
  const users = useSelector((state) => state.users.users); // Users from userSlice
  const patients = useSelector((state) => state.patients.list); // Patients from patientSlice

  useEffect(() => {
    dispatch(getAllUsers());  // Dispatch action to fetch users
    dispatch(fetchPatients()); // Dispatch action to fetch patients
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <CardComponent
        title="Total Users"
        value={users.length}
        icon={<PeopleIcon sx={{ fontSize: 40, color: '#3f51b5' }} />}
      />
      <CardComponent
        title="Total Patients"
        value={patients.length}
        icon={<MedicalServicesIcon sx={{ fontSize: 40, color: '#4caf50' }} />}
      />
    </div>
  );
};

export default Dashboard;
