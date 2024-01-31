import ChatMessages from "./components/ChatMessages";
import ChatUsers from "./components/ChatUsers";
import useChat from "../../hooks/useChat";

function ChatPage() {
  const { currentUser, messages, sendMessage, users } = useChat(
    localStorage.getItem("token") || ""
  );

  return (
    <div className="h-screen">
      <div className="flex flex-row h-full p-5">
        <ChatMessages messages={messages} sendMessage={sendMessage} />
        {currentUser && <ChatUsers users={users} currentUser={currentUser} />}
      </div>
    </div>
  );
}

export default ChatPage;
