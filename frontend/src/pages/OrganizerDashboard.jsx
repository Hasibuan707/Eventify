import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "organizer") return;

    const fetchMyEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/events/my-events",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [token, user]);

  if (!user || user.role !== "organizer") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-4">
      {/* User Profile */}
      <div className="card mb-4 p-3 shadow-sm">
        <h4 className="mb-3">👤 Organizer Profile</h4>
        <p>
          <strong>Name:</strong> {user.name || "Organizer Name"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      {/* Header and Create Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📋 My Events</h2>
        <Link to="/create" className="btn btn-success">
          ➕ Create Event
        </Link>
      </div>

      {/* Events Section */}
      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-muted">You haven't created any events yet.</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-md-4 mb-3">
              <div className="card h-100">
                {event.image_url && (
                  <img
                    src={event.image_url || "/placeholder.svg"}
                    className="card-img-top"
                    alt={event.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p>
                    {event.location} <br />
                    {new Date(event.date).toLocaleDateString()} {event.time}
                  </p>
                  <p className="text-success fw-bold">
                    {event.is_paid ? `Rp ${event.price}` : "Free"}
                  </p>
                  <Link
                    to={`/events/${event.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;
