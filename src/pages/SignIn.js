import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";

import EmailForm from "../components/layout/EmailForm";

const SignIn = (props) => {
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (email, password) => {
    ctx.onLogin(email, password);
    console.log("submit");
    history.push("/");
  };

  return (
    <>
      <h2>Sign In</h2>
      <EmailForm onSubmit={submitHandler} />
    </>
  );
};

export default SignIn;
