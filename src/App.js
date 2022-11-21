import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import LoginSignup from "./pages/LoginSignup";
import WelcomePage from "./pages/WelcomePage";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<Navigate to='/home'/>}/>
        <Route path="/Login" element={<LoginSignup/>}/>
        <Route path="/welcome" element={<WelcomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
