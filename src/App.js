import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ComposeMail from "./components/email/ComposeMail";
import Header from "./components/header/Header";
import LoginSignup from "./pages/LoginSignup";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const authStateValue = useSelector((state) => state.auth);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="app-components-routes">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/welcome" element={<Navigate to="/welcome/inbox" />} />
          {!authStateValue.login && (
            <Route path="/welcome" element={<Navigate to="/login" />} />
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
