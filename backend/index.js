const express = require("express");
const cors = require("cors");
require("dotenv").config();
const eventsRoutes = require("./routes/eventsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
