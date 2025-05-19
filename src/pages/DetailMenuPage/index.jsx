import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import './Detail.css';

const DetailUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const source = axios.CancelToken.source();

    const fetchUserDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://reqres.in/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Contoh header auth
            "x-api-key": "reqres-free-v1",    // Optional sesuai API
          },
          cancelToken: source.token,
        });

        if (res.data?.data) {
          setUser(res.data.data);
        } else {
          setError("User tidak ditemukan.");
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Request dibatalkan, jangan set state
          return;
        }
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
        } else {
          setError("❌ Gagal mengambil data user.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();

    return () => {
      source.cancel("Component unmounted, cancel pending request");
    };
  }, [id, navigate, token]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="detail-title">Detail Pengguna</h1>
        <p className="detail-subtitle">Informasi lengkap pengguna berdasarkan ID</p>

        {loading && <p className="loading-text">⏳ Memuat data...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && user && (
          <div className="user-detail-card">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="user-avatar-large"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            />
            <div className="user-info">
              <p><strong>Nama:</strong> {user.first_name} {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <Link to="/menu-page">
              <button className="btn back-btn">⬅ Kembali ke Daftar User</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailUserPage;
