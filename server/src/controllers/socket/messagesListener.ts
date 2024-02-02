import { Server } from "socket.io";
import { MySocket } from "../../types/socket";
import { ActiveUsersSockets } from "./activeUsersSockets";
import { messagesMessages } from "../../constants/socketMessages";
import messagesService from "../../services/messages";

module.exports = (
  io: Server,
  socket: MySocket,
  activeUsersSockets: ActiveUsersSockets
) => {
  const sendMessage = async (msg: string) => {
    // validate msg
    const preapredMsg = msg.trim();
    if (!preapredMsg || preapredMsg.length > 200) {
      socket.emit(messagesMessages.EMIT_ERROR, "Validation error [message]");
      return;
    }
    const message = await messagesService.createMessage({
      createdAt: new Date(),
      userId: socket.data.user.userId,
      content: preapredMsg,
    });
    io.emit(messagesMessages.EMIT_MESSAGE, message);
  };

  const getMessages = async () => {
    const lastMessages = await messagesService.getMessages();
    socket.emit(messagesMessages.EMIT_MESSAGES, lastMessages);
  };

  // get messages
  socket.on(messagesMessages.ON_GET_MESSAGES, getMessages);
  // send message
  socket.on(messagesMessages.ON_SEND_MESSAGE, sendMessage);
};
