import { ChatMessageType } from "../../models/message";
import ChatMessages from "./components/ChatMessages";
import ChatUsers from "./components/ChatUsers";

const messages: ChatMessageType[] = [];

function ChatPage() {
  return (
    <div className="h-screen">
      <div className="flex flex-row h-full p-5">
        <ChatMessages messages={messages} />
        <ChatUsers />
      </div>
    </div>
  );
}

export default ChatPage;
