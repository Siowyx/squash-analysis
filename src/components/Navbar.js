import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import squashball from "../img/squash-ball.png";

const Navbar = ({ isDark }) => {
  const { user, fetchUser, logOutUser } = useContext(UserContext);

  // to check is user is logged in
  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        try {
          const fetchedUser = await fetchUser();
        } catch (error) {
          alert(error);
        }
      }
    };
    checkUser();
  }, []);

  return (
    <nav
      className={`navbar ${
        isDark ? "navbar-dark" : "navbar-light"
      } sticky-top navbar-expand-lg bg-transparent`}
    >
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
              {user ? (
                <Link className="nav-link" onClick={logOutUser} to={"/"}>
                  Logout
                </Link>
              ) : (
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              )}
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
