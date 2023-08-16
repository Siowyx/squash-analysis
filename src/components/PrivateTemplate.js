import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PrivateTemplate = () => {
  return (
    <>
      <Navbar isDark={false} />
      <Outlet />
    </>
  );
};

export default PrivateTemplate;
