import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const DetailMenuPage = () => {
  const [menu, setMenu] = useState({});
  const { id } = useParams();

  const getDetailMenu = () => {
    axios
      .get(`https://api.mudoapi.site/menu/${id}`)
      .then((res) => {
        setMenu(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailMenu();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>User Detail Page</h1>
      <p>User Detail</p>
      <div>
        <p>{menu?.name}</p>
        <p>{menu?.description}</p>
        <p>{menu?.type}</p>
        <img width={200} height={200} src={menu?.imageUrl} alt="" />
        <p>{menu?.priceFormatted}</p>
      </div>
    </div>
  );
};

export default DetailMenuPage;
