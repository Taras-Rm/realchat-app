import { Router } from "express";
import { login } from "../controllers/auth";
import { validate } from "../middlewares/validationMiddleware";
import { body } from "express-validator";

const _router: Router = Router();

_router.post(
  "/login",
  validate([
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3, max: 1000 })
      .withMessage("name must be (min 3, max 1000)"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be (min 8)"),
  ]),
  login
);

export const router = _router;
