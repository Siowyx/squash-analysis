import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import squashcourt from "../img/squash-court.png";

const Template = () => {
  return (
    <div
      className="text-center bg-image"
      style={{
        backgroundImage: `url(${squashcourt})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "calc(max(100%, calc(100vh)))",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      >
        <Navbar isDark={true}></Navbar>
      </div>
      <Outlet />
    </div>
  );
};

export default Template;
