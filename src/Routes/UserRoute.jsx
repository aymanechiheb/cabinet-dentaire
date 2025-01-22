import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import UserFormModal from '../Components/User/UserFormModal';
import UserList from '../pages/user/UserList';
import PrivateRoute from './PrivateRoute'; // Import your PrivateRoute component
import Unauthorized from '../pages/Unauthorized';
import Dashboard from "../Components/Dashboard";

const UserRoutes = () => {
  return (
    <Routes>
      {/* Route to the Login page */}
      <Route path="/Login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized/>} />

      
      
      {/* Wrap the user-related routes with PrivateRoute for authentication and role check */}
      <Route element={<PrivateRoute requiredRoles={['ADMIN']} />}>
      <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserFormModal />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
