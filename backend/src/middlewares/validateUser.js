import { body, validationResult } from "express-validator";

const validateUser = [
  body("email").isEmail().withMessage("Must be a valid email").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be  at leasst 8 character"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    next({ status: 400, message: errors.array() });
  },
];

export default validateUser;
