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
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login berhasil!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login gagal. Periksa email atau password.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div
        className="card p-4 shadow-lg text-white"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#00ffff" }}>
          🚀 Eventify Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">📧 Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control bg-transparent text-white border-secondary"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">🔒 Password</label>
            <input
              type="password"
              name="password"
              className="form-control bg-transparent text-white border-secondary"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 mt-2"
            style={{
              background: "linear-gradient(to right, #00c6ff, #0072ff)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              transition: "0.3s",
            }}
          >
            🔓 Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <small>
            Don't have an account?{" "}
            <a
              href="/register"
              style={{ color: "#00ffff", textDecoration: "none" }}
            >
              Register Here
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
