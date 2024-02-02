import ChatMessages from "./components/ChatMessages";
import ChatUsers from "./components/ChatUsers";
import useChat from "../../hooks/useChat";
import { useLogin } from "../../hooks/useLogin";

function ChatPage() {
  const { getToken } = useLogin();

  const {
    currentUser,
    messages,
    sendMessage,
    users,
    leaveChat,
    muteUser,
    unmuteUser,
    banUser,
    unbanUser,
  } = useChat(getToken());

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
            unbanUser={unbanUser}
          />
        </div>
      )}
    </div>
  );
}

export default ChatPage;
