import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);

  const loadUser = async () => {
    if (!user) {
      try {
        const fetchedUser = await fetchUser();
        if (!fetchedUser) {
          // user is not already logged in, so dont redirect
          return;
        }
      } catch (error) {
        alert(error);
      }
    }
    navigate("/home");
  };

  // This useEffect will run only once when the component is mounted.
  // Hence this is helping us in verifying whether the user is already logged in
  // or not.
  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
