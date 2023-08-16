// https://medium.com/@sourabhbagrecha/implement-email-password-authentication-in-react-using-mongodb-realm-a6dc9123802b

import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import validator from "validator";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // We are consuming our user-management context to
  // get & set the user details here
  const { emailPasswordSignup } = useContext(UserContext);

  // We are using React's "useState" hook to keep track
  //  of the form values.
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(false);

  // This function will be called whenever the user edits the form.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setIsValidEmail(validator.isEmail(form.email));
  };

  // This function gets fired when the user clicks on the "Signup" button.
  const onSubmit = async () => {
    try {
      // Here we are passing user details to our emailPasswordSignup
      // function that we imported from our realm/authentication.js
      // to validate the user credentials and signup the user into our App.
      await emailPasswordSignup(form.email, form.password);
      navigate("/emailConfirmation", {
        state: { email: form.email },
      });
    } catch (error) {
      alert(error);
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
        />
        <label htmlFor="password">Password</label>
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
        Sign Up
      </button>
      <div className="text-center text-white">
        <p>
          Already have an account?{"   "}
          <Link className="custom-a" to="/login">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
