import Event from "../models/Event.js";
import AppError from "../utils/AppError.js";
import HTTP_STATUS from "../constants/HttpStatus.js";

export const getAllEvents = async () => {
  const events = await Event.find();
  if (!events) {
    throw new AppError("No events found", HTTP_STATUS.NOT_FOUND);
  }
  return events.map((event) => ({
    ...event.toObject(),
    availableTickets: event.totalTickets - event.ticketsSold,
  }));
};

export const createEvent = async (eventData) => {
  const event = await Event.create(eventData);
  if (!event) {
    throw new AppError(
      "Failed to create event",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
  return event;
};
