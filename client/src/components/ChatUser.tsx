import { UserType } from "../models/user";
const avatar = require("../assets/avatar.png");

interface ChatUserProps {
  user: UserType;
  isOnline: boolean;
}

function ChatUser({ user, isOnline }: ChatUserProps) {
  return (
    <div className="flex flex-row items-center p-1 space-x-1 text-sm rounded-sm cursor-pointer hover:bg-baseGrey">
      <div className="relative">
        <img src={avatar} className="w-12" alt="avatar" />
        {isOnline && (
          <div className="absolute w-2 h-2 text-xs bg-baseGreen rounded-full -bottom-1 -end-1" />
        )}
      </div>
      <div>{user.name}</div>
    </div>
  );
}

export default ChatUser;
