import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import AppError from "../utils/AppError.js";
import HTTP_STATUS from "../constants/HttpStatus.js";

export const createBooking = async ({ userId, eventId, quantity }) => {
  const event = await Event.findById(eventId);
  if (!event) throw new AppError("Event not found", HTTP_STATUS.NOT_FOUND);

  const available = event.totalTickets - event.ticketsSold;
  if (quantity > available) {
    throw new AppError("Not enough tickets available", HTTP_STATUS.BAD_GATEWAY);
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
  if (!booking) throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);

  booking.status = "CONFIRMED";
  await booking.save();
  return booking;
};

export const cancelBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId).populate("event");
  if (!booking) throw new AppError("Booking not found", HTTP_STATUS.NOT_FOUND);

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
