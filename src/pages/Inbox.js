import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "../components/InboxMails/SingleMail";
import { mailActions } from "../Store/mail/mail";

let initial = true;

const Inbox = () => {
  const inbox = useSelector((state) => state.mail);
  const allMails = inbox.inboxMails;
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const plainEmail = authState.email.replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {

    function getmailsAgain() {
      console.log("fetching called", new Date().getSeconds());
      if (plainEmail.length > 0) {
        fetch(
          `https://mailbox-two-default-rtdb.firebaseio.com/${plainEmail}/inbox.json`,
          {
            method: "GET",
          }
        ).then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              if (data) {
                const result = Object.keys(data).map((key) => [
                  { id: key.toString(), values: data[key] },
                ]);

                dispatch(mailActions.getMails(result));

                const notReadMails = result.filter(
                  (mail) => mail[0].values.read === false
                );

                dispatch(mailActions.markReadChage(notReadMails));
              } else {
                dispatch(mailActions.markReadChage([]));
                dispatch(mailActions.getMails([]));
              }
            });
          }
        });
      }
    }

    // setInterval(() => {
    //   getmailsAgain();
    // }, 10000);

    if (initial) {
      initial = false;
      getmailsAgain();
      return;
    }


  }, [allMails.length, plainEmail, dispatch]);

  return (
    <div className="compose-mail-component">
      {allMails.map((mail) => {
        return <SingleMail key={mail[0].id} mail={mail} />;
      })}
    </div>
  );
};

export default Inbox;
