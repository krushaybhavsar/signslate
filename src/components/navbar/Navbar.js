import React from "react";
import "../navbar/navbar.css";
import { Link } from "react-router-dom";
import "../../globalVars";

const Navbar = () => {
  const navigateHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="Navbar">
      <div className="logoContainer" onClick={navigateHome}>
        <img src="assets/logo.png" className="logoImg" />
        <h1 className="logoText">Signslate</h1>
      </div>
      <ul>
        <li>
          <Link to={global.translateToASL}>Translate to ASL</Link>
        </li>
        <li>
          <Link to={global.translateToEnglish}>Translate to English</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
