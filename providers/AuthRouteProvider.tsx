"use client";
import React from "react";
import { AuthRouteProvider } from "@/hooks/useAuth"; // Update this import path if needed

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <AuthRouteProvider>
      {children}
    </AuthRouteProvider>
  );
}

export default AuthProvider;
