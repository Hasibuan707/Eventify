import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎟️ Eventify
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav gap-3 align-items-center">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">
                    👋 Hi, <strong>{user.name}</strong>
                    <span className="badge bg-success ms-2 text-uppercase">
                      {user.role}
                    </span>
                  </span>
                </li>

                {user?.role === "organizer" && (
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      className="btn btn-outline-light btn-sm"
                    >
                      📊 Dashboard
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link
                    to="/my-tickets"
                    className="btn btn-outline-warning btn-sm"
                  >
                    🎫 My Tickets
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-outline-light btn-sm">
                    🔐 Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-outline-info btn-sm">
                    📝 Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
