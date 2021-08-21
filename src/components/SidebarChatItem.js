import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";
import { types } from "../types/types";

export const SidebarChatItem = ({ user }) => {
  const {
    dispatch,
    chatState: { activeChat },
  } = useContext(ChatContext);

  const { uid, name, online } = user;

  const onClick = async () => {
    if (activeChat === uid) return;

    dispatch({
      type: types.activateChat,
      payload: uid,
    });

    localStorage.setItem("activeChat", uid);

    const res = await fetchToken(`messages/${uid}`);

    if (res.ok) {
      dispatch({
        type: types.loadChat,
        payload: res.messages,
      });
      scrollToBottom("chatHistory");
    }
  };

  return (
    <div
      className={`chat_list  ${uid === activeChat && "active_chat"}`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5> {name} </h5>
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
