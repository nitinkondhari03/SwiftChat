import "../CSS/components/ChatInput.css";
import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";
const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiData, event) => {
    setMsg(
      (msg) => msg + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <div className="chatInput_Container">
      <div className="chatInput_Container_button-container">
        <div
          className={
            showEmojiPicker
              ? "chatInput_Container_emoji"
              : "chatInput_Container_emojisz"
          }
        >
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              autoFocusSearch={false}
            />
          )}
        </div>
      </div>
      <form
        className="chatInput_Container_input-container"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};
export default ChatInput;
