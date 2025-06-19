import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => (
  <div className="col-md-4 mb-4">
    <div className="card shadow-sm h-100">
      {event.image_url && (
        <img
          src={event.image_url}
          className="card-img-top"
          alt={event.title}
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text text-muted mb-1">{event.location}</p>
        <p className="mb-2">
          <strong className={event.is_paid ? "text-danger" : "text-success"}>
            {event.is_paid ? `Rp${event.price}` : "Free"}
          </strong>
        </p>
        <Link
          to={`/event/${event.id}`}
          className="btn btn-outline-primary mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default EventCard;
