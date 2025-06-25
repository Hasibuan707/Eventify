const express = require("express");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const ticketRoutes = require("./routes/ticketRoutes"); // ✅

app.use("/api/tickets", ticketRoutes); // ✅
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve gambar

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
