"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
const AuthLoading = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      const animationKeyframes = [
        { transform: 'scale(0.5)' },
        { transform: 'scale(1)' }
      ];

      const animationOptions: KeyframeAnimationOptions = {
        duration: 2500, // Duration in milliseconds
        fill: 'forwards', // Ensures the final state is maintained after animation
        easing: 'ease-in-out'
      };

      imageRef.current.animate(animationKeyframes, animationOptions);
    }
  }, []);

  return (
    <div className="relative h-screen p-96 bg-black">
      <div className="relative w-full h-full">
      <div ref={imageRef} style={{ transform: 'scale(0.5)' }} className="w-full h-full">
        <Image
          src={`/images/tierOneLogoWhite.svg`}
          alt="Loading fallback"
          fill
          className="object-contain " 
          quality={100}
          sizes="auto"
        />
      </div>
      </div>
      <div className="absolute bottom-4 right-4 text-white font-semibold text-xs ">
        CEO. Deogracias Daryl 
      </div>
    </div>
  );
};

export default AuthLoading;
