const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
{
title: {
type: String,
required: true,
enum: ["Mr.", "Mrs.", "Ms."]
},

firstName: {
  type: String,
  required: true,
  trim: true
},

lastName: {
  type: String,
  required: true,
  trim: true
},

phone: {
  type: String,
  required: true,
  trim: true
},

date: {
  type: String,
  required: true
},

time: {
  type: String,
  required: true
},

guests: {
  type: Number,
  required: true,
  min: 1,
  max: 20
},

specialRequest: {
  type: String,
  default: ""
},

message: {
  type: String,
  default: ""
},

status: {
  type: String,
  enum: ["Pending", "Confirmed", "Cancelled"],
  default: "Pending"
}


},
{
timestamps: true
}
);

module.exports = mongoose.model("Reservation", reservationSchema);
