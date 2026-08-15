const express = require("express");
const router = express.Router();

const {
createReservation
} = require("../controllers/reservationController");

// POST request to create a reservation
router.post("/", createReservation);

module.exports = router;
