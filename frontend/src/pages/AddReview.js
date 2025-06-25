import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reviewEvent } from "../services/api";

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user_id: 2, // hardcoded user ID
    rating: 5,
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reviewEvent(id, form);
    alert("Review submitted!");
    navigate(`/events/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="rating"
          className="form-control mb-2"
          value={form.rating}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star
            </option>
          ))}
        </select>
        <textarea
          name="comment"
          className="form-control mb-2"
          placeholder="Your feedback..."
          value={form.comment}
          onChange={handleChange}
        />
        <button className="btn btn-success">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
