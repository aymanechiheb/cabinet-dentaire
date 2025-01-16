import { Route, Routes } from "react-router-dom";
import DentList from '../Components/forms/Dent/DentList'
import ResourcesPage from "../pages/ResourcesPage";
import InventoryPage from "../pages/InventoryPage";
import Dashboard from "../Components/Dashboard";
import RendezvousListComponent from '../Components/forms/Appointment/AppointementList'

const DentRoute = () => {
  return (
    <Routes>
      {/* Route for viewing all dents */}
      <Route path="/dents" element={<DentList />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/Inventory" element={<InventoryPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Appointments" element={<RendezvousListComponent />} />






      
    </Routes>
  );
};

export default DentRoute;
