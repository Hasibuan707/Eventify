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
  if (!user || user.role !== "organizer") {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    setForm((prev) => ({ ...prev, organizer_id: user.id }));
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
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-2"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          className="form-control mb-2"
          placeholder="Category"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          className="form-control mb-2"
          placeholder="Price (IDR)"
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          className="form-control mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          className="form-control mb-2"
          placeholder="Location"
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          type="number"
          name="seats"
          className="form-control mb-2"
          placeholder="Total Seats"
          onChange={handleChange}
        />
        <input
          type="file"
          className="form-control mb-2"
          onChange={handleImageUpload}
        />
        {loadingImage && <p>Uploading image...</p>}
        <label>
          <input type="checkbox" name="is_paid" onChange={handleChange} /> Paid
          Event
        </label>
        <br />
        <button className="btn btn-success mt-2">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
