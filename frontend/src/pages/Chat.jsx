import { useState, useEffect, useRef } from "react";
import { allUsersRoute, host } from "../utils/APIRoutes";
import "../CSS/pages/Chat.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contactsx from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const Getdata = async () => {
          try {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } catch (error) {
            console.log(error);
          }
        };
        Getdata();
      } else {
        navigate("/setavatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className="chat_div">
      <div className="chat_container">
        <Contactsx
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};
export default Chat;
