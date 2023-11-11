"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { config, db } from "@/lib/db/firebaseUtils";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import AuthLoading from "@/app/components/AuthLoading";

const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  fetchUserProfilePhoto: (uid: string) => Promise<string | null>;  
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthRouteProvider");
  }
  return context;
};

export const AuthRouteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!isLoggingOut) {
        // Check if not in the middle of a logout operation
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isLoggingOut]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error && typeof error.message === "string") {
        alert(error.message);
      } else {
        alert("An error occurred.");
      }
    }
  };


  const fetchUserProfilePhoto = async (uid: string) => {
    if (!uid) return null;
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data().photo : null;
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true); // Set logging out flag
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setTimeout(() => {
        setLoading(false);
        setIsLoggingOut(false); // Reset logging out flag after delay
      }, 2500);
    } catch (error) {
      console.log("Sign out error:", error);
      setLoading(false);
      setIsLoggingOut(false); // Reset logging out flag if there's an error
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    handleSignOut,
    fetchUserProfilePhoto
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children :  <AuthLoading />}
    </AuthContext.Provider>
  );
};
