import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";
import { useForm } from "../hooks/useForm";

export const SendMessage = () => {
  const { form, setForm, onChange } = useForm({ message: "" });
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const disableSendBtn = () => {
    return !form.message.trim().length > 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    socket.emit("personal-message", {
      from: auth.uid,
      to: chatState.activeChat,
      text: form.message,
    });

    setForm({
      ...form,
      message: "",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            name="message"
            className="write_msg"
            placeholder="Mensaje..."
            value={form.message}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button
            className="msg_send_btn mt-3"
            type="submit"
            disabled={disableSendBtn()}
          >
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
