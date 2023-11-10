import "../CSS/components/ChatContainer.css"
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes"
import ChatInput from "./ChatInput"
import Logout from "./Logout"
import Messages from "./Mesages"
import axios from "axios"
import { useEffect, useState } from "react"
const ChatContainer=({currentChat,currentUser})=>{
  const [messages,setMessages]=useState([])
  useEffect(()=>{
    console.log(currentUser)
    console.log(currentChat)
   
    getAllMessage()
  },[currentUser,currentChat])
 async function getAllMessage(){
    const response=await axios.post(getAllMessageRoute,{
      from:currentUser._id,
      to:currentChat._id,
    })
    setMessages(response.data);
   
  }
      const handleSendMsg=async(msg)=>{
        try {
          let data=await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
          })
          getAllMessage()
        } catch (error) {
          console.log(error)
        }
      }
      return(
            <div className="chat_Container">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout/>
      </div>
      <div className="chat-message">
   {
    messages.map((message)=>{
      return(
        <div>
          <div className={`${message.fromSelf ? "sended":"recieved"}`}>
            <div className="content">
              <p>
                {message.message}
              </p>
            </div>
          </div>
        </div>
      )
    })
   }
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
      )
}
export default ChatContainer