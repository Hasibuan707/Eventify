import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import Footer from "../components/Footer";
import EventCard from "./EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    fetchEvents({ search: debouncedQuery }).then((res) => setEvents(res.data));
  }, [debouncedQuery]);

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #1f1c2c, #928dab)",
        minHeight: "100vh",
        color: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      <div className="container py-5">
        <h1
          className="text-center mb-4"
          style={{
            fontWeight: 700,
            fontSize: "2.7rem",
            color: "#e0f7fa",
            textShadow: "1px 1px 10px rgba(0,0,0,0.3)",
          }}
        >
          🚀 Discover Exciting Events
        </h1>

        <div className="d-flex justify-content-center mb-5">
          <input
            type="text"
            placeholder="Search events by name or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control shadow-sm w-75"
            style={{
              maxWidth: "500px",
              borderRadius: "50px",
              padding: "12px 20px",
              fontSize: "1rem",
              background: "rgba(242, 246, 248, 01)",
              color: "black",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
            }}
          />
        </div>

        <div className="row justify-content-center">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="text-center text-light py-5">
              <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
                🔎 No events match your search.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
