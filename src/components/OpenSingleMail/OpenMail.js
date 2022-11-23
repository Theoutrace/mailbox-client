import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { mailActions } from "../../Store/mail/mail";
import deleteIcon from "./images/delete.png";
import "./OpenMail.css";

const OpenMail = () => {
  const location = useLocation();
  const authMail = useSelector((state) => state.auth);
  const allMails = useSelector((state) => state.mail.inboxMails);
  const dispatch = useDispatch();
  const history = useNavigate();

  const plainEmail = authMail.email.replace(/[^a-zA-Z0-9]/g, "");
  const mailId = location.state.id;

  useEffect(() => {
    // console.log('marking use effect');

    const reamainingMails = allMails.filter(mail=> mail[0].id !== mailId && mail[0].values.read !== true)
    // console.log(reamainingMails);

      fetch(
        `https://mailbox-two-default-rtdb.firebaseio.com/${plainEmail}/inbox/${mailId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ ...location.state.values, read: true }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            dispatch(mailActions.markReadChage(reamainingMails))
          });
        }
      });

  }, []);

  const obj = location.state;
  const fromId = obj.values.from;
  const firstInitialFrom = fromId[0]; // for user name 1 letter

  const deleteMailHandler = () => {
    const plainEmail = authMail.email.replace(/[^a-zA-Z0-9]/g, "");
    const reamainingMails = allMails.filter(
      (mail) => mail[0].id !== location.state.id
    );
    const mailIdToDeleteMail = location.state.id;
    // console.log(plainEmail,mailId);

    if (plainEmail.length > 0 && mailId.length > 0) {
      fetch(
        `https://mailbox-two-default-rtdb.firebaseio.com/${plainEmail}/inbox/${mailIdToDeleteMail}.json`,
        {
          method: "DELETE",
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            // console.log(data);
            dispatch(mailActions.getMails(reamainingMails));
            history("/welcome/inbox");
          });
        } else {
          alert("something went wrong!");
        }
      });
    }
  };

  return (
    <div>
      <div className="more-options-in-open-mail-single-cntnr">
        <button onClick={() => history("/welcome/inbox")}>Back</button>
        <div onClick={deleteMailHandler}>
          <img src={deleteIcon} alt="" width="14" />
          Remove
        </div>
      </div>
      <div className="openmail-ouer-div-mail-content-cntnr">
        <div className="from-initial-text-from-contnr">{firstInitialFrom}</div>
        <div className="email-time-dte-container-open-mel">
          <div className="from-from-user-mail">
            <div className="from-text-open-mail-container">from : </div>
            {obj.values.from}
          </div>
          <div className="date-dte-time-tme-opn-mail">
            <div className="date-open-single-mail">{obj.values.time.date}</div>
            <div className="time-open-single-mail">{obj.values.time.time}</div>
          </div>
        </div>
      </div>
      <div className="sub-cntnr-sb-opn-mel-cntnr-und-frm">
        <div className="from-text-open-mail-container ">Subject : </div>
        <div>{obj.values.subject}</div>
      </div>
      <div className="mail-body-opn-mail-main-cntnr">
        <div className="mail-main-body-received-text-container">
          {obj.values.body}
        </div>
      </div>
    </div>
  );
};

export default OpenMail;
