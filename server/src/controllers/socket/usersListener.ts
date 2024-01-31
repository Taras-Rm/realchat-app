import users from "../../services/users";
import { usersMessages } from "../../constants/socketMessages";
import { MySocket } from "../../interfaces/socket";

export class UsersListener {
  constructor(private socket: MySocket) {
    this.socket = socket;
  }

  getUser = async () => {
    const user = await users.findUserById(this.socket.data.userId);
    this.socket.emit(usersMessages.EMIT_USER, user);
  };

  getAllUsers = async () => {
    const allUsers = await users.getAllUsers();
    this.socket.emit(usersMessages.EMIT_ALL_USERS, allUsers);
  };
}
