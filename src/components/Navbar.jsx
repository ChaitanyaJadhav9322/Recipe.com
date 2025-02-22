import React from "react";
import chatbotImg from "../assets/images/chatbot.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="brand">Recipe<span className="highlight">Hub</span></span>
      </div>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="/explore">Explore</a></li>
          <li><a href="/feed">Feed</a></li>
          <li><a href="/account">Create Account</a></li>
          <li>
          <a href="/chatbot">
          <img alt="Chatbot" src={chatbotImg} style={{ width: "30px", height: "30px" }} />

              </a>
        </li>
        </ul>
        <div className="nav-actions">
        
          <button className="logout-btn">Logout</button>
          <button className="logout-btn"><a href="/signin">SignIn</a></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
