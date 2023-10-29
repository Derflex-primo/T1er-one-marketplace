import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const HomeBanner = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const formattedDate = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getDate()}, ${date.getFullYear()}`;
      setCurrentDate(formattedDate);
    };

    updateDateTime();

}, []);


  return (
    <div>
      <div className="relative  my-2 bg-gradient-to-r from-rose-700 to-stone-900 rounded-2xl">
        <div className="flex mx-auto px-8 py-12 gap-2 mb:flex-row items-center justify-evenly">
          <div className="flex flex-col mb-8 md:mb-0 text-center">
            <h1 className="mb-4 text-4xl md:text-6xl font-bold text-white">
              Bermonths Sale!
            </h1>
            <p className="mb-2 text-lg  md:xl text-white ">
              Enjoy discounts on selected items
            </p>
            <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
              GET 30% OFF
            </p>
          </div>
          <div className="w-1/3 relative aspect-video hidden sm:block">
            <Image
              src="/images/banner-image.png"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Banner Image"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mb-3  items-center bg-stone-100 rounded-lg ">
        <div className="flex flex-row space-x-4 items-center ml-3 text-xs  ">
         Tier One&apos;s Hot Deals <span className="pl-2 text-xs text-stone-900 ">{currentDate}</span>  
        </div>
        <div className="flex flex-row ">
          <span className="p-[10px] text-xs  unded-sm   ">
            Why pay more? Unlock superior savings and exclusive deals with our
            memberships!
            <span className="ml-2 text-[11px] p-2 rounded-lg hover:bg-stone-200 cursor-pointer font-semibold">
              Join Now
            </span>
          </span>
        </div>
        <div className="text-xs p-2  ">
          Have a question? Call us now 09477926745 or 8700-200
        </div>
        <div className="mr-3 cursor-pointer">
          <AiOutlineInfoCircle size={20} />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
