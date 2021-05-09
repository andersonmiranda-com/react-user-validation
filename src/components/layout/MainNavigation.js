import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  let history = useHistory();

  const onLogoutHandler = () => {
    ctx.onLogout();
    history.push("/signin");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Star Wars API</div>
      <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <NavLink to="/" activeClassName={classes.active}>
                Main Page
              </NavLink>
            </li>
          )}

          {!ctx.isLoggedIn && (
            <li>
              <NavLink to="/signin" activeClassName={classes.active}>
                Sign In
              </NavLink>
            </li>
          )}
          {!ctx.isLoggedIn && (
            <li>
              <NavLink to="/signup" activeClassName={classes.active}>
                Sign Up
              </NavLink>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="#" onClick={onLogoutHandler}>
                Log Out
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
