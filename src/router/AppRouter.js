import React, { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return <h1>Espere por favor...</h1>;
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={auth.logged}
            path="/"
            exact
            component={ChatPage}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
