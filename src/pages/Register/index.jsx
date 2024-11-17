import axios from "axios";
import { useState } from "react";
import './style.css'
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    userName: "",
    password: "",
    roleId: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      roleId: parseInt(form.roleId),
    };

    axios
      .post("https://api.mudoapi.site/register", payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="logo">Registrasi</div>
      <input className="name"
        type="text"
        value={form.name}
        name="name"
        onChange={handleChange}
        placeholder="name"
      /><br></br>
      <input className="username"
        type="test"
        value={form.userName}
        name="userName"
        onChange={handleChange}
        placeholder="username"
      /><br></br>
      <input className="password"
        type="password"
        value={form.password}
        name="password"
        onChange={handleChange}
        placeholder="password"
      /><br></br>
      <input className="role"
        type="text"
        value={form.roleId}
        name="roleId"
        onChange={handleChange}
        placeholder="role"
      /><br></br>

      <button className="buton-register" onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default Register;

// protectedRoute
// Delete
// Create
