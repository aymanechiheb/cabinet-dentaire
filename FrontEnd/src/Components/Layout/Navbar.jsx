import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../style.css";
import { isAuthenticated, getCurrentUser } from "../../Helpers/authHelper";
import { useDispatch } from "react-redux";
import { logout } from "../../Stores/authSlice";
import logo from "../../assets/logoo.png";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const renderLinks = () => {
    if (!currentUser) return null;

    const links = [];

    // Admin-specific links
    if (currentUser.role === "ADMIN") {
      links.push(
        { to: "/dashboard", icon: "mage:dashboard-chart-notification", label: "Dashboard" },
        { to: "/users", icon: "fluent-emoji-high-contrast:health-worker", label: "Users" }
      );
    }

    // Common links for both Admin and User
    if (["USER", "ADMIN"].includes(currentUser.role)) {
      links.push(
        { to: "/inventory", icon: "ic:outline-inventory-2", label: "Inventory" },
        { to: "/resources", icon: "ic:baseline-add-circle-outline", label: "Resources" },
        { to: "/appointments", icon: "ic:baseline-add-circle-outline", label: "Appointments" },
        { to: "/patients", icon: "ic:outline-supervised-user-circle", label: "Patients" }
      );
    }

    // Doctor-specific links
    if (currentUser.role === "DOCTOR") {
      links.push(
        { to: "/appointments", icon: "ic:baseline-add-circle-outline", label: "Appointments" },
        { to: "/patients", icon: "ic:outline-supervised-user-circle", label: "Patients" }
      );
    }

    // Logout link
    links.push({
      to: "/login",
      icon: "uil:signout",
      label: "Logout",
      onClick: handleLogout,
    });

    return links.map(({ to, icon, label, onClick }, index) => (
      <li key={index}>
        <NavLink
          className="nav-link flex items-center space-x-2 hover:text-blue-500 transition"
          to={to}
          onClick={onClick}
        >
          <Icon icon={icon} width="30" height="30" aria-label={label} />
          <span>{label}</span>
        </NavLink>
      </li>
    ));
  };

  return (
    <>
      {isAuthenticated() && (
        <header
          id="header"
          className="d-flex align-items-center bg-white shadow-md sticky top-0 z-50"
        >
          <div className="container flex justify-between items-center py-4">
            {/* Logo Section */}
            <NavLink to="/" className="logo flex items-center ml-0">
              <img src={logo} alt="Logo" className="w-18 h-auto" />
            </NavLink>

            {/* Navbar Section */}
            <nav id="navbar" className="navbar">
              <ul className="flex space-x-6">{renderLinks()}</ul>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}

export default Navbar;
