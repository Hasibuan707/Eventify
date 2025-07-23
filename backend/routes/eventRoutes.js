const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/authMiddleware");

// Upload image
router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// GET all events
router.get("/", eventController.getEvents);

// GET events by organizer (harus sudah login)
router.get(
  "/my-events",
  authenticateToken,
  eventController.getEventsByOrganizer
);

// GET single event by id
router.get("/:id", eventController.getEventById);

// POST create event
router.post("/", authenticateToken, eventController.createEvent);

// POST buy ticket
router.post("/:id/buy", authenticateToken, eventController.buyTicket);

// POST add review
router.post("/:id/review", authenticateToken, eventController.addReview);

module.exports = router;


