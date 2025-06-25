const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

router.get("/", eventController.getEvents);
router.get(
  "/my-events",
  authenticateToken,
  eventController.getEventsByOrganizer
);
router.get("/:id", eventController.getEventById);

router.post("/", authenticateToken, eventController.createEvent);
router.post("/:id/buy", authenticateToken, eventController.buyTicket);
router.post("/:id/review", authenticateToken, eventController.addReview);

module.exports = router;
