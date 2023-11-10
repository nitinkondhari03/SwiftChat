import "../CSS/components/ChatContainer.css"
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes"
import ChatInput from "./ChatInput"
import Logout from "./Logout"
import Messages from "./Mesages"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
const ChatContainer=({currentChat,currentUser,socket})=>{
  const scrollRef=useRef()
  const [messages,setMessages]=useState([])
  const [arrivalMessage,setArrivalMessage]=useState(null)
  useEffect(()=>{
   if(currentChat){
    getAllMessage()
   }
  },[currentUser,currentChat])


      const handleSendMsg=async(msg)=>{
        try {
          let data=await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
          })
          socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            messages:msg,
          });
          const msgs=[...messages];
          msgs.push({fromSelf:true,messages:msg});
          setMessages(msgs)
          getAllMessage()
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
        if(socket.current){
          socket.current.on('msg-recieve',(msg)=>{
setArrivalMessage({fromSelf:false,message:msg})
          })
        }
      },[])

      useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
      },[arrivalMessage])

      useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
      },[messages])
      async function getAllMessage(){
        const response=await axios.post(getAllMessageRoute,{
          from:currentUser._id,
          to:currentChat._id,
        })
        setMessages(response.data);
       
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
        <div ref={scrollRef} key={uuidv4()}>
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