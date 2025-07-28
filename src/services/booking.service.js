import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import AppError from "../utils/AppError.js";

export const createBooking = async ({ userId, eventId, quantity }) => {
  const event = await Event.findById(eventId);
  if (!event) throw new AppError("Event not found", 404);

  const available = event.totalTickets - event.ticketsSold;
  if (quantity > available) {
    throw new AppError("Not enough tickets available", 400);
  }

  event.ticketsSold += quantity;
  await event.save();

  const booking = await Booking.create({
    user: userId,
    event: eventId,
    quantity,
    status: "PENDING",
  });

  return booking;
};

export const confirmBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new AppError("Booking not found", 404);

  booking.status = "CONFIRMED";
  await booking.save();
  return booking;
};

export const cancelBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId).populate("event");
  if (!booking) throw new AppError("Booking not found", 404);

  // Restore the tickets
  booking.event.ticketsSold -= booking.quantity;
  await booking.event.save();

  booking.status = "CANCELLED";
  await booking.save();
  return booking;
};

export const getUserBookings = async (userId) => {
  return Booking.find({ user: userId }).populate("event");
};
