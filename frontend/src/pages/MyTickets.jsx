import React, { useEffect, useState } from "react";
import axios from "axios";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      }
    };

    fetchTickets();
  }, [token]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">🎫 My Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="row">
          {tickets.map((ticket) => (
            <div className="col-md-4 mb-3" key={ticket.id}>
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">{ticket.event_title}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {ticket.event_date}
                  </p>
                  <p className="card-text">
                    <strong>Ticket Code:</strong> {ticket.ticket_code}
                  </p>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket.ticket_code}&size=100x100`}
                    alt="QR"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
