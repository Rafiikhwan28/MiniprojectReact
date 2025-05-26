import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import DetailMenuPage from "./pages/DetailMenuPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LendingPage/LendingPage";
import ProfilePage from "./components/Profile/ProfilePage";
import PrivateRoute from "./components/PrivateRoute"; // sesuaikan path-nya

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/menu-page"
          element={
            <PrivateRoute>
              <MenuPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/menu-detail/:id"
          element={
            <PrivateRoute>
              <DetailMenuPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
