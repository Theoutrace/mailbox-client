import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { mailActions } from "../../Store/mail/mail";
import deleteIcon from './images/delete.png'
import "./SinglSentMail.css";

const SinglSentMail = (props) => {
  const authEmail = useSelector((state) => state.auth.email);
  const allMails = useSelector((state) => state.mail.sentMails);
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  const data = props.mail[0];

  const deleteMailHandler = () => {
    const plainEmail = authEmail.replace(/[^a-zA-Z0-9]/g, "");
    const reamainingMails = allMails.filter((mail) => mail[0].id !== data.id);
    const mailId = data.id;
    fetch(
      `https://mailbox-two-default-rtdb.firebaseio.com/${plainEmail}/sent/${mailId}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          dispatch(mailActions.getSent(reamainingMails));
        });
      } else {
        alert("something went wrong!");
      }
    });
  };


  return (
    <div
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
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
          {!isShow && (
            <div className="date-n-time-container-sngl-mail-inbx">
              <div className="date-single-mel-inbx">
                {data.values.time.date}
              </div>
              <div className="time-single-mel-inbx">
                {data.values.time.time}
              </div>
            </div>
          )}
        </div>
      </NavLink>
      {isShow && (
        <div
          className="delete-btn-single-mail-itm-inbox"
          onClick={deleteMailHandler}
        >
          <img src={deleteIcon} alt="" width="20"></img>
        </div>
      )}
    </div>
  );
};

export default SinglSentMail;
