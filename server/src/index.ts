import express, { Response } from "express";
import { router as apiRouter } from "./routes";
import cors from "cors";
import config from "./config/config";
import { PrismaClient } from "@prisma/client";
import { errorHandler } from "./middlewares/errorHandlerMiddleware";

export const prisma = new PrismaClient();

const app = express();

async function runServer() {
  // Parse json body
  app.use(express.json());

  app.use(cors());

  // Api routes
  app.use("/api", apiRouter);

  // Api healthcheck
  app.get("/ping", (_, res: Response) => {
    res.status(200).json({ message: "pong" });
  });

  app.use(errorHandler);

  const port = config.server.port;

  // Listen port
  app.listen(port, () => {
    console.log("Running server on port: ", port);
  });
}

runServer()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
