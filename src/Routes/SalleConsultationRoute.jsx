import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SalleConsultationList from "../pages/SalleConsulatation/SalleConsultationList";
import SalleConsultationFormModal from "../Components/SalleConsultation/SalleConsultationFormModal";

const SalleConsultationRoute = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/salles" element={<SalleConsultationList />} />
        <Route path="/salles/new" element={<SalleConsultationFormModal />} />
        <Route path="/salles/edit/:id" element={<SalleConsultationFormModal />} />
      </Route>
    </Routes>
  );
};

export default SalleConsultationRoute;
