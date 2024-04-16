
import { Router } from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
import appointmentController from "../controller/appointmentController.js";

const appointmentRouter = Router();

// Book an appointment
appointmentRouter.post("/book", appointmentController.bookAppointment);

// Get appointments for a user
// appointmentRouter.get("/user", authMiddleware, appointmentController.getUserAppointments);

export default appointmentRouter;