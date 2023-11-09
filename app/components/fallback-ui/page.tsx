import React from "react";
import Image from "next/image";

const UnderMaintenance = () => {
  return (
    <div className="relative h-screen">
      <div className="relative w-full h-full">
        <Image
          src={`/images/underMaintenance.svg`}
          alt="Under maintenance"
          fill
          className="object-contain"
        />
        <div className="absolute top-[175px] left-[200px]">
          Temporarily refining features 
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
