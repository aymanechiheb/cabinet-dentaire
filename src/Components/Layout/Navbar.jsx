import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../../style.css';
import { isAuthenticated } from '../../Helpers/authHelper';
import { useDispatch } from 'react-redux';
import { logout } from '../../Stores/userSlice';

function Navbar() {
  const logo = '/logoo.png'; // Adjusted the logo path for React public folder
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear Redux state and local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
      {isAuthenticated() && (
        <header id="header" className="d-flex align-items-center">
          <div className="container d-flex align-items-center justify-content-between">
            {/* Logo Section */}
            <NavLink to="/" className="logo">
              <img src={logo} alt="Logo" />
            </NavLink>

            {/* Navbar Section */}
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <NavLink className="nav-link" to="/dents">
                    <Icon icon="teenyicons:history-outline" width="33" height="26" />
                    Dents
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/patient">
                    <Icon icon="mage:dashboard-chart-notification" width="33" height="26" />
                    Patients
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/users/All">
                    <Icon icon="fluent-emoji-high-contrast:health-worker" width="33" height="26" />
                    Utilisateur
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/login" onClick={handleLogout}>
                    <Icon icon="uil:signout" width="33" height="26" />
                    Déconnexion
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}

export default Navbar;