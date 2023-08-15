"use client";

import { useContext, createContext, useEffect, useState } from "react";
import {
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/app/auth/firebase";
import React from "react";

interface AuthContextType {
  user: any | null;
  googleSignIn: () => void;
  logOut: () => void;
}



interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

 
  const logOut = () => {
    signOut(auth);
  };
  
  const contextValue: AuthContextType = {
    user,
    googleSignIn,
    logOut
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubcribe();
  }, [user]);

  return (
    <AuthContext.Provider value={contextValue} >{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context =  useContext(AuthContext);
  if (context === null) {
    throw new Error("must be used within the provider");
  }
  return context;
}