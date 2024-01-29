import express, { Response } from "express";
import { router as apiRouter } from "./routes";
import cors from "cors";
import config from "./config/config";

const app = express();

// Run server
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

  const port = config.server.port;

  // Listen port
  app.listen(port, () => {
    console.log("Running server on port: ", port);
  });
}

runServer();
