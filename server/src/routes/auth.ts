import { Router } from "express";

const _router: Router = Router();

_router.post("/login", (_, res) => {
    res.status(200).send("Login")
});

export const router = _router;
