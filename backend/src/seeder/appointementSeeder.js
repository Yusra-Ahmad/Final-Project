// seeder/appointmentSeeder.js
import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";


async function seedAppointments() {
  try {

    await Appointment.deleteMany();


    const appointmentsData = [
      {
        service: "60f7cf1e47d8671ee8c8b3a1", 
        date: new Date(), 
        startTime: ["9:00 AM", "11:00 AM", "1:00 PM"], 
        
      },
   
    ];

 
    await Appointment.insertMany(appointmentsData);

    console.log("Appointments seeded successfully.");
  } catch (err) {
    console.error("Error seeding appointments:", err);
  } finally {
  
    mongoose.connection.close();
  }
}


mongoose
  .connect("mongodb+srv://yusraahmadaug:zDdpJaVmamzElknu@cluster0.jvsdwkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0") 
  .then(() => {
    console.log("Connected to the database.");
    seedAppointments();
  })
  .catch((err) => console.error("Error connecting to the database:", err));