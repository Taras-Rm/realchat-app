import { UserType } from "../models/user";
import Label from "./Label";
const avatar = require("../assets/avatar.png");

interface ChatUserProps {
  user: UserType;
  isOnline: boolean;
}

function ChatUser({ user, isOnline }: ChatUserProps) {
  return (
    <div className="flex flex-row items-center p-1 space-x-2 text-sm rounded-sm cursor-pointer hover:bg-baseGrey">
      <div className="relative">
        <img src={avatar} className="w-12" alt="avatar" />
        {isOnline && (
          <div className="absolute w-2 h-2 text-xs bg-baseGreen rounded-full -bottom-1 -end-1" />
        )}
      </div>
      <div className="flex flex-col items-center">
        <div style={{ color: user.nameColor }}>{user.name}</div>
        {user.isAdmin && <Label color="red" text="admin" />}
      </div>
    </div>
  );
}

export default ChatUser;
