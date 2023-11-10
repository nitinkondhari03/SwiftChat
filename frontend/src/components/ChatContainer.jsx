import "../CSS/components/ChatContainer.css"
import ChatInput from "./ChatInput"
import Logout from "./Logout"
import Messages from "./Mesages"
const ChatContainer=({currentChat})=>{
      const handleSendMsg=(msg)=>{
alert(msg)
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
     <Messages/>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
      )
}
export default ChatContainer