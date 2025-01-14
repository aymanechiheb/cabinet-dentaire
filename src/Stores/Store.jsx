import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './PatientSlice';
import documentReducer from './DocumentSlice';
import dentReducer from './DentSlice'
import soinReducer from './SoinSlice'
import userReducer from './userSlice';
import produitSlice from './produitSlice';
import sallconsultationReducer from './salleConsultationSlice';
import machineReducer from './MachineSlice';
const store = configureStore({
  reducer: {
    patients: patientReducer,
    documents: documentReducer,
    dents:dentReducer,
    soins :soinReducer,
    users:userReducer,
    produits:produitSlice,
    salleConsultation:sallconsultationReducer,
    machines: machineReducer,
  },
});

export default store;
