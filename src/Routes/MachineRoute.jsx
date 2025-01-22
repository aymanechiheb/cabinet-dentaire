import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MachineList from "../pages/Machine/MachineList"; 
import MachineFormModal from "../Components/forms/Machine/MachineFormModal";

const MachineRoute = () => {
  return (
    <Routes>
      {/* Protected route for ADMIN and USER */}
      <Route element={<PrivateRoute requiredRoles={['ADMIN', 'USER']} />}>
        <Route path="/machines" element={<MachineList />} />
        <Route path="/edit/:id" element={<MachineFormModal />} />
      </Route>
    </Routes>
  );
};

export default MachineRoute;
