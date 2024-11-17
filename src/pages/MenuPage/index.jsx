import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: null,
    prevPage: null,
    nexPage: null,
  });
  const [search, setSearch] = useState("");

  const getMenuList = () => {
    axios
      .get(
        `https://api.mudoapi.site/menus?page=${pagination.page}&perPage=${pagination.perPage}&search=${search}`
      )
      .then((res) => {
        setMenu(res.data.data.Data);
        console.log(res);
        setPagination({
          page: res.data.data.currentPage,
          perPage: res.data.data.perPage,
          total: res.data.data.total,
          prevPage: res.data.data.previousPage,
          nexPage: res.data.data.nextPage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(
        `https://api.mudoapi.site/menu/${id}`,
        config
      );
      getMenuList();
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    getMenuList();
  }, [pagination.page, search]);

  const handleNext = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };

  const handleBack = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  console.log(pagination);
  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>
      <p>Menu List</p>

      <div>
        <button disabled={pagination.page === 1} onClick={handleBack}>
          back
        </button>
        <button disabled={!pagination.nexPage} onClick={handleNext}>
          next
        </button>
      </div>
      {menu.map((item, idx) => {
        return (
          <div key={item.id} style={{ display: "flex", marginBottom: 40 }}>
            <p>{idx + 1}</p>
            <p>{item.name}</p>
            <p>{item.priceFormatted}</p>
            <img width={200} height={200} src={item.imageUrl} alt="" />
            <Link to={`/menu-detail/${item.id}`}>
              <button>detail</button>
            </Link>
            <button onClick={() => handleDelete(item.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default MenuPage;
