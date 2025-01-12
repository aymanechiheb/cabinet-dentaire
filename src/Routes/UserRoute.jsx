import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'

const UserRoutes = () => {
  return (
    <Routes>
      {/* Route to the Soin List page */}
      <Route path="/Login" element={<Login />} />

 
    </Routes>
  );
};

export default UserRoutes;
