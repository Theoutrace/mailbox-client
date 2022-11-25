import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleSentMail from "../components/sentMails/SinglSentMail";
import { mailActions } from "../Store/mail/mail";

const SentBox = () => {
  const authMail = useSelector((state) => state.auth.email);
  const plainMail = authMail.replace(/[^a-zA-Z0-9]/g, "");
  const sentMails = useSelector((state) => state.mail.sentMails);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('running');
    fetch(
      `https://mailbox-two-default-rtdb.firebaseio.com/${plainMail}/sent.json`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          if (data) {
            const result = Object.keys(data).map((key) => [
              { id: key, values: data[key] },
            ]);
            // console.log(result);
            dispatch(mailActions.getSent(result));
          }else{
            dispatch(mailActions.getSent([]))
          }
        });
      }
    });
  }, []);
  return (
    <div className="compose-mail-component">
      {sentMails.map((mail) => {
        return <SingleSentMail key={mail[0].id} mail={mail} />;
      })}
    </div>
  );
};

export default SentBox;
