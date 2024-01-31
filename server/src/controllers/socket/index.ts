import { MySocket } from "../../interfaces/socket";
import {
  messagesMessages,
  usersMessages,
} from "../../constants/socketMessages";
import { UsersListener } from "./usersListener";
import { MessagesListener } from "./messagesListener";
import users from "../../services/users";

let activeUsersIds: number[] = [];

const socket = async (socket: MySocket) => {
  console.log("User is connected");

  const userId = socket.data.userId;
  activeUsersIds.push(userId);

  const usersListener = new UsersListener(socket);
  const messagesListener = new MessagesListener(socket);

  // get user
  socket.on(usersMessages.ON_GET_USER, usersListener.getUser);

  // get connected users
  const connectedUsers = await users.findUsersByIds(activeUsersIds);
  socket.nsp.emit(usersMessages.EMIT_CONNECTED_USERS, connectedUsers);

  // send message
  socket.on(messagesMessages.ON_SEND_MESSAGE, messagesListener.sendMessage);
  
  // get messages
  socket.on(messagesMessages.ON_GET_MESSAGES, messagesListener.getMessages);

  socket.on("disconnect", async () => {
    activeUsersIds = activeUsersIds.filter((id) => id !== userId);

    const connectedUsers = await users.findUsersByIds(activeUsersIds);
    socket.nsp.emit(usersMessages.EMIT_CONNECTED_USERS, connectedUsers);

    console.log("User is disconnected");
  });
};

export default socket;
