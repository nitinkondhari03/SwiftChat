import { useEffect, useState } from "react";
import "../CSS/pages/Register.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
  },[])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username} = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log(data)
      if (data.status == false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status == true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  let toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleValidation = () => {
    const { password,username} = values;
    if (password === "") {
      toast.error("Email and Password is required", toastOption);
      return false;
    } else if (username.length === "") {
      toast.error("Email and Password is required", toastOption);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="register">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>chat app</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={(e) => handleChange(e)}
            min={"3"}
          />
          <input
            type="password"
            placeholder="Password"
            value={values.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login In</button>
          <span>
            Don't have an account ? <a href="register">Register</a>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
