import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Template from "./components/Template";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmailConfirmation from "./components/EmailConfirmation";
import ConfirmedEmail from "./components/ConfirmedEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
// import SquashFloor from "./components/SquashFloor";
import Error from "./components/Error";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <Template>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />{" "}
          <Route path="/emailConfirmation" element={<EmailConfirmation />} />
          <Route path="/confirmedEmail" element={<ConfirmedEmail />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Template>
    </div>
  );
}

export default App;
