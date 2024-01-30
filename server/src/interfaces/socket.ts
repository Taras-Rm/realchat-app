import { Socket } from "socket.io";

export interface CustomSocket extends Socket {
  userId: number;
}

export interface ListenEvents {}
export interface ServerEvents {}
export interface InterEvents {}
