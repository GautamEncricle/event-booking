import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  totalTickets: Number,
  ticketsSold: { type: Number, default: 0 },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
