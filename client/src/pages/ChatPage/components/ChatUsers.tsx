import ChatUser from "./ChatUser";
import Label from "../../../components/Label";
import LogoutButton from "../../../components/LogoutButton";
import { UserDetailsType, UserType } from "../../../models/user";

const avatar = require("../../../assets/avatar.png");

interface ChatUsers {
  users: UserDetailsType[];
  currentUser: UserType;
  leaveChat: () => void;
  muteUser: (userId: number) => void
  unmuteUser: (userId: number) => void
  banUser: (userId: number) => void
}

function ChatUsers({ users, currentUser, leaveChat, muteUser, unmuteUser, banUser }: ChatUsers) {
  return (
    <div className="flex flex-col w-1/3 p-3 pr-0 space-y-3">
      <div className="flex justify-end">
        <LogoutButton handleClick={leaveChat} />
      </div>
      <div className="flex flex-col items-center">
        <img src={avatar} className="w-16" alt="avatar" />
        <div className="mt-2 mb-1" style={{ color: currentUser.nameColor }}>
          {currentUser.name}
        </div>
        {currentUser.isAdmin && <Label color="red" text="admin" />}
      </div>
      <div className="space-y-2 h-full overflow-y-auto">
        {users.map((user) => (
          <ChatUser
            key={user.id}
            user={user}
            isOnline={user.isOnline}
            allowToManage={currentUser.isAdmin && user.id !== currentUser.id}
            muteUser={muteUser}
            unmuteUser={unmuteUser}
            banUser={banUser}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatUsers;
