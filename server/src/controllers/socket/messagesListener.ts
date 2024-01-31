import users from "../../services/users";
import {
  messagesMessages,
  usersMessages,
} from "../../constants/socketMessages";
import { MySocket } from "../../interfaces/socket";
import messages from "../../services/messages";

export class MessagesListener {
  constructor(private socket: MySocket) {
    this.socket = socket;
  }

  sendMessage = async (msg: string) => {
    const now = new Date();
    const createdMessage = await messages.createMessage({
      createdAt: now,
      userId: this.socket.data.userId,
      content: msg,
    });
    console.log(msg);
    this.socket.nsp.emit(messagesMessages.EMIT_MESSAGE, createdMessage);
  };

  getMessages = async () => {
    const lastMessages = await messages.getAllMessages();
    this.socket.emit(messagesMessages.EMIT_MESSAGES, lastMessages);
  };
}
