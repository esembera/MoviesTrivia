import { auth } from "../../../firebase";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const [currentUser, setCurrentUser] = useState();
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function logIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  return (
    <AuthContext.Provider value={{ currentUser, signUp, logIn }}>
      {children}
    </AuthContext.Provider>
  );
}
