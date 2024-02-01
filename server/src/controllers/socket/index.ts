import { ActiveUserSocketType, MySocket } from "../../types/socket";
import {
  messagesMessages,
  usersMessages,
} from "../../constants/socketMessages";
import { UsersListener } from "./usersListener";
import { MessagesListener } from "./messagesListener";

let activeUsersSockets: ActiveUserSocketType[] = [];

const getActiveUsersIds = () => {
  return activeUsersSockets.map((aS) => aS.user.userId);
};

export const getSocketIdByUserId = (userId: number) => {
  return activeUsersSockets.find((aU) => aU.user.userId === userId)?.socketId;
};

const socket = async (socket: MySocket) => {
  console.log("User is connected");
  const user = socket.data.user;

  const usersListener = new UsersListener(socket);
  const messagesListener = new MessagesListener(socket);

  // disconnect if already connected user login
  for (let i = 0; i < activeUsersSockets.length; i++) {
    const userSocket = activeUsersSockets[i];
    if (userSocket.user.userId === user.userId) {
      const socketForDisconnect = socket.nsp.sockets.get(userSocket.socketId);
      socketForDisconnect?.disconnect(true);
      usersListener.getUsers(getActiveUsersIds())();
    }
  }

  activeUsersSockets.push({ user, socketId: socket.id });

  // get user
  usersListener.getUser();

  // get messages
  socket.on(messagesMessages.ON_GET_MESSAGES, messagesListener.getMessages);

  // get users (if admin get all, alse get only connected)
  socket.on(
    usersMessages.ON_GET_CONNECTED_USERS,
    usersListener.getUsers(getActiveUsersIds())
  );

  // mute user
  socket.on(usersMessages.ON_MUTE_USER, usersListener.muteUser);

  // send message
  socket.on(messagesMessages.ON_SEND_MESSAGE, messagesListener.sendMessage);

  socket.on("disconnect", async () => {
    activeUsersSockets = activeUsersSockets.filter(
      (u) => u.user.userId !== user.userId
    );

    usersListener.getUsers(getActiveUsersIds())();

    console.log("User is disconnected");
  });
};

export default socket;
