import { UserType } from "./user";

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  user: UserType;
};

export type ChatMessageType = MessageType & {
  currentUser: boolean;
};
