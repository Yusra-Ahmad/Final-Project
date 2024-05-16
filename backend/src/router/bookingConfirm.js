import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import bookingConfirmController from "../controller/bookingConfirmController.js";

const bookingConfirmRouter = Router();

// Book an appointment
bookingConfirmRouter.post("/book", authMiddleware,bookingConfirmController.bookingConfirmSend);
bookingConfirmRouter.delete("/deleteall",bookingConfirmController.deleteAllBookingConfirm);
// bookingConfirmRouter.delete("/deleteone/:service", bookingConfirmController.deleteSingleAppointment);
bookingConfirmRouter.get("/:user", authMiddleware, bookingConfirmController.getUserConfirmedBooking);

export default bookingConfirmRouter;