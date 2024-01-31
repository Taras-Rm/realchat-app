import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ChatMessageType, MessageType } from "../models/message";
import { UserType } from "../models/user";
import useLocalStorage from "./useLocalStorage";

export const useChat = (token: string) => {
  const { value: currentUser, setValue: setCurrentUser } = useLocalStorage(
    "user",
    null
  );
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  let socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      auth: {
        token: token,
      },
    });

    // get user
    socketRef.current.emit("getUser");
    socketRef.current.on("user", (user: UserType) => {
      setCurrentUser(user);
    });

    // get users
    socketRef.current.emit("getAllUsers");
    socketRef.current.on("allUsers", (users) => {
      setUsers(users);
    });

    // get messages
    socketRef.current.emit("getMessages");
    socketRef.current.on("messages", (messages: MessageType[]) => {
      const newMessages: ChatMessageType[] = messages.map((msg) => {
        return {
          ...msg,
          currentUser: currentUser.id === msg.userId,
        };
      });
      setMessages(newMessages);
    });

    // get message
    socketRef.current.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });

    return () => {
      socketRef.current?.disconnect();
      localStorage.removeItem("user");
    };
  }, [token]);

  const sendMessage = (message: string) => {
    socketRef.current?.emit("sendMessage", message);
  };

  return { currentUser, messages, sendMessage, users };
};

export default useChat;
