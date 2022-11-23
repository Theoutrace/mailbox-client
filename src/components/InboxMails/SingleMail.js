import React from "react";
import { NavLink } from "react-router-dom";
import "./SingleMail.css";

const SingleMail = (props) => {
  const data = props.mail[0];
  // console.log(data);

  return (
    <div
      className={
        !data.values.read
          ? "single-mail-container-inbox"
          : "single-mail-container-inbox-seen"
      }
    >
      <div className="checkbx-frm-sendr-sub-cntnr">
        <div className="check-box-single-mail">
          <input type="checkbox" />
        </div>
      </div>
      <div
        className={
          !data.values.read
            ? "blue-dot-read-notread-mail-inbox"
            : "blue-dot-read-notread-mail-inbox-hide"
        }
      ></div>
      <NavLink
        className="navlink-from-mail-single"
        to={props.mail[0].id}
        state={data}
      >
        <div className="nav-lnk-first-div">
          <div className="from-text-n-sende-mail-cntnr">
            <div className="from-text-container">from</div>
            <div className="from-mail-txt-container">{data.values.from}</div>
          </div>
          <div className="sub-sub-singl-mel-sub">{data.values.subject}</div>
          <div className="date-n-time-container-sngl-mail-inbx">
            <div className="date-single-mel-inbx">{data.values.time.date}</div>
            <div className="time-single-mel-inbx">{data.values.time.time}</div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleMail;
