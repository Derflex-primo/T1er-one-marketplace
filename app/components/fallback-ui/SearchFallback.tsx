import React from 'react';
import Image from "next/image";

const SearchFallback = () => {
    return (
        <div className="relative h-screen p-24">
          <div className="relative w-full h-full">
            <Image
              src={`/images/searchFallback.svg`}
              alt="Search fallback"
              fill
              className="object-contain"
              quality={100}
              sizes="auto"
            />
          </div>
        </div>
      );
    };
export default SearchFallback