import React from "react";
import { NavLink } from "react-router-dom";
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
          <li>
            <NavLink className="navLink-login-btn" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
