import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

const MenuPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const source = axios.CancelToken.source();

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Contoh header auth jika diperlukan
            "x-api-key": "reqres-free-v1",     // Optional
          },
          cancelToken: source.token,
        });
        setUsers(response.data.data || []);
        setTotalPages(response.data.total_pages || 0);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Gagal mengambil data pengguna:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
        } else {
          setError("❌ Gagal memuat data pengguna.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      source.cancel("Component unmounted, cancel pending request");
    };
  }, [page, navigate, token]);

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handleBack = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="page-title">Daftar Pengguna</h1>
        <p className="page-subtitle">Halaman {page} dari {totalPages}</p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Cari pengguna..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <button onClick={handleSearch} className="btn search-btn">Cari</button>
        </div>

        <div className="pagination">
          <button className="btn" disabled={page === 1 || loading} onClick={handleBack}>⬅ Back</button>
          <button className="btn" disabled={page === totalPages || loading} onClick={handleNext}>Next ➡</button>
        </div>

        {loading && <p className="loading-text">⏳ Memuat data...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="user-list">
          {!loading && !error && filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className="user-card">
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="user-avatar"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <div className="user-info">
                  <h3>{user.first_name} {user.last_name}</h3>
                  <p>{user.email}</p>
                  <Link to={`/menu-detail/${user.id}`}>
                    <button className="btn detail-btn">Lihat Detail</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            !loading && !error && <p className="no-results">Tidak ada pengguna ditemukan.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
