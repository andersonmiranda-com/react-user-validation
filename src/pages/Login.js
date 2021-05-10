import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";

import EmailForm from "../components/layout/EmailForm";

const SignIn = (props) => {
  const ctx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (ctx.isLoggedIn && ctx.errors.length === 0) {
      history.push("/");
    }
  }, [ctx]);

  const submitHandler = (email, password) => {
    ctx.onLogin(email, password);
  };

  return (
    <>
      <h2>Login</h2>
      <EmailForm onSubmit={submitHandler} action="Login" />
      <div className="centered">
        Don't you have an account? Please <a href="/signup">sign up</a>.
      </div>
    </>
  );
};

export default SignIn;
