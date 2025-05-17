import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import './style.css';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (err) {
      setError("Gagal mengambil data profil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container profile-page">
        {loading ? (
          <p className="loading-text">Loading profile...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : user ? (
          <div className="profile-card">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="profile-avatar" />
            <h2 className="profile-name">{user.first_name} {user.last_name}</h2>
            <p className="profile-email">{user.email}</p>
            <Link to="/menu">
              <button className="btn btn-primary">Kembali ke Menu</button>
            </Link>
          </div>
        ) : (
          <p className="error-message">Pengguna tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
