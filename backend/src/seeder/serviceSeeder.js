import mongoose from "mongoose";
import Services from "../models/Services.js";
import { config } from "dotenv"

const servicesData = [
  {
    title: "Haircut",
    description: "Professional haircut service",
    price: 30,
    duration: "1 hour",
    
  },
  {
    title: "Manicure",
    description: "Nail care and manicure service",
    price: 20,
    duration: "1 hour",
  },

  {
    title: "Pedicure",
    description: "Nail care and pedicure service",
    price: 25,
    duration: "1 hour",
  
  },
  {
    title: "Massage",
    description: "Relaxing full body massage",
    price: 50,
    duration: "1 hour",
  },
  {
    title: "Facial",
    description: "Skin rejuvenation facial treatment",
    price: 40,
    duration: "1 hour",
    
  },
];
// Function to seed services into the database
async function seedServices() {
  try {
    // Clear existing services
    await Services.deleteMany();

    // Insert the new services
    await Services.insertMany(servicesData);

    console.log("Services seeded successfully.");
  } catch (err) {
    console.error("Error seeding services:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}
config()
// Connect to the database and run the seeder function
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to the database.");
    seedServices();
  })
  .catch((err) => console.error("Error connecting to the database:", err));
