const pool = require("../config/db");

exports.getEvents = async (req, res) => {
  try {
    const { search } = req.query;
    const result = search
      ? await pool.query(
          "SELECT * FROM events WHERE title ILIKE $1 ORDER BY date ASC",
          [`%${search}%`]
        )
      : await pool.query("SELECT * FROM events ORDER BY date ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Event not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

exports.getEventsByOrganizer = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE organizer_id = $1",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch organizer events" });
  }
};

exports.createEvent = async (req, res) => {
  const {
    title,
    category,
    location,
    date,
    time,
    description,
    price,
    is_paid,
    seats,
    image_url,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO events (title, category, location, date, time, description, price, is_paid, seats, image_url, organizer_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [
        title,
        category,
        location,
        date,
        time,
        description,
        price,
        is_paid,
        seats,
        image_url,
        req.user.id,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.buyTicket = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  try {
    const eventResult = await pool.query("SELECT * FROM events WHERE id = $1", [
      eventId,
    ]);
    const event = eventResult.rows[0];

    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.seats <= 0)
      return res.status(400).json({ error: "No more seats available" });

    const ticketCode = `TICKET-${Date.now()}`;
    await pool.query(
      `INSERT INTO transactions (event_id, user_id, amount_paid, ticket_code) VALUES ($1, $2, $3, $4)`,
      [eventId, userId, event.is_paid ? event.price : 0, ticketCode]
    );

    await pool.query("UPDATE events SET seats = seats - 1 WHERE id = $1", [
      eventId,
    ]);

    res.json({ message: "Ticket purchased", ticket_code: ticketCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to buy ticket" });
  }
};

exports.addReview = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;
  const { rating, comment } = req.body;

  try {
    await pool.query(
      "INSERT INTO reviews(event_id, user_id, rating, comment) VALUES($1, $2, $3, $4)",
      [eventId, userId, rating, comment]
    );
    res.json({ message: "Review submitted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
};
