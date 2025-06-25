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
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          onChange={handleChange}
          required
        />
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
        <select
          name="role"
          className="form-control mb-2"
          onChange={handleChange}
        >
          <option value="customer">Customer</option>
          <option value="organizer">Organizer</option>
        </select>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
