import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import SignIn from "./pages/SignIn";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </Router>
);

export default App;
