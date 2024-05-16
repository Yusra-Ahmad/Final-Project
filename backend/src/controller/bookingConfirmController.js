import Appointment from "../models/Appointment.js";
import BookingConfirm from "../models/BookingConfirm.js";

const bookingConfirmController = {
  bookingConfirmSend: async (req, res) => {
    try {
      const { bookedServices } = req.body;
  

      if (!bookedServices || !Array.isArray(bookedServices)) {
        return res.status(400).json({ message: "Invalid data format" });
      }
else if(bookedServices.length === 0){
  return res.status(400).json({message:"Please select the appointment to confirm"})
}
      // Save each booked service to the database
      const newBookings = bookedServices.map((service) => ({
        service: service.service,
        startTime: service.startTime,
        price: service.price,
        user: service.user,
      }));
   


     const  user= bookedServices[0].user

      await BookingConfirm.insertMany(newBookings);

      const result = await Appointment.deleteMany({ user });


      res.status(200).json({ message: "Booking confirmed successfully" });
    } catch (error) {
      console.error("Error processing booking:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  deleteAllBookingConfirm: async (req, res, next) => {
    try {
      await BookingConfirm.deleteMany();
      res.json({ message: "All Confirmed bookings deleted!" });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  },

  //   deleteSingleAppointment: async (req, res) => {
  //     try {
  //       const { service } = req.params;
  //       const deletedAppointment = await Appointment.findOneAndDelete({ service: service });
  //       if (!deletedAppointment) {
  //         return res.status(404).json({ message: "Appointment not found" });
  //       }
  //       return res.status(200).json({ message: "Appointment deleted successfully" });
  //     } catch (error) {
  //       console.error("Error deleting appointment:", error);
  //       return res.status(500).json({ message: "Internal server error" });
  //     }
  //   },

  getUserConfirmedBooking: async (req, res) => {
    try {
      const { user } = req.params;

      const bookingConfirms = await BookingConfirm.find();

      const filteredBookingConfirm = bookingConfirms.filter(
        (bookingConfirm) => user === bookingConfirm.user.valueOf()
      );

      res.status(200).json(filteredBookingConfirm);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //   getAllBookingHistory:async(req,res,next)=> {
  //     try {
  //       const {user}=req.params
  //       const appointments = await Appointment.find();
  // console.log(appointments.length);
  //       const allUserBookings = appointments.filter(
  //         (appointment) => user !== appointment.user.valueOf()
  //       );
  //       console.log("All User booking length", allUserBookings.length);
  //       res.send(allUserBookings)
  //     } catch (error) {
  //       next({ status: 500, message: error.message });
  //     }
  //   }
};

export default bookingConfirmController;
