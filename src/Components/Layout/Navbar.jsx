import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../../style.css';
import { isAuthenticated } from '../../Helpers/authHelper';
import { useDispatch } from 'react-redux';
import { logout } from '../../Stores/userSlice';

function Navbar() {
  const logo = '../../assets/logoo.png'; 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <>
      {isAuthenticated() && (
        <header id="header" className="d-flex align-items-center">
          <div className="container flex justify-between items-center py-4">
            {/* Logo Section */}
            <NavLink to="/" className="logo flex items-center">
              <img src={logo} alt="Logo" className="w-16 h-auto" />
            </NavLink>

            {/* Navbar Section */}
            <nav id="navbar" className="navbar">
              <ul className="flex space-x-6">
                <li>
                  <NavLink className="nav-link flex items-center space-x-2" to="/dents">
                    <Icon icon="teenyicons:history-outline" width="33" height="26" />
                    <span>Dents</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link flex items-center space-x-2" to="/patient">
                    <Icon icon="mage:dashboard-chart-notification" width="33" height="26" />
                    <span>Patients</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link flex items-center space-x-2" to="/patients">
                    <Icon icon="fluent-emoji-high-contrast:health-worker" width="33" height="26" />
                    <span>patients</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link flex items-center space-x-4" to="/login" onClick={handleLogout}>
                    <Icon icon="uil:signout" width="33" height="26" />
                    <span>Déconnexion</span>
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
