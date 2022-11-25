import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "../components/InboxMails/SingleMail";
import { authActions } from "../Store/auth/auth";
import { mailActions } from "../Store/mail/mail";

let initial = true;

const Inbox = () => {
  const inbox = useSelector((state) => state.mail);
  const allMails = inbox.inboxMails;
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("useEffect ran");

    function getmailsAgain() {
      const userMail = localStorage.getItem("email");
      const plainEmail = userMail
        ? userMail.replace(/[^a-zA-Z0-9]/g, "")
        : null;
      console.log(plainEmail);
      if (plainEmail) {
        console.log(plainEmail, "-----------------------");
        fetch(
          `https://mailbox-two-default-rtdb.firebaseio.com/${plainEmail}/inbox.json`,
          {
            method: "GET",
          }
        )
          .then((res) => {
            if (res.ok) {
              return res.json().then((data) => {
                dispatch(authActions.online());

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
          })
          .catch((error) => {
            setError(() => true);
            dispatch(authActions.offline());
          });
      } else {
        clearInterval(intervalId);
      }
    }

    const intervalId = setInterval(() => {
      getmailsAgain();
    }, 2000);

    const userMail = localStorage.getItem("email");
    if (initial && authState.email === userMail) {
      initial = false;
      getmailsAgain();
      return;
    }
  }, [allMails.length, authState.email, dispatch]);

  return (
    <div className="compose-mail-component">
      {error ? (
        <div>
        <h2>oops! You seem to be offline</h2>
        <h3>please check your connections and refresh the page.</h3>
        </div>
      ) : (
        allMails.map((mail) => {
          return <SingleMail key={mail[0].id} mail={mail} />;
        })
      )}
    </div>
  );
};

export default Inbox;
