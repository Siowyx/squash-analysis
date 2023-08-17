import { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { resetPassword } = useContext(UserContext);

  const [token, setToken] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setToken(searchParams.get("token"));
    setTokenId(searchParams.get("tokenId"));
    setIsValidToken(true); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form, setForm] = useState({
    password: "",
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (event) => {
    try {
      await resetPassword(form.password, token, tokenId);
    } catch (error) {
      switch (error.statusCode) {
        // case 400: // must be 6-128 char // taken care by disabling button
        //   break;

        case 404: // token expired invalid
          setIsValidToken(false);
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
        <label htmlFor="password">New Password</label>
      </div>

      <button
        type="button"
        className={`btn btn-primary mb-4 ${
          (form.password.length < 6 || form.password.length > 128) && "disabled"
        }`}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={onSubmit}
        aria-disabled={
          form.password.length < 6 || form.password.length > 128
            ? "true"
            : "false"
        }
      >
        Reset Password
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
              {isValidToken ? (
                <p>Your password has been reset successfully!</p>
              ) : (
                <p>Failed to reset password: Token is expired or invalid.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
                onClick={() => navigate("/login")}
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

export default ResetPassword;
