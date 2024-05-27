import { body, validationResult } from "express-validator";
import { User } from "../models/User.js";

const validateUser = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be  at leasst 8 character long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character")
    .matches(/[A-Z]/)
    .withMessage("Password must contain one uppercase letter"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    next({ status: 400, message: errors.array() });
  },
];

export default validateUser;
