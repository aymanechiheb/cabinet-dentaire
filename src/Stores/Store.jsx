import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './PatientSlice';
import documentReducer from './DocumentSlice';
import dentReducer from './DentSlice'
import soinReducer from './SoinSlice'
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    patients: patientReducer,
    documents: documentReducer,
    dents:dentReducer,
    soins :soinReducer,
    users:userReducer
  },
});

export default store;
