import "./App.css";
import Header from "./components/header/Header";
import Signup from "./components/loginSignupForms/Signup";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Signup/>
      </header>
    </div>
  );
}

export default App;
