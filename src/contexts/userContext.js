// https://medium.com/@sourabhbagrecha/implement-email-password-authentication-in-react-using-mongodb-realm-a6dc9123802b

import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realm/constants";

// Creating a Realm App Instance
const app = new App(APP_ID);

// Creating a user context to manage and access all the user related functions
// across different component and pages.
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to login user into our Realm using their email & password
  const emailPasswordLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    const authedUser = await app.logIn(credentials);
    setUser(authedUser);
    return authedUser;
  };

  // Function to signup user into our Realm using their email & password
  const emailPasswordSignup = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser({ email, password });
    } catch (error) {
      throw error;
    }
  };

  // Function to confirm user email address to sign up
  const confirmEmail = async (token, tokenId) => {
    try {
      await app.emailPasswordAuth.confirmUser({ token, tokenId });
    } catch (error) {
      throw error;
    }
  };

  // Function to resend a confirmation email
  const resendConfirmation = async (email) => {
    try {
      await app.emailPasswordAuth.resendConfirmationEmail({ email });
    } catch (error) {
      throw error;
    }
  };

  // Function to send a password reset email
  const sendResetPasswordEmail = async (email) => {
    try {
      await app.emailPasswordAuth.sendResetPasswordEmail({ email });
    } catch (error) {
      throw error;
    }
  };

  // Function to reset user password
  const resetPassword = async (newPassword, token, tokenId) => {
    try {
      await app.emailPasswordAuth.resetPassword({
        password: newPassword,
        token,
        tokenId,
      });
    } catch (error) {
      throw error;
    }
  };

  // Function to fetch-user(if the user is already logged in) from local storage
  const fetchUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();
      // Now if we have a user we are setting it to our user context
      // so that we can use it in our app across different components.
      setUser(app.currentUser);
      return app.currentUser;
    } catch (error) {
      switch (error.statusCode) {
        case 401:
          return false;

        default:
          throw error;
      }
    }
  };

  // Function to logout user from our Realm
  const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.logOut();
      // Setting the user to null once loggedOut.
      setUser(null);
      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        emailPasswordLogin,
        emailPasswordSignup,
        resendConfirmation,
        confirmEmail,
        sendResetPasswordEmail,
        resetPassword,
        logOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
