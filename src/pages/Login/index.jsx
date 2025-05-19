import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './login.css';
import Navbar from "../../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validasi input kosong
    if (!email || !password) {
      setMessage("❌ Email dan password harus diisi!");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        { email, password },
        {
          headers: {
            "x-api-key": "reqres-free-v1", // optional karena Reqres tetap jalan tanpa ini
          },
        }
      );

      // Simpan token & navigasi
      localStorage.setItem("access_token", response.data.token);
      setMessage("✅ Login berhasil! Mengarahkan ke menu...");
      setTimeout(() => navigate("/menu-page"), 2000);
    } catch (error) {
      if (error.response?.data?.error) {
        setMessage(`❌ ${error.response.data.error}`);
      } else {
        setMessage("❌ Login gagal. Silakan coba lagi.");
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
          <h2>Login</h2>
          {message && <p className="auth-message">{message}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </button>

          <p>
            Belum punya akun? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
