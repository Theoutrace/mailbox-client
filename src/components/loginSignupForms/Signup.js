import React, { useRef, useState } from "react";
import "./Signup.css";

const Signup = (props) => {
  const [checkPass, setCheckPass] = useState("");

  const URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhhQvMVnkPCbfy1-UGhTN18Z9O8_-Ugx4";

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    const enteredConfirmPassword = inputConfirmPasswordRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      setCheckPass("pass-didnt-match");
      alert("Password didn't match");
    } else {
      setCheckPass("");
      fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            console.log('User has successfully signed up!');
          });
        } else {
          const errorMsg = "Authentication Failed";
          alert(errorMsg);
        }
      });

    }
  };

  return (
    <div className="signup-conponent-container">
      <div className="signup-form-container">
        <form onSubmit={formSubmitHandler}>
          <div className="signup-text-heading">SignUp</div>
          <input
            type="email"
            placeholder="Email"
            required
            ref={inputEmailRef}
          />
          <input
            type="password"
            placeholder="Password"
            required
            ref={inputPasswordRef}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={checkPass}
            required
            ref={inputConfirmPasswordRef}
          />
          <div className="signup-form-btn-container">
            <button>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;