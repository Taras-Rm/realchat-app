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
    // socket connection
    socketRef.current = io(`${process.env.REACT_APP_SERVER_URL}`, {
      auth: {
        token: token,
      },
      transports: ["websocket"],
    });

    // get current connected user
    socketRef.current.emit("getUser");
    socketRef.current.on("user", (user: UserType) => {
      setCurrentUser(user);

      // get messages
      socketRef.current?.emit("getMessages");
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

      // on muted user
      socketRef.current?.on("userMuted", (userId: number) => {
        setUsers((users) => {
          return users.map((u) => {
            if (u.id === userId) {
              return { ...u, isMute: true };
            }
            return u;
          });
        });
        if (user.id === userId) {
          setCurrentUser((state) => {
            if (state) {
              return { ...state, isMute: true };
            }
            return state;
          });
        }
      });

      // on unmuted user
      socketRef.current?.on("userUnmuted", (userId: number) => {
        setUsers((users) => {
          return users.map((u) => {
            if (u.id === userId) {
              return { ...u, isMute: false };
            }
            return u;
          });
        });
        if (user.id === userId) {
          setCurrentUser((state) => {
            if (state) {
              return { ...state, isMute: false };
            }
            return state;
          });
        }
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

  const muteUser = (userId: number) => {
    socketRef.current?.emit("onMuteUser", userId);
  };

  const unmuteUser = (userId: number) => {
    socketRef.current?.emit("onUnmuteUser", userId);
  };

  const banUser = (userId: number) => {
    socketRef.current?.emit("onBanUser", userId);
  };

  const leaveChat = () => {
    socketRef.current?.disconnect();
    localStorage.removeItem("token");
  };

  return {
    currentUser,
    messages,
    sendMessage,
    users,
    leaveChat,
    muteUser,
    unmuteUser,
    banUser,
  };
};

export default useChat;
