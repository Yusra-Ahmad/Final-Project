import mongoose from "mongoose";
import Services from "../models/Services.js";


const servicesData = [
  {
    title: "Haircut",
    description: "Professional haircut service",
    price: 30,
    duration: "1 hour",
    image:"test"
  },
  {
    title: "Manicure",
    description: "Nail care and manicure service",
    price: 20,
    duration: "45 minutes",
    image:"test"
  },

  {
    title: "Pedicure",
    description: "Nail care and pedicure service",
    price: 25,
    duration: "1 hour",
    image:"test"
  },
  {
    title: "Massage",
    description: "Relaxing full body massage",
    price: 50,
    duration: "1 hour 30 minutes",
    image:"test"
  },
  {
    title: "Facial",
    description: "Skin rejuvenation facial treatment",
    price: 40,
    duration: "1 hour",
    image:"test"
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

// Connect to the database and run the seeder function
mongoose
  .connect("mongodb+srv://sadhanasingh:sweethome@wd23.gklhd9p.mongodb.net/beauty")
  .then(() => {
    console.log("Connected to the database.");
    seedServices();
  })
  .catch((err) => console.error("Error connecting to the database:", err));
