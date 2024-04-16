
import Appointment from "../models/Appointment.js";

const appointmentController = {
    bookAppointment: async (req, res) => {
        try {
            const { serviceId, date, startTime, endTime } = req.body;
            const newAppointment = new Appointment({
                service: serviceId,
                date,
                startTime,
                
                customer: req.user._id // Assuming user is authenticated
            });
            await newAppointment.save();
            res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserAppointments: async (req, res) => {
        try {
            const appointments = await Appointment.find({ customer: req.user._id }).populate('service');
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default appointmentController;