import { Socket } from "socket.io-client";
import ChatMessage from "../../../components/ChatMessage";
import { ChatMessageType } from "../../../models/message";
import { FormEvent, useState } from "react";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  socket: Socket;
}

function ChatMessages({ messages, socket }: ChatMessagesProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("sendMessage", message);
  };
  return (
    <div className="w-2/3 p-3 bg-baseGrey flex flex-col justify-end">
      <div className="h-full overflow-y-auto">
        {messages.map((msg, i) => (
          <ChatMessage message={msg} isOwn={i === 5} />
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 h-1/5 outline-none rounded-lg resize-none mt-4"
          placeholder="Type a message..."
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatMessages;
