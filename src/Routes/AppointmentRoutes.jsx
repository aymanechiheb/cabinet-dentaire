import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Import du PrivateRoute
import RendezvousListComponent from "../Components/forms/Appointment/AppointementList";
import PcareComponent from "../Components/PCare/PcareComponent";

const AppointmentRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        {/* Route pour afficher tous les rendez-vous */}
        <Route path="/appointments" element={<RendezvousListComponent />} />

        {/* Route pour récupérer les rendez-vous par utilisateur */}
        <Route path="/appointments/user/:userId" element={<RendezvousListComponent />} />

        {/* Route pour récupérer les rendez-vous par patient */}
        <Route path="/appointments/patient/:patientId" element={<RendezvousListComponent />} />

        {/* Route pour les détails du rendez-vous */}
        <Route path="/rendezvous/details/:appointmentId" element={<PcareComponent />} />
      </Route>
    </Routes>
  );
};

export default AppointmentRoutes;
