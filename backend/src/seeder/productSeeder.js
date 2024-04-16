import mongoose from "mongoose";
import Products from "../models/Products.js";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const productsData = [
  {
    title: "Face Wash",
    description: "Refresh and cleanse your skin with our gentle yet effective face wash. Formulated with natural ingredients, it removes impurities while leaving your skin feeling smooth and rejuvenated.",
    image: "test",
    price: 30,
  },
  {
    title: "Face Serum",
    description: "Revitalize your skin with our luxurious face serum. Packed with nourishing botanicals and powerful antioxidants, it helps to reduce fine lines and wrinkles, giving you a radiant and youthful complexion.",
    image: "test",
    price: 20,
  },
  {
    title: "Night Cream",
    description: "Indulge in overnight skin renewal with our deeply hydrating night cream. Enriched with moisturizing ingredients, it replenishes lost moisture and repairs skin while you sleep, waking up to soft and supple skin every morning.",
    image: "test",
    price: 25,
  },
  {
    title: "Body Wash",
    description: "Treat yourself to a spa-like experience with our invigorating body wash. Infused with aromatic fragrances and moisturizing agents, it gently cleanses and hydrates your skin, leaving you feeling refreshed and revitalized.",
    image: "test",
    price: 50,
  },
  {
    title: "Hair Spray",
    description: "Achieve salon-worthy styles with our versatile hair spray. Whether you're looking for volume, hold, or shine, our non-sticky formula provides long-lasting results without weighing your hair down.",
    image: "test",
    price: 40,
  },
  {
    title: "Foot Cream",
    description: "Pamper tired feet with our soothing foot cream. Enriched with nourishing botanicals and cooling menthol, it softens rough skin, relieves dryness, and revitalizes tired feet, leaving them feeling refreshed and rejuvenated.",
    image: "test",
    price: 40,
  },
  {
    title: "Hand Cream",
    description: "Nourish and protect your hands with our hydrating hand cream. Infused with vitamin-rich oils and Shea butter, it absorbs quickly to replenish moisture and soften skin, keeping your hands smooth and supple throughout the day.",
    image: "test",
    price: 40,
  },
  {
    title: "Face Oil",
    description: "Restore radiance to your complexion with our luxurious face oil. Lightweight and fast-absorbing, it deeply nourishes and revitalizes dry skin, leaving it looking dewy, luminous, and beautifully hydrated.",
    image: "test",
    price: 40,
  },
  {
    title: "Body Scrub",
    description: "Reveal softer, smoother skin with our exfoliating body scrub. Formulated with natural exfoliants and moisturizing oils, it buffs away dead skin cells, unclogs pores, and promotes cell renewal for a healthy, radiant glow.",
    image: "test",
    price: 40,
  },
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
