import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    fetchEvents({ search: debouncedSearch, page }).then((res) => {
      if (page === 1) {
        setEvents(res.data);
      } else {
        setEvents((prev) => [...prev, ...res.data]);
      }
    });
  }, [debouncedSearch, page]);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-3 text-primary">🎉 Upcoming Events</h2>
        <input
          className="form-control mb-4"
          placeholder="🔍 Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="row">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
        <div className="text-center mt-3">
          <button
            className="btn btn-success"
            onClick={() => setPage((p) => p + 1)}
          >
            ⬇ Load More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
