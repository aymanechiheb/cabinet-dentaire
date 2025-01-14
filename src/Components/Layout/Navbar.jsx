import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../../style.css';
import { isAuthenticated } from '../../Helpers/authHelper';
import { useDispatch } from 'react-redux';
import { logout } from '../../Stores/userSlice';
import logo from '../../assets/logoo.png';
function Navbar() {

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
           <NavLink to="/" className="logo flex items-center ml-0">
  <img src={logo} alt="Logo" className="w-18 h-auto " />
</NavLink>

            {/* Navbar Section */}
            <nav id="navbar" className="navbar">
              <ul className="flex space-x-6">
              <li>
                  <NavLink className="nav-link flex items-center space-x-2" to="/patient">
                    <Icon icon="mage:dashboard-chart-notification" width="33" height="26" />
                    <span>Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link flex items-center space-x-2" to="/Inventory">
                    <Icon icon="ic:outline-inventory-2" width="33" height="26" />
                    <span>Inventory</span>
                  </NavLink>
                </li>
               
                <li>
                  <NavLink className="nav-link flex items-center space-x-2" to="/patients">
                    <Icon icon="fluent-emoji-high-contrast:health-worker" width="33" height="26" />
                    <span>Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link flex items-center space-x-2" to="/Resources">
                    <Icon icon="ic:baseline-add-circle-outline" width="33" height="26" />
                    <span>Resources</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link flex items-center space-x-2" to="/patients">
                    <Icon icon="ic:outline-supervised-user-circle" width="33" height="26" />
                    <span>Patients</span>
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
