import React from "react";
import { formatDate } from "../helpers/formatDate";

export const OutgoingMessage = ({ message }) => {
  const { text, createdAt } = message;
  const formattedDate = formatDate(createdAt);

  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{text}</p>
        <span className="time_date">{formattedDate}</span>
      </div>
    </div>
  );
};
