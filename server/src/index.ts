import express from "express";
import apiRouter from "./controllers/http/routes";
import cors from "cors";
import config from "./config/config";
import { PrismaClient } from "@prisma/client";
import http from "http";
import { Server } from "socket.io";

import { CustomSocket } from "./interfaces/socket";
import { authMiddleware } from "./middlewares/authMiddleware";
import socket from "./controllers/socket";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const prisma = new PrismaClient();

const app = express();

const server = http.createServer(app);

const io = new Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  CustomSocket
>(server, {
  cors: {
    origin: config.clientOrigin,
  },
});

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

io.use(authMiddleware);

io.on("connection", socket);

const port = config.server.port;

// Listen port
server.listen(port, () => {
  console.log("Running server on port: ", port);
});
