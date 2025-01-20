import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PatientList from "../Components/forms/Patient/PatientList"; 
import PatientFormModal from "../components/forms/Patient/PatientformModal"; 

const PatientRoute = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/patients" element={<PatientList />} />
        <Route path="/edit/:id" element={<PatientFormModal />} />
      </Route>
    </Routes>
  );
};

export default PatientRoute;
