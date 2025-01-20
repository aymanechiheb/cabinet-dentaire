import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SoinFormModal from "../Components/forms/Soin/SoinFormModal";
import SoinList from "../Components/forms/Soin/SoinList";

const SoinRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/soins" element={<SoinList />} />
        <Route path="/soins/add" element={<SoinFormModal />} />
        <Route path="/soins/edit/:id" element={<SoinFormModal />} />
      </Route>
    </Routes>
  );
};

export default SoinRoutes;
