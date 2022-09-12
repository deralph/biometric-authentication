import "./App.css";
import Signin from "./components/webauthn.js/Signin";
import Login from "./components/webauthn.js/Login";
import Home from "./components/webauthn.js/Home";
import Welcome from "./components/webauthn.js/Welcome";
import Navbar from "./components/webauthn.js/Navbar";
import Dashboard from "./components/webauthn.js/Dashboard";
import Form from "./components/admin/CreateCode";

function App() {
  return (
    <>
      <Navbar />
      {/* <Signin /> */}
      {/* <Login /> */}
      <Home />
      {/* <Home attendance /> */}
      {/* <Home admin /> */}
      {/* <Welcome /> */}
      {/* <Dashboard /> */}
      <Form />
    </>
  );
}

export default App;
