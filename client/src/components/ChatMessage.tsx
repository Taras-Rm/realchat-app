import { ChatMessageType } from "../models/message";
import { prepareDate } from "../utils/prepareDate";
const avatar = require("./../assets/avatar.png");

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
}

function ChatMessage({ message, isOwn }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
      <div>
        <img src={avatar} className="w-14" alt="avatar" />
      </div>
      <div
        className={`flex flex-col ${
          isOwn ? "items-end mr-3" : "items-start ml-2"
        } w-full pt-4 space-y-1`}
      >
        <div className={`text-sm text-[${message.user.nameColor}]`}>
          {message.user.name}
        </div>
        <div
          className={`rounded-md ${
            isOwn
              ? "rounded-tr-none bg-baseBlueLight text-baseWhite"
              : "rounded-tl-none bg-baseWhite"
          } p-3 shadow-md`}
        >
          {message.content}
        </div>
        <div className="text-sm text-baseGreyDark">
          {prepareDate(message.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
