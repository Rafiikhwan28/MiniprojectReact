import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';
import Navbar from "../../components/Navbar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.token);
      setMessage("Login berhasil!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage("Login gagal. Email atau password salah.");
    }
  };

  return (
    <>
    <Navbar />

    <div className="auth-container">
      
      <div className="auth-box">
        <h2>Login</h2>
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
        <button onClick={handleLogin}>Login</button>
        <p>
          Belum punya akun? <a href="/register">Register</a>
        </p>
      </div>
    </div>
    </>
    
  );
};

export default Login;
