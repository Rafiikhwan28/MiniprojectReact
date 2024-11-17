import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const payload = {
      username: email,
      password: password,
    };

    axios
      .post("https://api.mudoapi.site/login", payload)
      .then((res) => {
        const token = res?.data?.data?.token;
        localStorage.setItem("access_token", token);

        setSuccess(true);
        setError(false);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.log("err", err?.response);
        setError(err?.response.data.message);
        setSuccess("");
      });
  };

  return (
    <div className="login">
      <div className="logo">Login</div><br></br>
      {success && <p>login success</p>}
      {error && <p>{error}</p>}
      <input className="input-login" type="text" placeholder="email" onChange={handleChangeEmail} /><br></br>
      <input className="input-password"
        type="text"
        placeholder="password"
        onChange={handleChangePassword}
      /><br></br>
      <button className="buton-login" onClick={handleLogin}>login</button><br></br>
      <p> belum punya akun?<a className="reg" href="register">Register</a></p>
    </div>
  );
};

export default Login;

// buat halaman register
// integrasikan api register
// muncul erorr dan sukses
// redirect ke halaman login kalau sukses dalam 3 detik
