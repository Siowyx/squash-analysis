import React from "react";

const Welcome = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        padding: "20vh 30vh 0",
        position: "absolute",
        minHeight: "500px",
        minWidth: "700px",
      }}
    >
      <div className="text-white">
        <h1 className="mb-3">Welcome to Squash Analysis! </h1>
        <p className="mb-3">
          Take your squash game analysis to the next level with our innovative
          platform designed for in-depth shot placement analysis.
          <br />
          Sign up and start unlocking your full potential on the court with
          Squash Analysis today!
        </p>
        <a
          className="btn btn-outline-light btn-lg"
          href="/signup"
          role="button"
        >
          Sign Up!
        </a>
      </div>
    </div>
  );
};

export default Welcome;
