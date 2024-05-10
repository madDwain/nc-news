import React, { createContext, useContext } from "react";
import { useState } from "react";

const LoginContext = createContext();

export function useLogin() {
    return useContext(LoginContext)
}

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const value = { user, setUser }

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};
