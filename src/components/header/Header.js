import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../Store/auth/auth";
import "./Header.css";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [initial, setInitial] = useState(null);

  useEffect(()=>{
    if (authState.email) {
      const userInitial = authState.email; // loggedIn user email first letter
      setInitial(() => userInitial);
    } else {
      setInitial(null);
    }

  },[authState.email])



  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
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
      {initial ? (
        <div className="user-initial-div-text-container-header">{initial}
        <div className={!authState.offline? "online-dot-header":"offline-dot-header"}></div></div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
