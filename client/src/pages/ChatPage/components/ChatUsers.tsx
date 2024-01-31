import ChatUser from "../../../components/ChatUser";
import Label from "../../../components/Label";
import LogoutButton from "../../../components/LogoutButton";
import { UserType } from "../../../models/user";

const avatar = require("../../../assets/avatar.png");

interface ChatUsers {
  users: UserType[];
  currentUser: UserType;
}

function ChatUsers({ users, currentUser }: ChatUsers) {
  return (
    <div className="flex flex-col w-1/3 p-3 pr-0 space-y-3">
      <div className="flex justify-end">
        <LogoutButton />
      </div>
      <div className="flex flex-col items-center">
        <img src={avatar} className="w-16" alt="avatar" />
        <div className="mt-2 mb-1">{currentUser.name}</div>
        {currentUser.isAdmin && <Label color="red" text="admin" />}
      </div>
      <div className="space-y-2 h-full overflow-y-auto">
        {users.map((user) => (
          <ChatUser key={user.id} user={user} isOnline={false} />
        ))}
      </div>
    </div>
  );
}

export default ChatUsers;
