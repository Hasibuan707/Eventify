import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import BuyTicket from "./pages/BuyTicket";
import AddReview from "./pages/AddReview";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import MyTickets from "./pages/MyTickets";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/:id/buy" element={<BuyTicket />} />
        <Route path="/events/:id/review" element={<AddReview />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/register" element={<Register />} /> {/* ✅ Jika ada */}
        <Route path="/dashboard" element={<OrganizerDashboard />} />
        <Route path="/my-tickets" element={<MyTickets />} /> {/* ✅ */}
      </Routes>
    </Router>
  );
};

export default App;
