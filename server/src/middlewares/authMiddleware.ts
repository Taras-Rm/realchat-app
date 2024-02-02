import config from "../config/config";
import { MySocket } from "../types/socket";
import { ExtendedError } from "socket.io/dist/namespace";
import tokenService from "../services/token";
import users from "../services/users";
import { rooms } from "../constants/rooms";

export const authMiddleware = async (
  socket: MySocket,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      throw new Error("Failed authorization");
    }
    const user = await users.findUserById(
      tokenService.parseAccessToken(token, config.token.secret)
    );
    if (!user) {
      throw new Error("Failed authorization");
    }
    if (user.isBan) {
      throw new Error("User is banned");
    }
    // define user room
    if (user?.isAdmin) {
      socket.join(rooms.ADMINS);
    } else {
      socket.join(rooms.NOT_ADMINS);
    }
    socket.data.user = { userId: user.id, isAdmin: user.isAdmin };
    next();
  } catch (error) {
    socket.emit("error", error);
    socket.disconnect();
  }
};
