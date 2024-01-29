"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SREVER_PORT = process.env.SERVER_PORT || "3003";
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || "24h";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
const PASSWORD_SALT_ROUNDS = process.env.PASSWORD_SALT_ROUNDS || "10";
const config = {
    server: {
        port: parseInt(SREVER_PORT),
    },
    token: {
        expirationTime: TOKEN_EXPIRATION_TIME,
        secret: TOKEN_SECRET,
    },
    password: {
        salt: parseInt(PASSWORD_SALT_ROUNDS),
    },
};
exports.default = config;
