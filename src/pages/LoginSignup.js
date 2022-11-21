import React, { useState } from "react";
import Login from "../components/loginSignupForms/Login";
import Signup from "../components/loginSignupForms/Signup";

const LoginSignup = () => {
  const [formLogin, setFormLogin] = useState(true);
  const loginSignupToggle = () => {
    setFormLogin((previous) => !previous);
  };
  return (
    <div>
      {formLogin ? (
        <Login toToggle={loginSignupToggle} />
      ) : (
        <Signup toToggle={loginSignupToggle} />
      )}
    </div>
  );
};

export default LoginSignup;
