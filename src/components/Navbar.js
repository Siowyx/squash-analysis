import React from "react";
import { Link } from "react-router-dom";
import squashball from "../img/squash-ball.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark sticky-top navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={squashball}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />{" "}
          Squash Analysis
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li> */}
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </ul>
          <span className="navbar-text ms-auto">
            Built by squash players for squash players &#9829;
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
