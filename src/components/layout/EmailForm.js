import React, { useContext, useState, useEffect } from "react";

import AuthContext from "../../store/auth-context";

import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./EmailForm.module.css";

const EmailForm = (props) => {
  const ctx = useContext(AuthContext);

  const [formData, setFormData] = useState({
    emailInput: "",
    passwordInput: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    //cleanup auth status before try new login/signup
    ctx.onLogout();
  }, []);

  const inputChangeHandler = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });

    //remove form error for this field
    const errors = formErrors.filter((e) => e !== event.target.id);
    setFormErrors(errors);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const { emailInput, passwordInput } = formData;
    const errors = [];
    if (!emailInput.includes("@")) errors.push("emailInput");
    if (passwordInput.length < 6) errors.push("passwordInput");
    setFormErrors(errors);

    if (errors.length === 0) {
      props.onSubmit(emailInput, passwordInput);
    }
  };

  const formHasError = (key) => {
    return formErrors.indexOf(key) !== -1;
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          text="email"
          label="E-mail"
          id="emailInput"
          value={formData.emailInput}
          onChange={inputChangeHandler}
          isValid={!formHasError("emailInput")}
          errorMessage="Invalid email"
        />
        <Input
          type="password"
          label="Password"
          id="passwordInput"
          value={formData.password}
          onChange={inputChangeHandler}
          onBlur={inputChangeHandler}
          isValid={!formHasError("passwordInput")}
          errorMessage="Password must contain at least 6 characters"
        />

        {ctx.errors.length > 0 && (
          <div className={classes.error}>{ctx.errors}</div>
        )}

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            {props.action}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EmailForm;
