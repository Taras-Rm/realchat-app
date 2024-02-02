import ChatMessages from "./components/ChatMessages";
import ChatUsers from "./components/ChatUsers";
import useChat from "../../hooks/useChat";

function ChatPage() {
  const { currentUser, messages, sendMessage, users, leaveChat, muteUser, unmuteUser, banUser } =
    useChat(localStorage.getItem("token"));

  return (
    <div className="h-screen">
      {currentUser && (
        <div className="flex flex-row h-full p-5">
          <ChatMessages
            messages={messages}
            sendMessage={sendMessage}
            currentUser={currentUser}
          />
          <ChatUsers
            users={users}
            currentUser={currentUser}
            leaveChat={leaveChat}
            muteUser={muteUser}
            unmuteUser={unmuteUser}
            banUser={banUser}
          />
        </div>
      )}
    </div>
  );
}

export default ChatPage;
