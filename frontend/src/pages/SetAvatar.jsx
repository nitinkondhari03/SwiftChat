import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/pages/SetAvatar.css";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
const SetAvatar = () => {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatarss, setAvatarss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async () => {
    if (selectedAvatar == undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      console.log(setAvatarRoute);
      console.log(user._id);
      console.log(avatarss);
      console.log(selectedAvatar);
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatarss[selectedAvatar],
      });
      console.log(data.isSet);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      AddAvatar();
    }
  }, []);
  const AddAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `https://api.multiavatar.com/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    if (data.length == 4) {
      setAvatarss(data);
      setIsLoading(false);
    }
    setAvatarss(data);
  };
  return (
    <>
      {isLoading ? (
        <div className="container_setavatar">
          <img
            src={loader}
            alt="loader"
            className="container_setavatar_loader"
          />
        </div>
      ) : (
        <div className="container_setavatar">
          <div className="container_setavatar_title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="container_setavatar_avatars">
            {avatarss.map((avatar, index) => {
              return (
                <div
                  className={`container_setavatar_avatar ${
                    selectedAvatar === index
                      ? "container_setavatar_avatar_selected"
                      : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={setProfilePicture}
            className="container_setavatar_submit-btn"
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
    // <div className="loader_div">{isLoading?<div>
    //   <img src={loader} alt="loader" className="loader"/>
    // </div>:
    // <div className="avatar_div">
    //   <div className="title-container">
    //     <h1>Pick an avatar as your profile picture</h1>
    //   </div>
    //   <div className="avatars">
    //     {avatarss.map((avatar, index) => {
    //       return (
    //         <div key={index}
    //           className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
    //         >
    //           <img
    //             src={`data:image/svg+xml;base64,${avatar}`}
    //             alt="avatar"
    //             key={avatar}
    //             onClick={() => setSelectedAvatar(index)}
    //           />
    //         </div>
    //       );
    //     })}
    //   </div>
    //   <button className="submit-btn" onClick={()=>setProfilePicture()}>Set as Profile Picture</button>
    //   <ToastContainer />
    // </div>
    // }</div>
  );
};
export default SetAvatar;
