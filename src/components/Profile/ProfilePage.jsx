import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import './style.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const source = axios.CancelToken.source();

    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Kita fetch data semua users dari page 1 dulu (atau bisa paging lengkap kalau perlu)
        const response = await axios.get(`https://reqres.in/api/users?page=1`, {
          headers: {
            Authorization: `Bearer ${token}`,  // misal perlu, bisa dihapus jika tidak perlu
            "x-api-key": "reqres-free-v1",
          },
          cancelToken: source.token,
        });

        if (response.data && response.data.data) {
          // Cari user yang id-nya sama dengan userId
          const foundUser = response.data.data.find(u => u.id === parseInt(userId));

          if (foundUser) {
            setUser(foundUser);
          } else {
            setError("User tidak ditemukan pada data.");
          }
        } else {
          setError("Data user tidak tersedia.");
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Gagal mengambil data profil:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_id");
          navigate("/login");
        } else {
          setError("❌ Gagal memuat profil pengguna.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    return () => {
      source.cancel("Component unmounted, cancel pending request");
    };
  }, [navigate, token, userId]);

  if (loading) return (
    <>
      <Navbar />
      <div className="container"><p className="loading-text">⏳ Memuat profil...</p></div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div className="container"><p className="error-message">{error}</p></div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="container profile-container">
        <h1>Profil Saya</h1>
        {user && (
          <div className="user-detail-card">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="user-avatar-large"
              onError={(e) => e.target.src = "https://via.placeholder.com/150"}
            />
            <div className="user-info">
              <p><strong>Nama:</strong> {user.first_name} {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
