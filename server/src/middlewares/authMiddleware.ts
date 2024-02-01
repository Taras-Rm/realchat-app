import config from "../config/config";
import { MySocket } from "../types/socket";
import { ExtendedError } from "socket.io/dist/namespace";
import tokenService from "../services/token";
import users from "../services/users";

export const authMiddleware = async (
  socket: MySocket,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      throw new Error("Failed authorization");
    }
    const userId = tokenService.parseAccessToken(token, config.token.secret);
    const user = await users.findUserById(userId);
    if (!user) {
      throw new Error("Failed authorization");
    }
    socket.data.user = { userId: user.id, isAdmin: user.isAdmin };
    next();
  } catch (error) {
    socket.emit("error", "dsdcs");
    console.log("Something went wromg: ", error);
    socket.disconnect();
  }
};
