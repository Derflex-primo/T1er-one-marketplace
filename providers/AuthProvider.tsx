"use client";

import { useContext, createContext, useEffect, useState } from "react";

interface AuthContextProviderProps {
    children: React.ReactNode;
}

 
const AuthContext = createContext(null);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
 
    return (
        <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    );
};
