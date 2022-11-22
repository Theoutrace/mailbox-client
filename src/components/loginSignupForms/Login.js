import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../Store/auth/auth";
import "./Login.css";

const Login = (props) => {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const history = useNavigate()
  const dispatch = useDispatch()

  const URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhhQvMVnkPCbfy1-UGhTN18Z9O8_-Ugx4";

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // console.log(data);
          localStorage.setItem('token',data.idToken)
          localStorage.setItem('email', data.email)
          dispatch(authActions.login({email: data.email, idToken: data.idToken}))
          history('/welcome')
        });
      } else {
        const errorMsg = "Authentication Failed";
        alert(errorMsg);
      }
    });
  };


  const loginSignupToggleHandler = ()=>{
    props.toToggle()
  }

  return (
    <div className="signup-conponent-container">
      <div className="signup-form-container">
        <form onSubmit={formSubmitHandler}>
          <div className="signup-text-heading">Login</div>
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
          <div className="signup-form-btn-container">
            <button>Login</button>
          </div>
        </form>
        <div className="have-an-account-option-container">
          <div className="have-an-account-text-n-btn-container">
            Don't have an account?
            <button onClick={loginSignupToggleHandler}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;