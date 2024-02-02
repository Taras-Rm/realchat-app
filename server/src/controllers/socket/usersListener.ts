import { Server } from "socket.io";
import { MySocket } from "../../types/socket";
import usersService from "../../services/users";
import { usersMessages } from "../../constants/socketMessages";
import { UserDetailsType } from "../../types/user";
import { ActiveUsersSockets } from "./activeUsersSockets";

module.exports = (
  io: Server,
  socket: MySocket,
  activeUsersSockets: ActiveUsersSockets
) => {
  const getUser = async () => {
    const user = await usersService.findUserById(socket.data.user.userId);
    socket.emit(usersMessages.EMIT_USER, user);
  };

  const getUsers = (usersIds: number[]) => async () => {
    let dbUsers = await usersService.findUsersByIds(usersIds);

    let processedUsers: UserDetailsType[] = [];
    if (dbUsers?.length) {
      processedUsers = dbUsers.map(
        (dbU): UserDetailsType => ({
          ...dbU,
          isOnline: !!usersIds?.find((uId) => uId === dbU.id),
        })
      );
    }

    io.emit(usersMessages.EMIT_CONNECTED_USERS, processedUsers);
  };

  const muteUser = async (userId: number) => {
    await usersService.muteUnmuteUser(userId, true);
    io.emit(usersMessages.EMIT_USER_MUTED, userId);
  };

  const unmuteUser = async (userId: number) => {
    await usersService.muteUnmuteUser(userId, false);
    io.emit(usersMessages.EMIT_USER_UNMUTED, userId);
  };

  const disconnectUser = async () => {
    activeUsersSockets.deleteByUserId(socket.data.user.userId);
    getUsers(activeUsersSockets.getActiveUsersIds())();
    console.log("User is disconnected");
  };

  const discon = () => {
    const allUS = activeUsersSockets.getAll();
    for (let i = 0; i < allUS.length; i++) {
      const userSocket = allUS[i];
      if (userSocket.user.userId === socket.data.user.userId) {
        const socketForDisconnect = socket.nsp.sockets.get(userSocket.socketId);
        socketForDisconnect?.disconnect(true);
        getUsers(activeUsersSockets.getActiveUsersIds())();
      }
    }
  };

  discon();

  activeUsersSockets.add({
    user: socket.data.user,
    socketId: socket.id,
  });

  // get user
  socket.on(usersMessages.ON_GET_USER, getUser);
  // get users (active)
  socket.on(
    usersMessages.ON_GET_CONNECTED_USERS,
    getUsers(activeUsersSockets.getActiveUsersIds())
  );
  // mute user
  socket.on(usersMessages.ON_MUTE_USER, muteUser);
  // unmute user
  socket.on(usersMessages.ON_UNMUTE_USER, unmuteUser);
  // disconnect user
  socket.on(usersMessages.EMIT_USER_DISCONNECT, disconnectUser);
};
