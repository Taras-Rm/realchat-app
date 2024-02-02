import { MySocket } from "../../types/socket";
import { ActiveUsersSockets } from "./activeUsersSockets";

const registerUsersListener = require("./usersListener");
const registerMessagesListener = require("./messagesListener");

let activeUsersSockets = new ActiveUsersSockets([]);

const socket = async (socket: MySocket) => {
  console.log("User is connected");

  registerUsersListener(socket.nsp, socket, activeUsersSockets);

  registerMessagesListener(socket.nsp, socket, activeUsersSockets);
};

export default socket;
