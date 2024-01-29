"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const express_validator_1 = require("express-validator");
const _router = (0, express_1.Router)();
_router.post("/login", (0, validationMiddleware_1.validate)([
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3, max: 1000 })
        .withMessage("name must be (min 3, max 1000)"),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password must be (min 8)"),
]), auth_1.login);
exports.router = _router;
