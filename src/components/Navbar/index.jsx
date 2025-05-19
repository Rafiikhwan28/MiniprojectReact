import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './style.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <img
            src="https://learn.dibimbing.id/logo-dibimbing-blue-512.svg"
            alt="MyApp Logo"
            className="logo-img"
          />
          <span className="logo-text">MyWeb</span>
        </Link>
      </div>

      {/* Menu */}
      <ul className="navbar-menu">
        {isLoggedIn && (
          <>
            <li><Link to="/menu-page" className="nav-link">Home</Link></li>
            <li><Link to="/profile" className="nav-link">Profile</Link></li>
          </>
        )}
      </ul>

      {/* Actions */}
      <div className="navbar-actions">
        {!isLoggedIn ? (
          <>
            <Link to="/register">
              <button className="btn btn-outline">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </>
        ) : (
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
