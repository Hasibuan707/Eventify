import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => (
  <div className="col-md-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5>{event.title}</h5>
        <p>{event.location}</p>
        <p>
          <strong>{event.is_paid ? `IDR ${event.price}` : "Free"}</strong>
        </p>
        <Link to={`/events/${event.id}`} className="btn btn-primary">
          Details
        </Link>
      </div>
    </div>
  </div>
);

export default EventCard;
