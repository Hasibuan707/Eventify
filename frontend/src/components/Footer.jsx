import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "#ffffff",
        paddingTop: "60px",
        paddingBottom: "40px",
        marginTop: "80px",
        borderTop: "2px solid #4e54c8",
      }}
    >
      <div className="container">
        <div className="row">
          {/* Logo & Description */}
          <div className="col-md-4 mb-4">
            <h2 style={{ fontWeight: "bold", color: "#00fff0" }}>
              <i className="bi bi-stars"></i> Eventify
            </h2>
            <p style={{ color: "#cfd8dc" }}>
              Your gateway to futuristic and unforgettable events. Discover.
              Create. Celebrate.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-4">
            <h5 style={{ color: "#80d8ff" }}>Explore</h5>
            <ul className="list-unstyled" style={{ lineHeight: "2" }}>
              <li>
                <Link className="text-decoration-none" style={linkStyle} to="/">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none"
                  style={linkStyle}
                  to="/create-event"
                >
                  🛠 Create Event
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none"
                  style={linkStyle}
                  to="/my-tickets"
                >
                  🎫 My Tickets
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none"
                  style={linkStyle}
                  to="/dashboard"
                >
                  📊 Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none"
                  style={linkStyle}
                  to="/login"
                >
                  🔐 Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h5 style={{ color: "#80d8ff" }}>Connect</h5>
            <p style={{ color: "#cfd8dc" }}>support@eventify.com</p>
            <div className="d-flex gap-3 mt-3">
              {socialLink("https://instagram.com", "bi-instagram")}
              {socialLink("https://facebook.com", "bi-facebook")}
              {socialLink("https://twitter.com", "bi-twitter-x")}
              {socialLink("https://youtube.com", "bi-youtube")}
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "#4e54c8" }} />
        <p className="text-center" style={{ color: "#a0aec0" }}>
          &copy; {new Date().getFullYear()}{" "}
          <span style={{ color: "#00fff0" }}>Eventify</span> — Powered by
          Tomorrow.
        </p>
      </div>
    </footer>
  );
};

// Neon-style link style
const linkStyle = {
  color: "#ffffff",
  transition: "color 0.3s",
};

const socialLink = (url, icon) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontSize: "1.5rem",
      color: "#ffffff",
      transition: "all 0.3s ease-in-out",
    }}
    onMouseEnter={(e) => (e.target.style.color = "#00fff0")}
    onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
  >
    <i className={`bi ${icon}`}></i>
  </a>
);

export default Footer;
