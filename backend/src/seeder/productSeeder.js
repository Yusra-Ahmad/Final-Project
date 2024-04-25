import mongoose from "mongoose";
import Products from "../models/Products.js";
import { config } from "dotenv";

config();
const productsData = [
  {
    title: "Face Wash",
    description: "Gentle face wash to remove impurities and rejuvenate skin.",
    image: "uploads/facewash.jpg",
    price: 30,
  },
  {
    title: "Face Serum",
    description: "Luxurious serum to reduce wrinkles and revitalize skin.",
    image: "uploads/faceserum.jpg",
    price: 20,
  },
  {
    title: "Night Cream",
    description: "Hydrating night cream for soft and supple morning skin.",
    image: "uploads/nightcream.jpg",
    price: 25,
  },
  {
    title: "Body Wash",
    description: "Invigorating body wash for refreshed and revitalized skin.",
    image: "uploads/bodywash.jpg",
    price: 50,
  },
  {
    title: "Hair Spray",
    description: "Versatile hair spray for salon-worthy styles.",
    image: "uploads/hairspray.jpg",
    price: 40,
  },
  {
    title: "Foot Cream",
    description: "Soothing foot cream for tired and rejuvenated feet.",
    image: "uploads/footcream.jpg",
    price: 40,
  },
  {
    title: "Hand Cream",
    description: "Hydrating hand cream for smooth and supple hands.",
    image: "uploads/handcream.jpg",
    price: 40,
  },
  {
    title: "Face Oil",
    description: "Luxurious face oil for radiant and hydrated complexion.",
    image: "uploads/faceoil.jpg",
    price: 40,
  },
  {
    title: "Body Scrub",
    description: "Exfoliating body scrub for softer and smoother skin.",
    image: "uploads/bodyscrub.jpg",
    price: 40,
  },
  {
    title: "Lip Balm",
    description: "Moisturizing lip balm for soft and nourished lips.",
    image: "uploads/lipbalm.jpg",
    price: 10,
  },
  {
    title: "Sunscreen Lotion",
    description: "Protective sunscreen lotion with SPF 50 for all-day sun protection.",
    image: "uploads/sunscreen.jpg",
    price: 15,
  },
  {
    title: "Eye Cream",
    description: "Revitalizing eye cream to reduce dark circles and puffiness.",
    image: "uploads/eyecream.jpg",
    price: 35,
  }
];


// Function to seed products
async function seedProducts() {
  try {
    await Products.deleteMany();
    await Products.insertMany(productsData);
    console.log("Products seeded successfully.");
  } catch (err) {
    console.error("Error seeding products:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database.");
    seedProducts();
  })
  .catch((err) => console.error("Error connecting to the database:", err));
