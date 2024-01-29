"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SREVER_PORT = process.env.SERVER_PORT || "3003";
const config = {
    server: {
        port: parseInt(SREVER_PORT),
    },
};
exports.default = config;
