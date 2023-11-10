import { useState, useEffect } from "react";
import { allUsersRoute } from "../utils/APIRoutes";
import "../CSS/pages/Chat.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contactsx from "../components/Contacts";
const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
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
      if (currentUser.isAvatarImageSet) {
        const Getdata = async () => {
          try {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } catch (error) {
            console.log(error);
          }
        };
        Getdata()
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
      <div className="container">
        <Contactsx  contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}  />
      </div>
    </div>
  );
};
export default Chat;
