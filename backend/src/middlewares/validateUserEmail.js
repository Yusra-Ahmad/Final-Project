import { body } from "express-validator";
import { User } from "../models/User.js";

const validateUserEmail = [
  body("email").custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("E-mail already in use");
    }
  }),
];
export default validateUserEmail;
