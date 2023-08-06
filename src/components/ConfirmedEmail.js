import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const ConfirmedEmail = () => {
  const { confirmEmail } = useContext(UserContext);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const asyncConfirmEmail = async (token, tokenId) => {
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
  };

  useEffect(() => {
    let token = searchParams.get("token");
    let tokenId = searchParams.get("tokenId");
    asyncConfirmEmail(token, tokenId);
  }, []);

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
