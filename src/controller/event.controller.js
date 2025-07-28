import * as eventService from "../services/event.service.js";
import catchAsync from "../utils/catchAsync.js";
import HTTP_STATUS from "../constants/HttpStatus.js";
// import AppError from '../utils/AppError.js';

const getAllEvents = catchAsync(async (req, res) => {
  const events = await eventService.getAllEvents();
  res.status(HTTP_STATUS.OK).json({ data: events });
});

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(HTTP_STATUS.CREATED).json(event);
});

const eventController = {
  getAllEvents,
  createEvent,
};

export default eventController;
