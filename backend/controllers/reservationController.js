const Reservation = require("../models/Reservation");

// Create a new reservation
const createReservation = async (req, res) => {
try {
const {
title,
firstName,
lastName,
phone,
date,
time,
guests,
specialRequest,
message
} = req.body;

```
// Create and save reservation
const reservation = new Reservation({
  title,
  firstName,
  lastName,
  phone,
  date,
  time,
  guests,
  specialRequest,
  message
});

await reservation.save();

res.status(201).json({
  success: true,
  message: "Table reservation created successfully!",
  data: reservation
});
```

} catch (error) {
res.status(500).json({
success: false,
message: "Failed to create reservation",
error: error.message
});
}
};

module.exports = {
createReservation
};
