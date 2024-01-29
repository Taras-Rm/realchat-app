import { Router } from "express";
import { login } from "../controllers/auth";

const _router: Router = Router();

_router.post("/login", login);

export const router = _router;
