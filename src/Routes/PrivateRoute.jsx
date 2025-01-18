import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../Helpers/authHelper"; 
const PrivateRoute = () => {
  // Check if the user is authenticated
  const isAuth = isAuthenticated();

  // If authenticated, render the child components (Outlet)
  // Otherwise, redirect to the login page
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;