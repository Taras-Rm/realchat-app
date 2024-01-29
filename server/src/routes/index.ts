import { Router } from "express";
import { router as AuthRouter } from "./auth";

const _router: Router = Router();

_router.use("/auth", AuthRouter);

export const router = _router;