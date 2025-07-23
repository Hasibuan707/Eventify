import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "rgba(9, 108, 151, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 255, 255, 0.2)",
        padding: "15px 30px",
        zIndex: 1000,
      }}
    >
      <Link
        className="navbar-brand"
        to="/"
        style={{
          color: "#00ffff",
          fontWeight: "bold",
          fontSize: "1.8rem",
          textShadow: "0 0 6px #00ffff",
        }}
      >
        🎫 Eventify
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        {user && (
          <>
            <Link to="/create-event" style={linkStyle}>
              ➕ Create Event
            </Link>

            <Link to="/my-tickets" style={linkStyle}>
              🎟️ My Tickets
            </Link>
          </>
        )}

        {!user ? (
          <Link
            to="/login"
            style={{
              background: "linear-gradient(45deg, #00ffff, #00ff88)",
              color: "#000",
              padding: "7px 16px",
              borderRadius: "25px",
              fontWeight: "bold",
              boxShadow: "0 0 10px #00ffff",
              textDecoration: "none",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Login
          </Link>
        ) : (
          <>
            <span
              onClick={() => navigate("/profile")}
              style={{
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: 500,
                textShadow: "0 0 5px #00ffff",
              }}
            >
              👤 {user.name || user.email}
            </span>
            <button
              onClick={handleLogout}
              style={logoutStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff4d6d";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ff4d6d";
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// 💡 Styles
const linkStyle = {
  color: "#00ffff",
  fontWeight: "500",
  textDecoration: "none",
  padding: "6px 14px",
  borderRadius: "20px",
  transition: "all 0.3s",
  boxShadow: "0 0 6px rgba(0,255,255,0.3)",
  backgroundColor: "rgba(0, 255, 255, 0.1)",
};

const logoutStyle = {
  background: "transparent",
  border: "1px solid #ff4d6d",
  color: "#ff4d6d",
  padding: "6px 14px",
  borderRadius: "25px",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

export default Navbar;
