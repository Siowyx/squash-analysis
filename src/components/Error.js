import React from "react";

const Error = () => {
  return (
    <div className="text-white text-center">
      <h1 className="mb-3" style={{ position: "relative", paddingTop: "50vh" }}>
        Oops! This page doesn't exist.
      </h1>
      <a
        className="btn btn-outline-light btn-lg"
        style={{ position: "relative" }}
        href="/"
        role="button"
      >
        Home
      </a>
    </div>
  );
};

export default Error;
