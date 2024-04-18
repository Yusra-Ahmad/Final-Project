import Appointment from "../models/Appointment.js";

const appointmentController = {
  bookAppointment: async (req, res) => {
    try {
        const { user } = req.params;
        const { service, date, startTime } = req.body;
        const parsedStartTime = new Date(startTime);
      if (!service) {
        throw new error();
      }
      const newAppointment = new Appointment({
        service: service,
        date,
        startTime: parsedStartTime,
        user: req.body.user,
      });
      const appointments = await Appointment.find();
      const filteredAppointments = appointments.filter(
        (appointment) => user !== appointment.user.valueOf()
      );
      
      const serviceFilteredAppointment = filteredAppointments.filter(
        (appointment) => service.valueOf() === appointment.service.valueOf()
      );
 
      if (serviceFilteredAppointment.length != 0) {
        return res.status(400).json({ message: "Appointment for the same service already exists." })
    }
      const filteredTime = filteredAppointments.filter(
        (appointment) => date === appointment.date
      );
 
      if (filteredTime.length != 0) {
        return res.status(400).json({ message: "Appointment for the same time already exists." })
      }
      await newAppointment.save();
      res.status(201).json({
        message: "Appointment booked successfully",
        appointment: newAppointment,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteAllAppointments: async (req, res, next) => {
    try {
      await Appointment.deleteMany();
      res.json({ message: "All bookings deleted!" });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  },

  getUserAppointments: async (req, res) => {
    try {
      const { user } = req.params;
     
      const appointments = await Appointment.find();
      
      const filteredAppointments = appointments.filter(
        (appointment) => user === appointment.user.valueOf()
      );

      res.status(200).json(filteredAppointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default appointmentController;
