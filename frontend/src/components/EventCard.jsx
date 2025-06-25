import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => (
  <div className="col-md-4 mb-3">
    <div className="card">
      <img
        src={event.image_url}
        className="card-img-top"
        alt={event.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">{event.location}</p>
        <p className="card-text">
          <strong>{event.is_paid ? `IDR ${event.price}` : "Free"}</strong>
        </p>
        <Link to={`/events/${event.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default EventCard;
