import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";

import EmailForm from "../components/layout/EmailForm";

const SignUp = (props) => {
  const ctx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (ctx.isLoggedIn && ctx.errors.length === 0) {
      history.push("/");
    }
  }, [ctx]);

  const submitHandler = (email, password) => {
    ctx.onSignup(email, password);
  };

  return (
    <>
      <h2>Sign Up</h2>
      <EmailForm onSubmit={submitHandler} action="Sign Up" />
      <div className="centered">
        Already have an account? Please <a href="/login">login</a>.
      </div>
    </>
  );
};

export default SignUp;
