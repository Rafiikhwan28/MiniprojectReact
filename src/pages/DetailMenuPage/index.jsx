import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import './Detail.css';

const DetailUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDetailUser = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        if (res.data && res.data.data) {
          setUser(res.data.data);
        } else {
          setError("User not found.");
        }
      })
      .catch((err) => {
        setError("Failed to load user data.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDetailUser();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>User Detail Page</h1>
        <p>Detail pengguna berdasarkan ID</p>

        {loading && <p>Memuat data...</p>}
        {error && <p className="error-message">{error}</p>}

        {user && !loading && !error && (
          <div className="user-detail-card">
            <img
              width={200}
              height={200}
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name} avatar`}
              className="user-avatar-large"
            />
            <p><strong>Nama:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <Link to="/menu-page">
              <button className="btn back-btn">Kembali ke User List</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailUserPage;
