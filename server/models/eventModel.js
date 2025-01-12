const mongoose = require("mongoose");
const userModel = require("./userModel");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  attendeCount: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const eventModel = mongoose.model("events", eventSchema);
module.exports = eventModel;
