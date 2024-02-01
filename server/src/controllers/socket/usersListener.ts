import users from "../../services/users";
import { usersMessages } from "../../constants/socketMessages";
import { MySocket } from "../../types/socket";
import { User } from "@prisma/client";
import { UserDetailsType } from "../../types/user";
import { getSocketIdByUserId } from ".";

export class UsersListener {
  constructor(private socket: MySocket) {
    this.socket = socket;
  }

  getUser = async () => {
    const user = await users.findUserById(this.socket.data.user.userId);
    this.socket.emit(usersMessages.EMIT_USER, user);
  };

  getUsers = (usersIds?: number[]) => async () => {
    let dbUsers: User[] | null = [];
    if (usersIds) {
      dbUsers = await users.findUsersByIds(usersIds);
    } else {
      dbUsers = await users.getAllUsers();
    }

    let processedUsers: UserDetailsType[] = [];
    if (dbUsers?.length) {
      processedUsers = dbUsers.map(
        (dbU): UserDetailsType => ({
          ...dbU,
          isOnline: !!usersIds?.find((uId) => uId === dbU.id),
        })
      );
    }

    this.socket.nsp.emit(usersMessages.EMIT_CONNECTED_USERS, processedUsers);
  };

  muteUser = async (userId: number) => {
    const user = await users.muteUnmuteUser(userId, true);

    const socketId = getSocketIdByUserId(userId);

    this.socket.nsp.emit(usersMessages.EMIT_USER_MUTED, userId);

    if (socketId) {
      const socket = this.socket.nsp.sockets.get(socketId);
      socket?.emit(usersMessages.EMIT_USER, user);
    }
  };
}
