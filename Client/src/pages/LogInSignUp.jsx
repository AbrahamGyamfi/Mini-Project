import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignUp.css";
import password_icon from "../components/Assets/password_icon.png";
import email_icon from "../components/Assets/email_icon.png";
import person_icon from "../components/Assets/person_icon.png";

const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="Log-container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={person_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">Forgot Password?</div>
      )}
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
        {action === "Login" && (
          <div className="submit" onclick={handleLogin}>
            Submit Login
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
