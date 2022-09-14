import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Signin from "./components/webauthn/Signin";
import Login from "./components/webauthn/Login";
import Home from "./components/webauthn/Home";
import Welcome from "./components/webauthn/Welcome";
import Navbar from "./components/webauthn/Navbar";
import Dashboard from "./components/webauthn/Dashboard";
import AdminDashboard from "./components/admin/Dashboard";
import CreateCode from "./components/admin/CreateCode";
import Form from "./components/admin/CreateCode";
import Error from "./components/webauthn/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/portalRegister" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/take-attendance" element={<Home attendance />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admin" element={<Home admin />} />
        <Route path="/admin/create-code" element={<CreateCode />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

// {/* <Navbar /> */}
// {/* <Signin /> */}
// {/* <Login /> */}
// {/* <Home /> */}
// // <Home attendance />
// {/* <Home admin /> */}
// {/* <Welcome /> */}
// {/* <Dashboard /> */}
// {/* <Form /> */}
export default App;
