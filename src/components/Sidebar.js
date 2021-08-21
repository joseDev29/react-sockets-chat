import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { SidebarChatItem } from "./SidebarChatItem";

export const Sidebar = () => {
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  return (
    <div className="inbox_chat">
      {chatState.users
        .filter((user) => user.uid !== auth.uid)
        .map((user) => {
          return <SidebarChatItem key={user.uid} user={user} />;
        })}

      {/* Espacio extra para scroll */}
      <div className="extra_space"></div>
    </div>
  );
};
