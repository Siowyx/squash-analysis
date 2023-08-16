import React from "react";
import { Routes, Route } from "react-router-dom";
import Template from "./components/Template";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmailConfirmation from "./components/EmailConfirmation";
import ConfirmedEmail from "./components/ConfirmedEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Error from "./components/Error";
import PrivateRoute from "./components/PrivateRoute";
import PrivateTemplate from "./components/PrivateTemplate";
import Home from "./components/Home";
import Analysis from "./components/Analysis";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailConfirmation" element={<EmailConfirmation />} />
          <Route path="/confirmedEmail" element={<ConfirmedEmail />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateTemplate />}>
            <Route path="/home" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
