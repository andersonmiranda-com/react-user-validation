import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "./store/auth-context";

function PrivateRoute(props) {
  const ctx = useContext(AuthContext);

  if (!ctx.isLoggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
}

export default PrivateRoute;
