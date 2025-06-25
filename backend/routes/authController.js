import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token); // ⬅️ Simpan token
      localStorage.setItem("user", JSON.stringify(res.data.user)); // ⬅️ Simpan user
      alert("Login berhasil");
      navigate("/");
    } catch (err) {
      alert("Login gagal");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
