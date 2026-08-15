const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const reservationRoutes = require("./routes/reservationRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationRoutes);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("The Garden Plate Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});