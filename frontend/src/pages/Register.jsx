import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registrasi berhasil. Silakan login.");
      navigate("/login");
    } catch (err) {
      alert("Registrasi gagal");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        className="p-4 shadow"
        style={{
          maxWidth: "420px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          color: "#fff",
        }}
      >
        <h3 className="text-center mb-4">🚀 Create Your Eventify Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div className="mb-4">
            <select
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
              style={{ ...inputStyle, color: "#fff", background: "#333" }}
            >
              <option value="customer">🎟️ Customer</option>
              <option value="organizer">📅 Organizer</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#00c6ff",
              border: "none",
              padding: "10px",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "0.3s",
            }}
          >
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#00c6ff", textDecoration: "none" }}
            >
              Login here
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "10px",
  color: "#fff",
  padding: "10px",
};

export default Register;
