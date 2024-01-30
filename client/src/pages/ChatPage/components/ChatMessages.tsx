import ChatMessage from "../../../components/ChatMessage";
import { ChatMessageType } from "../../../models/message";

interface ChatMessagesProps {
  messages: ChatMessageType[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="w-2/3 p-3 bg-baseGrey flex flex-col justify-end">
      <div className="h-full overflow-y-auto">
        {messages.map((msg, i) => (
          <ChatMessage message={msg} isOwn={i === 5} />
        ))}
      </div>
      <textarea
        className="p-3 h-1/5 outline-none rounded-lg resize-none mt-4"
        placeholder="Type a message..."
      />
    </div>
  );
}

export default ChatMessages;
