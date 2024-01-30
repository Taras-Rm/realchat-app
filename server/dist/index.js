"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const client_1 = require("@prisma/client");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./socket/socket"));
const auth_1 = require("./utils/auth");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", routes_1.router);
io.use((socket, next) => {
    if (!socket.handshake.auth.token) {
        throw new Error("Unauthorized");
    }
    const userId = (0, auth_1.parseAccessToken)(socket.handshake.auth.token, config_1.default.token.secret);
    socket.data.userId = userId;
    next();
});
io.on("connection", socket_1.default);
const port = config_1.default.server.port;
// Listen port
server.listen(port, () => {
    console.log("Running server on port: ", port);
});
