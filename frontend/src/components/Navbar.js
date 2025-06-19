import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link
          style={{ fontWeight: "bold", fontSize: "25px" }}
          className="navbar-brand"
          to="/"
        >
          🎫 Eventify
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
