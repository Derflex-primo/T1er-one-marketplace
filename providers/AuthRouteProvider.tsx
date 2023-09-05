"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { config } from "@/lib/db/firebaseUtils";




const app = initializeApp(config.firebaseConfig);


export interface AuthRouteProps {
    children: React.ReactNode
};


const AuthRouteProvider: React.FC<AuthRouteProps> = props => {
    const { children } = props;
    const auth = getAuth(app);
    const [loading, setloading] = useState(false);

    useEffect(() => {
      AuthCheck();
      return () => AuthCheck();
    },[auth]);

    const AuthCheck =  onAuthStateChanged(auth, (user) => {
      if(user){
        setloading(false);
      }else {
        console.log("Add your wallet to proceed checkout");
      }
    });
    if(loading) return <p>Loading...</p>
    
    return <>{children}</>
}

export default AuthRouteProvider;
