import "../CSS/components/ChatContainer.css"
import { sendMessageRoute } from "../utils/APIRoutes"
import ChatInput from "./ChatInput"
import Logout from "./Logout"
import Messages from "./Mesages"
import axios from "axios"

const ChatContainer=({currentChat,currentUser})=>{
      const handleSendMsg=async(msg)=>{
        console.log(msg)
        try {
          let data=await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
          })
          console.log(data)
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
      <div className="chat-message"></div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
      )
}
export default ChatContainer