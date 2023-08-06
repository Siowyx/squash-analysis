// https://medium.com/@sourabhbagrecha/implement-email-password-authentication-in-react-using-mongodb-realm-a6dc9123802b

import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import validator from "validator";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // We are consuming our user-management context to
  // get & set the user details here
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  // We are using React's "useState" hook to keep track
  //  of the form values.
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorCode, setErrorCode] = useState(200);

  // This function will be called whenever the user edits the form.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setIsValidEmail(validator.isEmail(form.email));
  };

  // This function will redirect the user to the
  // appropriate page once the authentication is done.
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };

  // Since there can be chances that the user is already logged in
  // but whenever the app gets refreshed the user context will become
  // empty. So we are checking if the user is already logged in and
  // if so we are redirecting the user to the home page.
  // Otherwise we will do nothing and let the user to login.
  const loadUser = async () => {
    if (!user) {
      try {
        const fetchedUser = await fetchUser();
        if (fetchedUser) {
          // Redirecting them once fetched.
          redirectNow();
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  // This useEffect will run only once when the component is mounted.
  // Hence this is helping us in verifying whether the user is already logged in
  // or not.
  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function gets fired when the user clicks on the "Login" button.
  const onSubmit = async (event) => {
    try {
      // Here we are passing user details to our emailPasswordLogin
      // function that we imported from our realm/authentication.js
      // to validate the user credentials and login the user into our App.
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      // need to handle error when logeg in before cmfirmation !!!!!!!!!!!!!

      switch (error.statusCode) {
        case 401: // invalid usernam or pass
          setErrorCode(401);
          break;

        default:
          alert(error);
          break;
      }
    }
  };

  return (
    <form
      className="container-fluid d-flex flex-column"
      style={{
        width: "30%",
        minWidth: "400px",
        paddingTop: "32vh",
        position: "relative",
      }}
    >
      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${!isValidEmail && "invalid-input"} `}
          id="email"
          placeholder="name@example.com"
          name="email"
          value={form.email}
          onChange={onFormInputChange}
        />
        <label htmlFor="email">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className={`form-control ${
            (form.password.length < 6 || form.password.length > 128) &&
            "invalid-input"
          } `}
          id="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={onFormInputChange}
          aria-describedby="invalidUserPassMsg"
        />
        <label htmlFor="password">Password</label>
        {errorCode == 401 && (
          <small id="invalidUserPassMsg" style={{ color: "#FF0000" }}>
            Invalid username/password or email verification required!{" "}
          </small>
        )}
      </div>
      <div className="mb-3">
        <Link className="custom-a" to="/forgotPassword">
          Forgot Password?
        </Link>
      </div>
      <button
        type="button"
        className={`btn btn-primary mb-4 ${
          (!isValidEmail ||
            form.password.length < 6 ||
            form.password.length > 128) &&
          "disabled"
        }`}
        onClick={onSubmit}
      >
        Log In
      </button>
      <div className="text-center text-white">
        <p>
          Don't have an account?{"   "}
          <Link className="custom-a" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
