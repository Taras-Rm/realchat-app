import { MySocket } from "../../interfaces/socket";
import {
  messagesMessages,
  usersMessages,
} from "../../constants/socketMessages";
import { UsersListener } from "./usersListener";
import { MessagesListener } from "./messagesListener";

let activeUsersIds: number[] = [];

const socket = (socket: MySocket): void => {
  console.log("User is connected");

  const userId = socket.data.userId;
  activeUsersIds.push(userId);

  const usersListener = new UsersListener(socket);
  const messagesListener = new MessagesListener(socket);

  // get user
  socket.on(usersMessages.ON_GET_USER, usersListener.getUser);
  // get all users
  socket.on(usersMessages.ON_GET_ALL_USER, usersListener.getAllUsers);

  // send message
  socket.on(messagesMessages.ON_SEND_MESSAGE, messagesListener.sendMessage);

  // get messages
  socket.on(messagesMessages.ON_GET_MESSAGES, messagesListener.getMessages);

  socket.on("disconnect", () => {
    activeUsersIds = activeUsersIds.filter((id) => id !== userId);
    console.log("User is disconnected");
  });
};

export default socket;
