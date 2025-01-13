import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './PatientSlice';
import documentReducer from './DocumentSlice';
import dentReducer from './DentSlice'
import soinReducer from './SoinSlice'
import userReducer from './userSlice';
import produitSlice from './produitSlice';
const store = configureStore({
  reducer: {
    patients: patientReducer,
    documents: documentReducer,
    dents:dentReducer,
    soins :soinReducer,
    users:userReducer,
    produits:produitSlice,
  },
});

export default store;
