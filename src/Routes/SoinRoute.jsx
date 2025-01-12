import { Route, Routes } from 'react-router-dom';
import SoinFormModal from '../Components/forms/Soin/SoinFormModal'
import SoinList from '../Components/forms/Soin/SoinList'
const SoinRoutes = () => {
  return (
    <Routes>
      {/* Route to the Soin List page */}
      <Route path="/soins" element={<SoinList />} />

      {/* Route to create a new Soin */}
      <Route path="/soins/add" element={<SoinFormModal />} />

      {/* Route to edit an existing Soin */}
      <Route path="/soins/edit/:id" element={<SoinFormModal />} />
    </Routes>
  );
};

export default SoinRoutes;
