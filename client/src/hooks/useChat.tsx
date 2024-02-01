import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ChatMessageType, MessageType } from "../models/message";
import { UserDetailsType, UserType } from "../models/user";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import { routes } from "../pages/routes";

export const useChat = (token: string) => {
  const navigate = useNavigate()
  const { value: currentUser, setValue: setCurrentUser } = useLocalStorage(
    "user",
    null
  );
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [users, setUsers] = useState<UserDetailsType[]>([]);

  let socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      auth: {
        token: token,
      },
    });

    // get user
    socketRef.current.on("user", (user: UserType) => {
      setCurrentUser(user);
    });

    // get connected users
    socketRef.current.on("connectedUsers", (users) => {
      console.log(users);
      setUsers(users);
    });

    // get messages
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
    socketRef.current.on("message", (message: MessageType) => {
      const newMessage: ChatMessageType = {
        ...message,
        currentUser: currentUser.id === message.userId,
      };
      setMessages((state) => [...state, newMessage]);
    });

    socketRef.current.on("disconnect", () => {
      navigate(routes.loginPage)
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
