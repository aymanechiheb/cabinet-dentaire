import { Route, Routes } from "react-router-dom";
import MachineList from "../pages/Machine/MachineList"; 
import MachineFormModal from "../Components/forms/Machine/MachineFormModal";

const MachineRoute = () => {
  return (
    <Routes>
      <Route path="/machines" element={<MachineList />} />
      <Route path="/edit/:id" element={<MachineFormModal />} />
    </Routes>
  );
};

export default MachineRoute;
