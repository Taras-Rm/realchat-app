import { MySocket } from "../../types/socket";
import {
  messagesMessages,
  usersMessages,
} from "../../constants/socketMessages";
import { UsersListener } from "./usersListener";
import { MessagesListener } from "./messagesListener";
import users from "../../services/users";
import { ActiveUserType } from "../../types/user";

let activeUsers: ActiveUserType[] = [];

const socket = async (socket: MySocket) => {
  console.log("User is connected");

  const user = socket.data.user;

  activeUsers.push(user);

  const usersListener = new UsersListener(socket);
  const messagesListener = new MessagesListener(socket);

  // get user
  socket.on(usersMessages.ON_GET_USER, usersListener.getUser);

  // get users (if admin get all, alse get only connected)
  const connectedUsers = await users.findUsersByIds(
    activeUsers.map((u) => u.userId)
  );
  socket.nsp.emit(usersMessages.EMIT_CONNECTED_USERS, connectedUsers);

  // send message
  socket.on(messagesMessages.ON_SEND_MESSAGE, messagesListener.sendMessage);

  // get messages
  socket.on(messagesMessages.ON_GET_MESSAGES, messagesListener.getMessages);

  socket.on("disconnect", async () => {
    activeUsers = activeUsers.filter((u) => u.userId !== user.userId);

    const connectedUsers = await users.findUsersByIds(
      activeUsers.map((u) => u.userId)
    );
    socket.nsp.emit(usersMessages.EMIT_CONNECTED_USERS, connectedUsers);

    console.log("User is disconnected");
  });
};

export default socket;
