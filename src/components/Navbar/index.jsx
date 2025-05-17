import { Link } from "react-router-dom";
import './style.css';

const Navbar = () => {
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
        <li><Link to="/menu-page" className="nav-link">Home</Link></li>
        <li><Link to="/profile/:id" className="nav-link">Profile</Link></li>
      </ul>

      {/* Actions */}
      <div className="navbar-actions">
        <Link to="/register">
          <button className="btn btn-outline">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
