import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Logo & Description */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold">🎫 Eventify</h4>
            <p className="text-muted">
              Discover and book amazing events around you. Whether free or paid,
              Eventify connects you with unforgettable experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-3">
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light text-decoration-none" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-light text-decoration-none"
                  to="/my-tickets"
                >
                  My Tickets
                </Link>
              </li>
              <li>
                <Link
                  className="text-light text-decoration-none"
                  to="/dashboard"
                >
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="text-light text-decoration-none"
                  to="/create-event"
                >
                  Create Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="col-md-4 mb-3">
            <h5>Connect With Us</h5>
            <p>Email: support@eventify.com</p>
            <div className="d-flex gap-3">
              <Link href="#" className="text-light fs-5">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link href="#" className="text-light fs-5">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link href="#" className="text-light fs-5">
                <i className="bi bi-twitter-x"></i>
              </Link>
              <Link href="#" className="text-light fs-5">
                <i className="bi bi-youtube"></i>
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center text-muted mb-0">
          &copy; {new Date().getFullYear()} Eventify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
