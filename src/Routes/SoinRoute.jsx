import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SoinFormModal from "../Components/forms/Soin/SoinFormModal";
import SoinList from "../Components/forms/Soin/SoinList";

const SoinRoutes = () => {
  return (
    <Routes>
      {/* Protected routes for USER and ADMIN */}
      <Route element={<PrivateRoute requiredRoles={['USER', 'ADMIN']} />}>
        <Route path="/soins" element={<SoinList />} />
        <Route path="/soins/add" element={<SoinFormModal />} />
        <Route path="/soins/edit/:id" element={<SoinFormModal />} />
      </Route>

      {/* Other routes can go here */}
    </Routes>
  );
};

export default SoinRoutes;
