import users from "../../services/users";
import { usersMessages } from "../../constants/socketMessages";
import { MySocket } from "../../types/socket";

export class UsersListener {
  constructor(private socket: MySocket) {
    this.socket = socket;
  }

  getUser = async () => {
    const user = await users.findUserById(this.socket.data.user.userId);
    this.socket.emit(usersMessages.EMIT_USER, user);
  };

  getConnectedUsers = async (usersIds: number[]) => {
    const connectedUsers = await users.findUsersByIds(usersIds);
    return connectedUsers;
  };
}
