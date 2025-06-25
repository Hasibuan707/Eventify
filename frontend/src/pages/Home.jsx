import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

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
    <>
      <div className="container py-5">
        <h2 className="mb-4 text-center">🎉 Upcoming Events</h2>

        <div className="mb-4 d-flex justify-content-center">
          <input
            type="text"
            placeholder="Search events by name or location..."
            className="form-control w-50 shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="row">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="text-center text-muted py-5">
              <p>😕 No events found.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
