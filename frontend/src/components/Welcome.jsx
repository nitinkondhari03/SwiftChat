import Robot from "../assets/robot.gif";
import "../CSS/components/Welcome.css";
const Welcome = ({ currentUser }) => {
  return (
    <div className="Container_welcome">
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser.userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};
export default Welcome;
