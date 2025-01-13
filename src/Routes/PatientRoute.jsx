import { Route, Routes } from "react-router-dom";
import PatientList from "../Components/forms/Patient/PatientList"; 
import PatientFormModal from "../components/forms/Patient/PatientformModal"; 

const PatientRoute = () => {
  return (
    <Routes>
     <Route path="/patients" element={<PatientList />} />
      
      <Route path="/edit/:id" element={<PatientFormModal />} />
    </Routes>
  );
};

export default PatientRoute;
