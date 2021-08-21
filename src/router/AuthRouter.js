import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

import "../css/login-register.css";

export const AuthRouter = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Switch>
            <Route path="/auth/login" component={LoginPage} exact />
            <Route path="/auth/register" component={RegisterPage} exact />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </div>
    </div>
  );
};
