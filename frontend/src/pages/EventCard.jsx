import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => (
  <div className="col-md-4 mb-4">
    <div
      className="card h-100 text-white"
      style={{
        background:
          "linear-gradient(145deg, rgba(0, 0, 0, 0.6), rgba(25, 25, 50, 0.8))",
        border: "1px solid #00ffe7",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 20px #00ffe7cc",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 0 30px #00ffe7cc";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 0 20px #00ffe7cc";
      }}
    >
      {/* Event image */}
      <img
        src={
          event.image_url ||
          "https://via.placeholder.com/500x250?text=Event+Image"
        }
        alt={event.title}
        className="card-img-top"
        style={{
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      />

      {/* Card body */}
      <div className="card-body text-center">
        <h5
          style={{
            color: "#00ffe7",
            fontWeight: "bold",
            textShadow: "0 0 5px #00ffe7",
          }}
        >
          {event.title}
        </h5>
        <p className="text-light mb-1">📍 {event.location}</p>
        <p
          style={{
            color: event.is_paid ? "#FFD700" : "#00ff88",
            fontWeight: "bold",
          }}
        >
          {event.is_paid ? `IDR ${event.price.toLocaleString()}` : "FREE"}
        </p>

        {/* Detail button */}
        <Link
          to={`/events/${event.id}`}
          className="btn mt-2"
          style={{
            background: "#00ffe7",
            color: "#000",
            borderRadius: "30px",
            padding: "10px 25px",
            fontWeight: "bold",
            boxShadow: "0 0 10px #00ffe7, 0 0 20px #00ffe7",
            transition: "0.3s ease-in-out",
          }}
        >
          See Details
        </Link>
      </div>
    </div>
  </div>
);

export default EventCard;
