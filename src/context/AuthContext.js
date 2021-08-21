import React, { createContext, useCallback, useContext, useState } from "react";
import { fetchNotToken, fetchToken } from "../helpers/fetch";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const res = await fetchNotToken("login", { email, password }, "POST");

    if (res.ok) {
      localStorage.setItem("token", res.token);
      setAuth({
        uid: res.user.uid,
        checking: false,
        logged: true,
        name: res.user.name,
        email: res.user.email,
      });

      dispatch({
        type: types.resetState,
      });

      localStorage.removeItem("activeChat");
    }

    return res.ok;
  };

  const register = async (name, email, password) => {
    const res = await fetchNotToken(
      "login/new",
      { name, email, password },
      "POST"
    );

    if (res.ok) {
      localStorage.setItem("token", res.token);
      setAuth({
        uid: res.user.uid,
        checking: false,
        logged: true,
        name: res.user.name,
        email: res.user.email,
      });

      dispatch({
        type: types.resetState,
      });

      localStorage.removeItem("activeChat");
    }

    return res.ok;
  };

  //esta funcion se dispara en un useEffect, por lo tanto para evitar que se ejcute cada
  //que se renderice el componente, se usa useCallback que memoriza y
  //solo se ejecuta cuando cambia una de las dependencias
  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const res = await fetchToken("login/renew");

    if (res.ok) {
      localStorage.setItem("token", res.token);
      setAuth({
        uid: res.user.uid,
        checking: false,
        logged: true,
        name: res.user.name,
        email: res.user.email,
      });
      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeChat");

    dispatch({
      type: types.resetState,
    });

    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{ login, register, verifyToken, logout, auth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
