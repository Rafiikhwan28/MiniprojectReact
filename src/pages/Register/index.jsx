import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css';
import Navbar from "../../components/Navbar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("https://reqres.in/api/register", {
        email,
        password,
      });
      setMessage("Registrasi berhasil!...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Registrasi gagal. Pastikan data valid.");
    }
  };

  return (
    <>
      <Navbar />
      
    <div className="auth-container">

      <div className="auth-box">
        <h2>Register</h2>
        {message && <p className="auth-message">{message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p>
          Sudah punya akun? <a href="/login">Login</a>
        </p>
      </div>
    </div>
    </>
    
  );
};

export default Register;