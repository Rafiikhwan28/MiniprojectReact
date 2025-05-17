import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import './style.css';

const MenuPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState(""); // Input dari user
  const [searchQuery, setSearchQuery] = useState(""); // Query yang digunakan untuk filter
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data dari API
  const getUserList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data || []);
      setTotalPages(response.data.total_pages || 0);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleBack = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1 className="page-title">User List</h1>
        <p className="page-subtitle">Page {page} of {totalPages}</p>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Cari nama pengguna..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="btn search-btn">Search</button>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="btn"
            disabled={page === 1 || loading}
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="btn"
            disabled={page === totalPages || loading}
            onClick={handleNext}
          >
            Next
          </button>
        </div>

        {/* Loading / Error Message */}
        {loading && <p className="loading-text">Loading users...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* User Cards */}
        <div className="user-list">
          {!loading && !error && filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className="user-card">
                <img src={user.avatar} alt={user.first_name} className="user-avatar" />
                <div className="user-info">
                  <h3>{user.first_name} {user.last_name}</h3>
                  <p>{user.email}</p>
                  <Link to={`/menu-detail/${user.id}`}>
                    <button className="btn detail-btn">Detail</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            !loading && !error && <p className="no-results">Tidak ada pengguna ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
