import { useEffect, useState } from "react"
import "../CSS/components/Contacts.css"
import Logo from "../assets/logo.svg"
const Contactsx=({contacts,currentUser,changeChat})=>{
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(()=>{
    setCurrentUserName(currentUser.username);
    setCurrentUserImage(currentUser.avatarImage);
  },[currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
    return(
      <div>
        <>
      {currentUserImage && currentUserImage && (
        <div className="Container">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>chat app</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
      </div>
    )  
}

export default Contactsx