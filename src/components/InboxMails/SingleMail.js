import React from "react";
import './SingleMail.css'

const SingleMail = (props) => {
//   console.log(props);
  const data = props.mail[0];
  return (
    <div className="single-mail-container-inbox">
      <div>
        <input type="checkbox" />
      </div>
      <div>{data.values.from}</div>
      <div>{data.values.subject}</div>
    </div>
  );
};

export default SingleMail;
