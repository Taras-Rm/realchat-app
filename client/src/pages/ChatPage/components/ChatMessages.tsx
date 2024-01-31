import ChatMessage from "../../../components/ChatMessage";
import { ChatMessageType } from "../../../models/message";
import { FormEvent, useState } from "react";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  sendMessage: (message: string) => void;
}

function ChatMessages({ messages, sendMessage }: ChatMessagesProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <div className="w-2/3 p-3 bg-baseGrey flex flex-col justify-end">
      <div className="h-full overflow-y-auto">
        {messages.map((msg, i) => (
          <ChatMessage key={msg.id} message={msg} isOwn={msg.currentUser} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex flex-col items-end">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 outline-none rounded-lg resize-none my-4 w-full"
          placeholder="Type a message..."
        />
        <button className="bg-baseBlueLight text-baseWhite w-1/5 text-sm rounded-full px-2 py-1">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatMessages;
