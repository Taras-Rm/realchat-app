import { io } from "socket.io-client";
import { UserType } from "../../models/user";
import ChatMessages from "./components/ChatMessages";
import ChatUsers from "./components/ChatUsers";

const user: UserType = {
  id: 3,
  name: "Test",
  nameColor: "red",
  isAdmin: true,
  isBan: false,
  isMute: false,
};

const socket = io("http://localhost:3001", {
  auth: { token: "Test" },
});

function ChatPage() {
  return (
    <div className="h-screen">
      <div className="flex flex-row h-full p-5">
        <ChatMessages socket={socket} messages={[]} />
        <ChatUsers users={[]} currentUser={user} />
      </div>
    </div>
  );
}

export default ChatPage;
