
import { Route, Routes } from "react-router-dom";
import ListProduit from "../pages/Produit/ListProduit"; 
import ProduitFormModal from "../Components/forms/Produit/ProduitFormModal"; 

const ProduitRoute = () => {
  return (
    <Routes>
      {/* Route for listing all produits */}
      <Route path="/Produits" element={<ListProduit />} />

      {/* Route for editing or adding a produit */}
      <Route path="/Produitform" element={<ProduitFormModal />} />
    </Routes>
  );
};

export default ProduitRoute;
