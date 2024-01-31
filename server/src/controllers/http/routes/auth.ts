import { Router } from "express";
import { login } from "../authController";
import { loginValidator } from "../../../validator/auth";

const router: Router = Router();

router.post("/login", loginValidator, login);

export default router;
