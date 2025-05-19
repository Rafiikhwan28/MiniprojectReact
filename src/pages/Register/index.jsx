import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import './register.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      setMessage("❌ Email dan password harus diisi!");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "https://reqres.in/api/register",
        { email, password },
        {
          headers: { "x-api-key": "reqres-free-v1" },
        }
      );
      setMessage("✅ Registrasi berhasil! Mengarahkan ke login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(`❌ ${error.response.data.error}`);
      } else {
        setMessage("❌ Registrasi gagal. Pastikan data valid.");
      }
    } finally {
      setLoading(false);
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
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button onClick={handleRegister} disabled={loading}>
            {loading ? "Memproses..." : "Register"}
          </button>
          <p>
            Sudah punya akun? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
