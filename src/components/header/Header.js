import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../Store/auth/auth";
import "./Header.css";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  };

  
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
            {!authState.login ? (
              <NavLink className="navLink-login-btn" to="/login">
                Login
              </NavLink>
            ) : (
              <NavLink className="navLink-login-btn" onClick={logoutHandler}>
                Logout
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
