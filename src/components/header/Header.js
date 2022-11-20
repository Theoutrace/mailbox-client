import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="contnr-app-name">
        <div className="app-name">weMail</div>
      </div>
      <div className="ul-contnr-hedr-menu">
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>About Us</li>
          <li>Signup</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
