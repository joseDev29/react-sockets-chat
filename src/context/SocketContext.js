import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";
import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./chat/ChatContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { dispatch } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:6005"
  );

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  useEffect(() => {
    socket?.on("list-users", (users) => {
      dispatch({
        type: types.usersLoaded,
        payload: users,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("personal-message", (message) => {
      dispatch({
        type: types.newMessage,
        payload: message,
      });

      const activechat = localStorage.getItem("activeChat");

      if (activechat === message.from || activechat === message.to) {
        scrollToBottomAnimated("chatHistory");
      }
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
