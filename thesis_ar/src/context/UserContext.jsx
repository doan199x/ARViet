import React from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { productAPI } from "../config/productAPI";
import { useState } from 'react';
import Signin from "../pages/Sign in/Signin";
export const UserContext = React.createContext(null);


const jwtDecode = (token) => jwt.decode(token);

export const UserProvider = (props) => {
  const { children } = props;
  // const token = localStorage.getItem("token") || "";
  const history = useHistory();
  let user = null;
  const [token,setToken] = useState(localStorage.getItem("token") || "");
  const [result,setResult] = useState(true);
  useEffect(() => {
    if (token !== "")
      {
        const checkToken = async () => {
          await productAPI.checkToken().then(data => {
            setResult(data.data)
          });
        };
        checkToken();
      }
  }, [token]);

  if (token && result) {
    user = jwtDecode(token);
  } 
  return <UserContext.Provider value={[user,setToken]}>{children}</UserContext.Provider>;
};
