import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import AuthContext from "../../store/auth-context";
import { BrowserRouter } from "react-router-dom";

import MainNavigation from "./MainNavigation";

const setup = (contextValue) => {
  const renderedElement = render(
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <MainNavigation />
      </BrowserRouter>
    </AuthContext.Provider>
  );
  return renderedElement;
};

describe("Navigation Bar", () => {
  test("Shows not loggedin links", async () => {
    setup({ isLoggedIn: false });
    let element = screen.queryByText("Login");
    expect(element).toBeInTheDocument();
    element = screen.queryByText("Main Page");
    expect(element).not.toBeInTheDocument();
  });

  test("Shows loggedin links", () => {
    setup({ isLoggedIn: true });
    let element = screen.queryByText("Main Page");
    expect(element).toBeInTheDocument();
    element = screen.queryByText("Login");
    expect(element).not.toBeInTheDocument();
  });

  test("Calls context logout when Logout link is clicked", () => {
    const logoutMock = jest.fn();
    setup({ isLoggedIn: true, onLogout: logoutMock });
    let logoutElement = screen.getByText("Log Out");
    fireEvent.click(logoutElement);
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
