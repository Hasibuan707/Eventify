import React, { useState, useEffect } from "react";
import { createEvent } from "../services/api";
import { useNavigate, Navigate } from "react-router-dom";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: 0,
    date: "",
    time: "",
    location: "",
    description: "",
    seats: 0,
    is_paid: false,
    image_url: "",
    organizer_id: null,
  });

  const [loadingImage, setLoadingImage] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.role === "organizer") {
      setForm((prev) => ({ ...prev, organizer_id: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5000/api/events/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm({ ...form, image_url: data.imageUrl });
    } catch (err) {
      alert("Upload gagal");
    }
    setLoadingImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(form);
    alert("Event created!");
    navigate("/organizer-dashboard");
  };

  if (!user || user.role !== "organizer") {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center mt-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1f1c2c, #928dab)",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "16px",
          background: "#1e1e2f",
          color: "#f1f1f1",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: 600, color: "#00eaff" }}
        >
          Create Futuristic Event 🚀
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="form-control mb-3"
            placeholder="Event Title"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            className="form-control mb-3"
            placeholder="Category"
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            className="form-control mb-3"
            placeholder="Price (IDR)"
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            className="form-control mb-3"
            placeholder="Location"
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="Short Description"
            onChange={handleChange}
          />
          <input
            type="number"
            name="seats"
            className="form-control mb-3"
            placeholder="Total Seats"
            onChange={handleChange}
          />
          <input
            type="file"
            className="form-control mb-2"
            onChange={handleImageUpload}
          />
          {loadingImage && <p style={{ color: "#ccc" }}>Uploading image...</p>}

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="paidCheck"
              name="is_paid"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="paidCheck">
              Paid Event
            </label>
          </div>

          <button
            className="btn w-100"
            style={{
              background: "linear-gradient(to right, #00eaff, #007bff)",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            🚀 Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
