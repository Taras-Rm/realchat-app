"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const _router = (0, express_1.Router)();
_router.post("/login", (_, res) => {
    res.status(200).send("Login");
});
exports.router = _router;
