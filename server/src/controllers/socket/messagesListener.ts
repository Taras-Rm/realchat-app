import { messagesMessages } from "../../constants/socketMessages";
import { MySocket } from "../../types/socket";
import messages from "../../services/messages";

export class MessagesListener {
  constructor(private socket: MySocket) {
    this.socket = socket;
  }

  sendMessage = async (msg: string) => {
    const now = new Date();
    const message = await messages.createMessage({
      createdAt: now,
      userId: this.socket.data.user.userId,
      content: msg,
    });
    this.socket.nsp.emit(messagesMessages.EMIT_MESSAGE, message);
  };

  getMessages = async () => {
    const lastMessages = await messages.getMessages();
    this.socket.emit(messagesMessages.EMIT_MESSAGES, lastMessages);
  };
}
