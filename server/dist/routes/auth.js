"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const _router = (0, express_1.Router)();
_router.post("/login", auth_1.login);
exports.router = _router;
