import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login'
import UserFormModal from '../Components/User/UserFormModal';
import UserList from '../pages/user/UserList';
const UserRoutes = () => {
  return (
    <Routes>
      {/* Route to the Soin List page */}
      <Route path="/Login" element={<Login />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/users/:id" element={<UserFormModal />} />



 
    </Routes>
  );
};

export default UserRoutes;
