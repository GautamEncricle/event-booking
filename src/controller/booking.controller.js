import * as bookingService from "../services/booking.service.js";
import catchAsync from "../utils/catchAsync.js";
import HTTP_STATUS from "../constants/HttpStatus.js";

const createBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.createBooking({
    userId: req.user.id,
    eventId: req.body.eventId,
    quantity: req.body.quantity,
  });
  res.status(HTTP_STATUS.CREATED).json(booking);
});

const confirmBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.confirmBooking(
    req.params.id,
    req.user.id
  );
  res.status(HTTP_STATUS.OK).json(booking);
});

const cancelBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.cancelBooking(
    req.params.id,
    req.user.id
  );
  res.status(HTTP_STATUS.NO_CONTENT).json(booking);
});

const getUserBookings = catchAsync(async (req, res) => {
  const bookings = await bookingService.getUserBookings(req.user.id);
  res.status(HTTP_STATUS.OK).json(bookings);
});

const bookingController = {
  createBooking,
  confirmBooking,
  cancelBooking,
  getUserBookings,
};

export default bookingController;
