import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ComposeMail from "./components/email/ComposeMail";
import Header from "./components/header/Header";
import LoginSignup from "./pages/LoginSignup";
import WelcomePage from "./pages/WelcomePage";
import { authActions } from "./Store/auth/auth";

function App() {
  console.log('app ran');
  const authStateValue = useSelector((state) => state.auth);
  // console.log(authStateValue.email);
  const dispatch=useDispatch()
  const history = useNavigate()

  useEffect(()=>{
    // console.log('app useeffect ran');
    const email = localStorage.getItem('email')
    const idToken = localStorage.getItem('token')

      // console.log(email,'============');
    if(email){
      // console.log(email,'---------------------------');
      // console.log(idToken);
      dispatch(authActions.login({email:email, idToken: idToken}))
      history('/welcome/inbox')

    }else{
      // console.log(authStateValue.email,'---------------------------------');
      dispatch(authActions.logout())
    }
  },[dispatch, authStateValue.email])

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="app-components-routes">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          {authStateValue.login && <Route path="/welcome" element={<Navigate to="/welcome/inbox" />} />}
          {!authStateValue.login && (
            <Route path="/welcome/*" element={<Navigate to="/login" />} />
          )}
          {!authStateValue.login && (
            <Route path="/compose" element={<Navigate to="/login" />} />
          )}

          {!authStateValue.login && (
            <Route path="/Login" element={<LoginSignup />} />
          )}
          {authStateValue.login && (
            <Route path="/welcome/*" element={<WelcomePage />} />
          )}
          {authStateValue.login && (
            <Route path="/compose" element={<ComposeMail />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
