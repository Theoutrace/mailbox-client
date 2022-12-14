import React from "react";
import "./Welcome.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Inbox from "./Inbox";
import ComposeMail from "../components/email/ComposeMail";
import OpenMail from "../components/OpenSingleMail/OpenMail";
import { useSelector } from "react-redux";
import SentBox from "./SentBox";
import OpenSingleSentMail from "../components/openSingleSentMail/OpenSingleSentMail";

const WelcomePage = () => {
  const unReadMails = useSelector((state) => state.mail.markUnRead);

  return (
    <div className="welcome-component-container">
      <div className="welcome-contain-compose-inbox-sent-containers">
        <div className="contain-compose-inbox-sent">
          <div className="contain-compose-inbox-sent-ab">
            <NavLink className="single-navlink-container-navlink" to="compose">
              COMPOSE
            </NavLink>
            <NavLink className="single-navlink-container-navlink" to="inbox">
              <div className="inbox-btn-navlink-text-cntnr">Inbox</div>
              <div className="unread-mails-count-inbx-btn">
                {unReadMails.length}
              </div>
            </NavLink>
            <NavLink className="single-navlink-container-navlink" to="sent">
              Sent
            </NavLink>
          </div>
          <div className="inbox-sent-compose-container">
            <Routes>
              <Route path="inbox" element={<Inbox />} />
              <Route path="compose" element={<ComposeMail />} />
              <Route path="sent" element={<SentBox />} />
              <Route path="sent/:mailId" element={<OpenSingleSentMail />} />
              <Route path="inbox/:mailId" element={<OpenMail />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
