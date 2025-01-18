// AppointmentRoutes.js
import { Route, Routes } from "react-router-dom";
import RendezvousListComponent from "../Components/forms/Appointment/AppointementList";
import PcareComponent from "../Components/PCare/PcareComponent";

const AppointmentRoutes = () => {
  return (
    <Routes>
      {/* Route to display all appointments */}
      <Route path="/appointments" element={<RendezvousListComponent />} />
      
      {/* Route to fetch appointments by user */}
      <Route path="/appointments/user/:userId" element={<RendezvousListComponent />} />
      
      {/* Route to fetch appointments by patient */}
      <Route path="/appointments/patient/:patientId" element={<RendezvousListComponent />} />
      <Route path="/rendezvous/details/:appointmentId" element={<PcareComponent />} />

    </Routes>
  );
};

export default AppointmentRoutes;
