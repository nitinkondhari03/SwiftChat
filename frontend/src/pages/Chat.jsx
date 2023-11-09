import { useState,useEffect } from "react";
import { allUsersRoute } from "../utils/APIRoutes";
import "../CSS/pages/Chat.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const navigate=useNavigate()
  const [contacts,setContacts]=useState([])
  const [currentUser,setCurrentUser]=useState(undefined)

  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }else{
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
      if(currentUser){
        if(currentUser.isAvatarImageSet=" "){
          navigate("/setavatar")
        }else if(currentUser.isAvatarImageSet){
            const Getdata=async()=>{
              const data=await axios.get(`${allUsersRoute}/${currentUser._id}`)
              setContacts(data.data)
            }
            Getdata()
          }
      }
    }
  },[currentUser])

  return (
    <div className="chat_div">
      <div className="container">

      </div>
    </div>
  )
};
export default Chat;
