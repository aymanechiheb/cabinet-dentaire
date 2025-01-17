// AppointmentRoutes.js
import { Route, Routes } from "react-router-dom";
import RendezvousListComponent from "../Components/forms/Appointment/AppointementList";

const AppointmentRoutes = () => {
  return (
    <Routes>
      {/* Route to display all appointments */}
      <Route path="/appointments" element={<RendezvousListComponent />} />
      
      {/* Route to fetch appointments by user */}
      <Route path="/appointments/user/:userId" element={<RendezvousListComponent />} />
      
      {/* Route to fetch appointments by patient */}
      <Route path="/appointments/patient/:patientId" element={<RendezvousListComponent />} />
    </Routes>
  );
};

export default AppointmentRoutes;
