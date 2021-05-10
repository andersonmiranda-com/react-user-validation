import React, { useEffect, useState } from "react";
import firebaseconfig from "../firebase/firebaseIndex";
import firebase from "firebase";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") setIsLoggedIn(true);
  }, []);

  const onSignUpHandler = async (email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
        setErrors("");
      })
      .catch((err) => {
        console.error(err);
        setErrors(err.message);
        setIsLoggedIn(false);
      });
  };

  const onLoginHandler = (email, password) => {
    return (
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        //everything is almost exactly the same as the function above
        .then(async (res) => {
          localStorage.setItem("isLoggedIn", "1");
          setIsLoggedIn(true);
          setErrors("");
          console.log(res);
        })
        .catch((err) => {
          setErrors(err.message);
          setIsLoggedIn(false);
        })
    );
  };

  const onLogoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        localStorage.removeItem("isLoggedIn");
        setErrors("");
        setIsLoggedIn(false);
      })
      .catch((err) => {
        setErrors(err.message);
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: onLogoutHandler,
        onLogin: onLoginHandler,
        onSignup: onSignUpHandler,
        errors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
