import { Socket } from "socket.io";
import config from "../config/config";
import { MySocket } from "../interfaces/socket";
import { ExtendedError } from "socket.io/dist/namespace";
import token from "../services/token";

export const authMiddleware = (
  socket: MySocket,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    if (!socket.handshake.auth.token) {
      throw new Error("Failed authorization");
    }
    const userId = token.parseAccessToken(
      socket.handshake.auth.token,
      config.token.secret
    );
    socket.data.userId = userId;
    next();
  } catch (error) {
    console.log("Something went wromg: ", error);
    socket.disconnect();
  }
};
