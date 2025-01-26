/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../Helpers/authHelper"; // Ensure getCurrentUser is imported

const PrivateRoute = ({ requiredRoles }) => {
  // Check if the user is authenticated
  const isAuth = isAuthenticated();
  const currentUser = getCurrentUser(); // Get current user data from localStorage

  // If not authenticated, redirect to the login page
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated but doesn't have one of the required roles, redirect to unauthorized page
  if (requiredRoles && !requiredRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // If authenticated and role matches, render the child components (Outlet)
  return <Outlet />;
};

export default PrivateRoute;
