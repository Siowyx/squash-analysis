import { useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const ConfirmedEmail = () => {
  const { confirmEmail } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const asyncConfirmEmail = useCallback(
    async (token, tokenId) => {
      try {
        await confirmEmail(token, tokenId);
      } catch (error) {
        switch (error.statusCode) {
          case 404:
            navigate("/error");
            break;

          default:
            alert(error);
            break;
        }
      }
    },
    [confirmEmail, navigate]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let token = searchParams.get("token");
    let tokenId = searchParams.get("tokenId");
    asyncConfirmEmail(token, tokenId);
  }, [asyncConfirmEmail]);

  return (
    <div className="text-white text-center">
      <h1 className="mb-3" style={{ position: "relative", paddingTop: "50vh" }}>
        Thanks for confirming your email address!
      </h1>
      <a
        className="btn btn-outline-light btn-lg"
        style={{ position: "relative" }}
        href="/login"
        role="button"
      >
        Login
      </a>
    </div>
  );
};

export default ConfirmedEmail;
