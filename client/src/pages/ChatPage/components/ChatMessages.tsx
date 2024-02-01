import ChatMessage from "../../../components/ChatMessage";
import { ChatMessageType } from "../../../models/message";
import { FormEvent, useEffect, useRef, useState } from "react";
import { UserType } from "../../../models/user";

const MAX_MESSAGE_LENGTH = 200;
interface ChatMessagesProps {
  messages: ChatMessageType[];
  sendMessage: (message: string) => void;
  currentUser: UserType;
}

function ChatMessages({
  messages,
  sendMessage,
  currentUser,
}: ChatMessagesProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const preparedMessage = message.trim();
    preparedMessage && sendMessage(preparedMessage);
    setMessage("");
  };

  const columnRef = useRef<HTMLDivElement | null>(null);

  // scroll to the bottom
  useEffect(() => {
    if (columnRef.current) {
      columnRef.current.scrollTop = columnRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-2/3 p-3 bg-baseGrey flex flex-col justify-end">
      <div ref={columnRef} className="h-full overflow-y-auto">
        {messages.map((msg, i) => (
          <ChatMessage key={msg.id} message={msg} isOwn={msg.currentUser} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex flex-col items-end">
        <textarea
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 outline-none rounded-lg resize-none my-4 w-full"
          placeholder="Type a message..."
          value={message}
        />
        <button
          disabled={currentUser.isMute}
          className="bg-baseBlueLight text-baseWhite w-1/5 text-sm rounded-full px-2 py-1"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatMessages;
