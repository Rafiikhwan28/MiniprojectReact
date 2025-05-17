// src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Selamat Datang Sobat Dibimbing</h1>
        <p>
          Website ini dirancang untuk memenui tugas mini project react <h1>dibimbing</h1>
        </p>
        <div className="landing-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="btn-outline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
