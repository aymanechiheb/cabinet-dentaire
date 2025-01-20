import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Import du PrivateRoute
import DentList from '../Components/forms/Dent/DentList';
import ResourcesPage from "../pages/ResourcesPage";
import InventoryPage from "../pages/InventoryPage";

const DentRoute = () => {
  return (
    <Routes>
      {/* Protected route for ADMIN and USER */}
      <Route element={<PrivateRoute requiredRoles={['ADMIN', 'USER']} />}>
        <Route path="/dents" element={<DentList />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/Inventory" element={<InventoryPage />} />
     
      </Route>
    </Routes>
  );
};

export default DentRoute;
