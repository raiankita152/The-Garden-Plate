const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reservations", reservationRoutes);

// Test Route
app.get("/", (req, res) => {
res.send("The Garden Plate Backend is Running!");
});

// Connect MongoDB and then start server
const startServer = async () => {
try {
await mongoose.connect(process.env.MONGO_URI);

```
console.log("MongoDB Connected Successfully!");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

} catch (error) {
console.error("MongoDB Connection Error:", error.message);
}
};

startServer();

