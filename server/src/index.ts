import express from "express";
import { router as apiRouter } from "./routes";
import cors from "cors";
import config from "./config/config";
import { PrismaClient } from "@prisma/client";
import http from "http";
import { Server } from "socket.io";
import socket from "./socket/socket";
import {
  CustomSocket,
  ListenEvents,
  ServerEvents,
  InterEvents,
} from "./interfaces/socket";
import { parseAccessToken } from "./utils/auth";

export const prisma = new PrismaClient();

const app = express();

const server = http.createServer(app);

const io = new Server<ListenEvents, ServerEvents, InterEvents, CustomSocket>(
  server,
  {
    cors: {
      origin: "http://localhost:3000",
    },
  }
);

app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);

io.use((socket, next) => {
  if (!socket.handshake.auth.token) {
    throw new Error("Unauthorized");
  }
  const userId = parseAccessToken(
    socket.handshake.auth.token,
    config.token.secret
  );
  socket.data.userId = userId;
  next();
});

io.on("connection", socket);

const port = config.server.port;

// Listen port
server.listen(port, () => {
  console.log("Running server on port: ", port);
});
