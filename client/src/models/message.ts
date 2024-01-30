import { UserType } from "./user";

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
};

export type ChatMessageType = MessageType & {
  user: UserType;
};
