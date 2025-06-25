const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const pool = require("../config/db");

// GET /api/tickets
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.id, t.ticket_code, e.title as event_title, e.date as event_date
       FROM tickets t
       JOIN events e ON t.event_id = e.id
       WHERE t.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

module.exports = router;
