import { useEffect, useState } from "react";
import "../CSS/components/Contacts.css";
import Logo from "../assets/logo.svg";
const Contactsx = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    setCurrentUserName(currentUser.username);
    setCurrentUserImage(currentUser.avatarImage);
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="Container_contacts">
          <div className="Container_contacts_brand">
            <img src={Logo} alt="logo" />
            <h3>chat</h3>
          </div>
          <div className="Container_contacts_contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`Container_contacts_contactx ${
                    index === currentSelected
                      ? "Container_contacts_contactx_selected"
                      : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="Container_contacts_contactx_avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="Container_contacts_contactx_username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Container_contacts_current-user">
            <div className="Container_contacts_current-user_avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="Container_contacts_current-user_username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contactsx;
