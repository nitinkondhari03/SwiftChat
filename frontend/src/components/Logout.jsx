import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import "../CSS/components/Logout.css"
import axios from "axios";
const Logout=()=>{
      const navigate = useNavigate();
      const handleClick=()=>{
            localStorage.clear()
            navigate("/login")
      }
      return(
            <div className="logout">
           <button onClick={handleClick} >
      <BiPowerOff />
    </button >
            </div>
      )
}
export default Logout