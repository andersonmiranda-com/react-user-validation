import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { AuthContextProvider } from "../../store/auth-context";

import EmailForm from "./EmailForm";

const setup = () => {
  const submitHandler = jest.fn();
  const formElement = render(
    <AuthContextProvider value={{ errors: "" }}>
      <EmailForm onSubmit={submitHandler} action="Login" />
    </AuthContextProvider>
  );
  const emailInput = formElement.getByLabelText("E-mail");
  const passwordInput = formElement.getByLabelText("Password");
  const submitButton = formElement.getByText("Login");
  return {
    emailInput,
    passwordInput,
    submitButton,
    submitHandler,
    ...formElement,
  };
};

describe("Form validation", () => {
  test("Test Email validation", () => {
    const { emailInput, submitButton, submitHandler } = setup();
    fireEvent.change(emailInput, { target: { value: "testeteste.com" } });
    fireEvent.click(submitButton);
    const errorElement = screen.getByText("Invalid email");
    expect(errorElement).toBeInTheDocument();
    expect(submitHandler).not.toHaveBeenCalled();
  });

  test("Test Password validation", () => {
    const { passwordInput, submitButton, submitHandler } = setup();
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(submitButton);
    const errorElement = screen.getByText(
      "Password must contain at least 6 characters"
    );
    expect(errorElement).toBeInTheDocument();
    expect(submitHandler).not.toHaveBeenCalled();
  });

  test("Test valid for submission", () => {
    const { emailInput, passwordInput, submitButton, submitHandler } = setup();
    fireEvent.change(emailInput, { target: { value: "teste@teste.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(submitButton);
    expect(submitHandler).toHaveBeenCalled();
  });
});
