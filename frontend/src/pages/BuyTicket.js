import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buyTicket, fetchEventById } from "../services/api";

const BuyTicket = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventById(id).then((res) => setEvent(res.data));
  }, [id]);

  const handleBuy = async () => {
    if (!event) return;
    const total_price = event.price * quantity;
    await buyTicket(id, {
      user_id: 2, // hardcoded; you can replace with logged in user ID
      quantity,
      total_price,
    });
    alert("Ticket purchased!");
    navigate(`/events/${id}`);
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Buy Ticket - {event.title}</h2>
      <p>Price: {event.is_paid ? `IDR ${event.price}` : "Free"}</p>
      <p>Seats Available: {event.seats}</p>
      <input
        type="number"
        className="form-control mb-2"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        max={event.seats}
      />
      <button className="btn btn-primary" onClick={handleBuy}>
        Buy {event.is_paid ? `for IDR ${event.price * quantity}` : "Free"}
      </button>
    </div>
  );
};

export default BuyTicket;
