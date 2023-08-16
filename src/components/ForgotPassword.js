import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import validator from "validator";

const ForgotPassword = () => {
  const { sendResetPasswordEmail } = useContext(UserContext);

  const [isValidEmail, setIsValidEmail] = useState(false);

  const [form, setForm] = useState({
    email: "",
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setIsValidEmail(validator.isEmail(form.email));
  };

  const onSubmit = async (event) => {
    try {
      await sendResetPasswordEmail(form.email);
      setIsValidEmail(true);
    } catch (error) {
      switch (error.statusCode) {
        case 404:
          setIsValidEmail(false);
          break;

        default:
          break;
      }
      console.trace(error);
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

      <button
        type="button"
        className={`btn btn-primary mb-4 ${!isValidEmail && "disabled"}`}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={onSubmit}
      >
        Send Password Reset Link
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-dark">
              {isValidEmail ? (
                <p>
                  A password reset link has been sent to{" "}
                  <strong> {form.email}</strong>
                </p>
              ) : (
                <p>Sorry, the email address is invalid or not a user!</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
