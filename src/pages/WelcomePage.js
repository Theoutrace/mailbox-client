import React from "react";
import "./Welcome.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Inbox from "./Inbox";
import ComposeMail from "../components/email/ComposeMail";

const WelcomePage = () => {
  return (
    <div className="welcome-component-container">
      {/* <div className="welcome-text-container">Welcome to your mail box</div> */}
      <div className="welcome-contain-compose-inbox-sent-containers">
        <div className="contain-compose-inbox-sent">
          <div className="contain-compose-inbox-sent-ab">
            <NavLink className="single-navlink-container-navlink" to="compose">
              COMPOSE
            </NavLink>
            <NavLink className="single-navlink-container-navlink" to="inbox">
              Inbox
            </NavLink>
            <NavLink className="single-navlink-container-navlink" to="sent">
              Sent
            </NavLink>
          </div>
          <div className="inbox-sent-compose-container">
            <Routes>
              <Route path="inbox" element={<Inbox />} />
              <Route path="compose" element={<ComposeMail />} />
              <Route path="sent" element={<ComposeMail />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
