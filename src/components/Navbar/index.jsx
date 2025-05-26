import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './style.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo + Toggle */}
      <div className="navbar-logo">
        <Link to="/menu-page" className="logo-link" onClick={closeMenu}>
          <img
            src="https://learn.dibimbing.id/logo-dibimbing-blue-512.svg"
            alt="MyApp Logo"
            className="logo-img"
          />
          <span className="logo-text">MyWeb</span>
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu */}
      <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        {isLoggedIn && (
          <>
            <li><Link to="/menu-page" className="nav-link" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/profile" className="nav-link" onClick={closeMenu}>Profile</Link></li>
          </>
        )}
      </ul>

      {/* Actions */}
      <div className={`navbar-actions ${menuOpen ? "open" : ""}`}>
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="btn btn-primary" onClick={closeMenu}>Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-outline" onClick={closeMenu}>Register</button>
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
