import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ListProduit from "../pages/Produit/ListProduit"; 
import ProduitFormModal from "../Components/forms/Produit/ProduitFormModal"; 

const ProduitRoute = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/Produits" element={<ListProduit />} />
        <Route path="/Produitform" element={<ProduitFormModal />} />
      </Route>
    </Routes>
  );
};

export default ProduitRoute;
