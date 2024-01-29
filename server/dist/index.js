"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
// Run server
function runServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Parse json body
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        // Api routes
        app.use("/api", routes_1.router);
        // Api healthcheck
        app.get("/ping", (_, res) => {
            res.status(200).json({ message: "pong" });
        });
        const port = config_1.default.server.port;
        // Listen port
        app.listen(port, () => {
            console.log("Running server on port: ", port);
        });
    });
}
runServer();
