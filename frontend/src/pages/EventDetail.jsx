import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById, buyTicket } from "../services/api";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ticketType, setTicketType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [referral, setReferral] = useState("");
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    fetchEventById(id)
      .then((res) => {
        setEvent(res.data);
        setTicketType(res.data.ticket_types?.[0]?.type || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch event:", err);
        setLoading(false);
      });
  }, [id]);

  const formatIDR = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const handleBuy = async () => {
    if (!ticketType) return alert("Pilih jenis tiket terlebih dahulu.");
    setBuying(true);
    try {
      const res = await buyTicket(id, {
        type: ticketType,
        quantity,
        referral_code: referral,
      });
      alert(`🎉 Berhasil beli tiket! Total: ${formatIDR(res.data.total)}`);
    } catch (err) {
      alert(
        "❌ Gagal beli tiket: " + (err.response?.data?.message || err.message)
      );
    }
    setBuying(false);
  };

  if (loading)
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Memuat detail event...</p>
      </div>
    );

  if (!event)
    return (
      <div className="container text-center py-5">
        <h4 className="text-muted">😢 Event tidak ditemukan.</h4>
      </div>
    );

  return ( 
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <img
            src={
              event.image_url ||
              "https://via.placeholder.com/600x400?text=Event+Image"
            }
            alt={event.title}
            className="img-fluid rounded shadow-sm"
            style={{ objectFit: "cover", width: "100%", maxHeight: "400px" }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{event.title}</h2>
          <p>
            <strong>📌 Lokasi:</strong> {event.location}
          </p>
          <p>
            <strong>📅 Tanggal:</strong> {event.date}
          </p>
          <p>
            <strong>⏰ Waktu:</strong> {event.time}
          </p>
          <p>
            <strong>📂 Kategori:</strong> {event.category}
          </p>
          <p>
            <strong>🪑 Sisa Kursi:</strong> {event.seats}
          </p>
          <p className="text-muted">
            <strong>📝 Deskripsi:</strong>
            <br />
            {event.description}
          </p>
        </div>
      </div>

      {/* Jenis Tiket */}
      {event.ticket_types?.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-3">🎟️ Pilih Jenis Tiket</h4>
          <div className="row">
            {event.ticket_types.map((ticket) => (
              <div key={ticket.type} className="col-md-4">
                <div
                  className={`card mb-3 shadow-sm ${
                    ticketType === ticket.type ? "border-primary" : ""
                  }`}
                >
                  <div className="card-body">
                    <h5 className="card-title">{ticket.type}</h5>
                    <p className="card-text">{formatIDR(ticket.price)}</p>
                    <p className="text-muted">Kuota: {ticket.quota}</p>
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => setTicketType(ticket.type)}
                    >
                      {ticketType === ticket.type ? "✅ Dipilih" : "Pilih"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promo / Diskon */}
      {event.promotions?.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-3">🧾 Promo & Diskon</h4>
          <ul className="list-group">
            {event.promotions.map((promo, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {promo.type === "referral" ? "Referral Code" : "Promo"}:{" "}
                  <strong>{promo.code}</strong>
                </span>
                <span className="badge bg-success">
                  {promo.discount_percentage}% OFF
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pembelian Tiket */}
      <div className="mb-5">
        <h4 className="mb-3">🛒 Form Pembelian Tiket</h4>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-control"
              placeholder="Jumlah Tiket"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className="form-control"
              placeholder="Kode Referral (opsional)"
            />
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-primary w-100"
              onClick={handleBuy}
              disabled={buying}
            >
              {buying ? "Memproses..." : "🎟️ Beli Sekarang"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
