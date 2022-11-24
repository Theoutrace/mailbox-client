import { useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ComposeMail.css";

const ComposeMail = () => {
  const authStateValue = useSelector((state) => state.auth);
  const enteredToInputRef = useRef();
  const enteredSubjectInputRef = useRef();
  const history = useNavigate();
  let bodyText;

  const onEditorStateChange = (event) => {
    bodyText = event.getCurrentContent().getPlainText();
  };

  const userEmail = authStateValue.email
    ? authStateValue.email
    : localStorage.getItem("email");
  const userPlainEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "");

  const currentDate = {
    date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    time: `${new Date().getHours()}:${new Date().getMinutes()}`
  };


  const onSendClickHandler = async () => {
    const enteredTo = enteredToInputRef.current.value;
    const enteredSubject = enteredSubjectInputRef.current.value;


    const mailObj = {
      from: userEmail,
      subject: enteredSubject,
      body: bodyText,
      read: false,
      time:currentDate
    };

    console.log(mailObj);

    const toPlainEmail = enteredTo.replace(/[^a-zA-Z0-9]/g, ""); // receiver's email

    const URL = `https://mailbox-two-default-rtdb.firebaseio.com/${toPlainEmail}/inbox.json`;
    const URLSENT = `https://mailbox-two-default-rtdb.firebaseio.com/${userPlainEmail}/sent.json`;
    try {
      if (toPlainEmail.length > 0) {
        fetch(URL, {
          method: "POST",
          body: JSON.stringify({ ...mailObj }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          if (res.ok) {
            fetch(URLSENT, {
              method: "POST",
              body: JSON.stringify({ ...mailObj }),
              headers: { "Content-Type": "application/json" },
            }).then((res) => {
              if (res.ok) {
                // alert(`Mail sent Successfully to ${enteredTo}`);
                enteredToInputRef.current.value = "";
                enteredSubjectInputRef.current.value = "";
              }
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelComposeHandler = () => {
    history("/welcome/inbox");
  };

  return (
    <div className="compose-mail-component">
      <div className="compose-mail-inner">
        <div className="label-container-to">
          <label htmlFor="mail-id">To,</label>
        </div>
        <input
          id="mail-id"
          type="email"
          ref={enteredToInputRef}
          placeholder="abc@xyz.com"
        />
        <input type="text" placeholder="Subject" ref={enteredSubjectInputRef} />
        <div className="editor-container-body-space">
          <Editor onEditorStateChange={onEditorStateChange} />
        </div>

        <button onClick={onSendClickHandler}>Send</button>
      </div>
      <div className="cancel-mail-btn-cntnr">
        <button onClick={cancelComposeHandler}>🡐 Back</button>
      </div>
    </div>
  );
};

export default ComposeMail;
