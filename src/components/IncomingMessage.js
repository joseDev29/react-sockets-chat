import React from "react";
import { formatDate } from "../helpers/formatDate";

export const IncomingMessage = ({ message }) => {
  const { text, createdAt } = message;
  const formattedDate = formatDate(createdAt);

  return (
    <div className="incoming_msg mb-3">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{text}</p>
          <span className="time_date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
