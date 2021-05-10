import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute path="/" exact>
          <Redirect to="/mainpage" />
        </PrivateRoute>
        <PrivateRoute path="/mainpage">
          <MainPage />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
