import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import DetailMenuPage from "./pages/DetailMenuPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LendingPage/LendingPage";
import ProfilePage from "./components/Profile/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/menu-page" element={<MenuPage />} />
        <Route path="/menu-detail/:id" element={<DetailMenuPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
