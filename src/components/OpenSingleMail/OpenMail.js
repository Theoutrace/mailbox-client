import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./OpenMail.css";

const OpenMail = () => {
  const location = useLocation();
  const authMail = useSelector((state)=>state.auth)
  // console.log(location.state);
  // const allMails = useSelector((state)=> state.mail)



  const plainEmail = authMail.email.replace(/[^a-zA-Z0-9]/g,'')
  // console.log(plainEmail);

  const mailId = location.state.id

  function markRead(plainEmail,mailId){
    fetch(`https://mailbox-clie-default-rtdb.firebaseio.com/${plainEmail}/inbox/${mailId}.json`,{
      method: 'PUT',
      body:JSON.stringify({...location.state.values, read:true}),
      headers: {'Content-Type':'application/json'}
    }).then(res=>{
      if(res.ok){
        return res.json().then(data=>{
          // console.log(data);
        })
      }
    })


  }

  markRead(plainEmail,mailId)



  const obj = location.state;
  const fromId = obj.values.from;
  const firstInitialFrom = fromId[0];

  return (
    <div>
      <div className="openmail-ouer-div-mail-content-cntnr">
        <div className="from-initial-text-from-contnr">{firstInitialFrom}</div>
        <div className="email-time-dte-container-open-mel">
          <div className="from-from-user-mail">
            <div className="from-text-open-mail-container">from: </div>
            {obj.values.from}
          </div>
          <div className="date-dte-time-tme-opn-mail">
            <div>{obj.values.time.date}</div>
            <div>{obj.values.time.time}</div>
          </div>
        </div>
      </div>
      <div className="sub-cntnr-sb-opn-mel-cntnr-und-frm">
        <div className="from-text-open-mail-container ">Subject : </div>
        <div>{obj.values.subject}</div>
      </div>
      <div className="mail-body-opn-mail-main-cntnr">
        <div>{obj.values.body}</div>
      </div>
    </div>
  );
};

export default OpenMail;
