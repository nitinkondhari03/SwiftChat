import { useState, useEffect } from "react";
import "../CSS/pages/Register.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOption);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOption);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters",
        toastOption
      );
      return false;
    } else if (email === "") {
      toast.error("email is required", toastOption);
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
        <form
          className="register_login_form"
          onSubmit={(event) => handleSubmit(event)}
        >
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
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            value={values.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <a href="login">Login</a>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
