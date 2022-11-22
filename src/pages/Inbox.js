import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleMail from "../components/InboxMails/SingleMail";
import auth from "../Store/auth/auth";

const Inbox = () => {
  const [allmails, setAllmails] = useState([]);
  const authState = useSelector((state) => state.auth);
  // console.log(authState.email.replace(/[^a-zA-Z0-9]/g,''));

  const plainEmail = authState.email.replace(/[^a-zA-Z0-9]/g, "");
  useEffect(() => {
    if (plainEmail.length > 0) {
      fetch(
        `https://mailbox-clie-default-rtdb.firebaseio.com/${plainEmail}/inbox.json`,
        {
          method: "GET",
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            // console.log(data);
            const result = Object.keys(data).map((key) => [
              { id: key.toString(), values: data[key] },
            ]);
            setAllmails(result);
          });
        }
      });
    }
  },[]);

  return (
    <div className="compose-mail-component">
      {allmails.map((mail) => {
       return <SingleMail key={mail[0].id} mail={mail}/>
      })}
    </div>
  );
};

export default Inbox;
