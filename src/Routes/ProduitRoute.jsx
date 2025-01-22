import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ListProduit from "../pages/Produit/ListProduit";
import ProduitFormModal from "../Components/forms/Produit/ProduitFormModal";

const ProduitRoute = () => {
  return (
    <Routes>
      {/* Protected route for ADMIN and USER */}
      <Route element={<PrivateRoute requiredRoles={['ADMIN', 'USER']} />}>
        <Route path="/Produits" element={<ListProduit />} />
        <Route path="/Produitform" element={<ProduitFormModal />} />
      </Route>
    </Routes>
  );
};

export default ProduitRoute;
