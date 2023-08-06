import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const EmailConfirmation = () => {
  const { resendConfirmation } = useContext(UserContext);
  const { state } = useLocation();

  const [invalidEmail, setInvalidEmail] = useState(false);

  const resendEmail = async () => {
    try {
      await resendConfirmation(state.email);
    } catch (error) {
      switch (error.statusCode) {
        case 404:
          setInvalidEmail(true);
          break;

        default:
          alert(error);
          break;
      }
    }
  };

  return (
    <div className="text-white text-center">
      <h2 className="mb-3" style={{ position: "relative", paddingTop: "50vh" }}>
        Thanks for signing up!
      </h2>
      <p className="mb-3" style={{ position: "relative" }}>
        Please confirm your email address using the link sent to your inbox.
        <br />
        The link will be valid for 30 minutes.
      </p>

      {/* https://getbootstrap.com/docs/5.3/components/modal/#static-backdrop */}
      <button
        type="button"
        className="btn btn-outline-light btn-lg"
        style={{ position: "relative" }}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={resendEmail}
      >
        Resend Confirmation Email
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
              {invalidEmail ? (
                <p>Email address is invalid or not a user!</p>
              ) : (
                <p>
                  A new confirmation email has been sent to{" "}
                  <strong> {state.email}</strong>
                </p>
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
    </div>
  );
};

export default EmailConfirmation;
