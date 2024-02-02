import { useState } from "react";
import { UserType } from "../../../models/user";
import Label from "../../../components/Label";

const avatar = require("../../../assets/avatar.png");
const muted = require("../../../assets/muted.png");
const unmuted = require("../../../assets/unmuted.png");
const ban = require("../../../assets/ban.png");
const unban = require("../../../assets/unban.png");

interface ChatUserProps {
  user: UserType;
  isOnline: boolean;
  allowToManage: boolean;
  muteUser: (userId: number) => void;
  unmuteUser: (userId: number) => void;
  banUser: (userId: number) => void;
}

function ChatUser({
  user,
  isOnline,
  allowToManage,
  muteUser,
  unmuteUser,
  banUser,
}: ChatUserProps) {
  const [expandButtons, setExpandButtons] = useState(false);

  return (
    <div
      className="flex flex-row justify-between items-center p-1 text-sm rounded-sm hover:bg-baseGrey relative"
      onMouseOver={() => setExpandButtons(true)}
      onMouseOut={() => setExpandButtons(false)}
    >
      <div className="flex flex-row items-center space-x-2">
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
      <div
        style={{
          display: `${expandButtons && allowToManage ? "flex" : "none"}`,
        }}
        className="space-x-2"
      >
        {user.isMute ? (
          <button onClick={() => unmuteUser(user.id)}>
            <img className="h-4 w-4" src={muted} />
          </button>
        ) : (
          <button onClick={() => muteUser(user.id)}>
            <img className="h-4 w-4" src={unmuted} />
          </button>
        )}
        {user.isBan ? (
          <button onClick={() => unmuteUser(user.id)}>
            <img className="h-4 w-4" src={ban} />
          </button>
        ) : (
          <button onClick={() => banUser(user.id)}>
            <img className="h-4 w-4" src={unban} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatUser;
