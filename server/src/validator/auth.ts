import { body } from "express-validator";
import { validate } from "../middlewares/validationMiddleware";

export const loginValidator = validate([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 1000 })
    .withMessage("name must be (min 3, max 1000)")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("not allowed character in name"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be (min 8)"),
]);
