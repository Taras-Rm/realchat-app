import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ChatMessageType, MessageType } from "../models/message";
import { UserDetailsType, UserType } from "../models/user";
import { useNavigate } from "react-router-dom";
import { routes } from "../pages/routes";

export const useChat = (token: string | null) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [users, setUsers] = useState<UserDetailsType[]>([]);

  let socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // if no token go to login
    if (!token) {
      navigate(routes.loginPage);
    }

    // socket connection
    socketRef.current = io("http://localhost:3001", {
      auth: {
        token: token,
      },
      transports: ["websocket"],
    });

    // get current connected user
    socketRef.current.on("user", (user: UserType) => {
      setCurrentUser(user);

      // get messages
      socketRef.current?.on("messages", (messages: MessageType[]) => {
        const newMessages: ChatMessageType[] = messages.map((msg) => {
          return {
            ...msg,
            currentUser: user.id === msg.userId,
          };
        });
        setMessages(newMessages);
      });

      // get message
      socketRef.current?.on("message", (message: MessageType) => {
        const newMessage: ChatMessageType = {
          ...message,
          currentUser: user.id === message.userId,
        };
        setMessages((state) => [...state, newMessage]);
      });
    });


    // get connected users
    socketRef.current.emit("getConnectedUsers");
    socketRef.current.on("connectedUsers", (users) => {
      setUsers(users);
    });

    // on disconnect go to login
    socketRef.current.on("disconnect", () => {
      navigate(routes.loginPage);
    });

    // on receiving any error
    socketRef.current.on("error", (error) => {
      console.log(error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token]);

  const sendMessage = (message: string) => {
    socketRef.current?.emit("sendMessage", message);
  };

  const leaveChat = () => {
    socketRef.current?.disconnect();
    localStorage.removeItem("token");
  };

  return { currentUser, messages, sendMessage, users, leaveChat };
};

export default useChat;
