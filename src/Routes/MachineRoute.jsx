import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MachineList from "../pages/Machine/MachineList"; 
import MachineFormModal from "../Components/forms/Machine/MachineFormModal";

const MachineRoute = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/machines" element={<MachineList />} />
        <Route path="/edit/:id" element={<MachineFormModal />} />
      </Route>
    </Routes>
  );
};

export default MachineRoute;
