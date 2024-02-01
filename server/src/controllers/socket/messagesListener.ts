import { messagesMessages } from "../../constants/socketMessages";
import { MySocket } from "../../types/socket";
import messages from "../../services/messages";

export class MessagesListener {
  constructor(private socket: MySocket) {
    this.socket = socket;
  }

  sendMessage = async (msg: string) => {
    // validate msg
    const preapredMsg = msg.trim();
    if (!preapredMsg || preapredMsg.length > 200) {
      this.socket.emit(
        messagesMessages.EMIT_ERROR,
        "Validation error [message]"
      );
      return;
    }
    const message = await messages.createMessage({
      createdAt: new Date(),
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
