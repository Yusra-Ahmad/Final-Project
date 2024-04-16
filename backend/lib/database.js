import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("[DB] connected!");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
