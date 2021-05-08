import React from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

export const Userprotect = ({ children }) => {
  const history = useHistory();
  const [user] = useContext(UserContext);
  if (user) {
    return <h1>{children}</h1>;
  }
  history.push("/");// Ua pass cua no la 123 ma sao go 123456 van vo dc
  return null;
};


