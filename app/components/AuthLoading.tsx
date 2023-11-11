"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
const AuthLoading = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add("scale-y-100" , "scale-x-100");  
    }
  }, []);

  return (
    <div className="relative h-screen p-96 bg-black">
      <div className="relative w-full h-full" ref={ref}>
        <Image
          src={`/images/tierOneLogoWhite.svg`}
          alt="Loading fallback"
          fill
          className="object-contain transition duration-3000 transform scale-y-50 scale-x-50 animate-ping" 
          quality={100}
          sizes="auto"
        />
      </div>
    </div>
  );
};

export default AuthLoading;
