import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ActiveUserType } from "./user";

export interface CustomSocket extends Socket {
  user: ActiveUserType;
}

export type MySocket = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  CustomSocket
>;
