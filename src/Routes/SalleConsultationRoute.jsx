import {  Routes, Route } from 'react-router-dom';
import SalleConsultationList from '../pages/SalleConsulatation/SalleConsultationList';
import SalleConsultationFormModal from '../Components/SalleConsultation/SalleConsultationFormModal';

const SalleConsultationRoute = () => {
  return (
      <Routes>
        {/* Route to display the list of salles */}
        <Route path="/salles" element={<SalleConsultationList />} />

        {/* Route to display the form for adding a new salle */}
        <Route path="/salles/new" element={<SalleConsultationFormModal />} />

        {/* Route to edit an existing salle */}
        <Route
          path="/salles/edit/:id"
          element={<SalleConsultationFormModal />}
        />
      </Routes>
  );
};

export default SalleConsultationRoute;
