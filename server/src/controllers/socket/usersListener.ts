import { Server } from "socket.io";
import { MySocket } from "../../types/socket";
import usersService from "../../services/users";
import { usersMessages } from "../../constants/socketMessages";
import { UserDetailsType } from "../../types/user";
import { ActiveUsersSockets } from "./activeUsersSockets";
import { rooms } from "../../constants/rooms";

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
    let dbUsers = await usersService.getAllUsers();

    let processedUsers: UserDetailsType[] = [];
    if (dbUsers?.length) {
      processedUsers = dbUsers.map(
        (dbU): UserDetailsType => ({
          ...dbU,
          isOnline: !!usersIds?.find((uId) => uId === dbU.id),
        })
      );
    }

    io.to(rooms.ADMINS).emit(
      usersMessages.EMIT_USERS,
      processedUsers
    );
    io.to(rooms.NOT_ADMINS).emit(
      usersMessages.EMIT_USERS,
      processedUsers.filter((u) => u.isOnline)
    );
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
  };

  const discon = (userId: number) => () => {
    const allUS = activeUsersSockets.getAll();
    for (let i = 0; i < allUS.length; i++) {
      const userSocket = allUS[i];
      if (userSocket.user.userId === userId) {
        const socketForDisconnect = socket.nsp.sockets.get(userSocket.socketId);
        socketForDisconnect?.disconnect(true);
        getUsers(activeUsersSockets.getActiveUsersIds())();
      }
    }
  };

  const banUser = async (userId: number) => {
    await usersService.banUser(userId, true);
    discon(userId)();
  };

  discon(socket.data.user.userId)();

  activeUsersSockets.add({
    user: socket.data.user,
    socketId: socket.id,
  });

  // get user
  socket.on(usersMessages.ON_GET_USER, getUser);
  // get users
  socket.on(
    usersMessages.ON_GET_USERS,
    getUsers(activeUsersSockets.getActiveUsersIds())
  );
  // mute user
  socket.on(usersMessages.ON_MUTE_USER, muteUser);
  // unmute user
  socket.on(usersMessages.ON_UNMUTE_USER, unmuteUser);
  // disconnect user
  socket.on(usersMessages.EMIT_USER_DISCONNECT, disconnectUser);
  // ban user
  socket.on(usersMessages.ON_BAN_USER, banUser);
};
