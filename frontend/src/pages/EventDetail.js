import React, { useEffect, useState } from "react";
import { fetchEventById } from "../services/api";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventById(id).then((res) => setEvent(res.data));
  }, [id]);

  if (!event) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        {event.image_url && (
          <img
            src={event.image_url}
            className="img-fluid mb-3"
            alt={event.title}
            style={{
              borderRadius: "10px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        )}
        <h2>{event.title}</h2>
        <p className="text-muted">{event.description}</p>
        <hr />
        <p>
          <strong>📍 Location:</strong> {event.location}
        </p>
        <p>
          <strong>🗓️ Date:</strong> {event.date}
        </p>
        <p>
          <strong>⏰ Time:</strong> {event.time}
        </p>
        <p>
          <strong>💸 Price:</strong>{" "}
          {event.is_paid ? (
            `Rp${event.price}`
          ) : (
            <span className="text-success">Free</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;
