import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import appointmentController from "../controller/appointmentController.js";

const bookingRouter = Router();
bookingRouter.get("/booking", appointmentController.getAllBookingHistory)
export default bookingRouter