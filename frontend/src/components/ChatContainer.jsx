import "../CSS/components/ChatContainer.css";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    const getAllMessage = async () => {
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    getAllMessage();
  }, [currentUser, currentChat]);

  const handleSendMsg = async (msg) => {
    try {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg,
      });
      let data = await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="chat_Container">
      <div className="chat_Container_chat-header">
        <div className="chat_Container_user-details">
          <div className="chat_Container_avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="chat_Container_username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat_Container_chat-message">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`chat_Container_chat-message_message ${
                  message.fromSelf
                    ? "chat_Container_chat-message_sended"
                    : "chat_Container_chat-message_recieved"
                }`}
              >
                <div className="chat_Container_chat-message_content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};
export default ChatContainer;
