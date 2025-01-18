import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './PatientSlice';
import documentReducer from './DocumentSlice';
import dentReducer from './DentSlice'
import soinReducer from './SoinSlice'
import userReducer from './userSlice';
import produitSlice from './produitSlice';
import sallconsultationReducer from './salleConsultationSlice';
import machineReducer from './MachineSlice';
import authReducer from './authSlice';
import appointmentReducer from './AppointmentSlice';
import { fetchPatients } from './PatientSlice'; 
import { getAllUsers } from './userSlice';
import pcareReducer from './PCare';
import produitConsomableReducer from './produitConsomableSlice';
import { enableMapSet } from "immer";
enableMapSet();

const store = configureStore({
  reducer: {
    patients: patientReducer,
    documents: documentReducer,
    dents:dentReducer,
    soins :soinReducer,
    users:userReducer,
    auth: authReducer, 
    appointments: appointmentReducer,
    produits:produitSlice,
    salleConsultation:sallconsultationReducer,
    machines: machineReducer,
    produitsConsommables: produitConsomableReducer,
    pcare:pcareReducer,
  },
});
store.dispatch(fetchPatients());
store.dispatch(getAllUsers());
export default store;
