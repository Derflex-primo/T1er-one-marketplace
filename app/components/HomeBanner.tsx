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
      })} ${date.getDate()}, ${date.getFullYear()}, ${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}`;
      setCurrentDate(formattedDate);
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative  my-4 bg-gradient-to-r from-rose-700 to-stone-900 rounded-2xl">
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
      <div className="flex flex-row justify-between mb-3  items-center border border-stone-300 rounded-r-lg ">
        <div className="flex flex-row space-x-4 items-center">
          <div className="flex flex-row items-center relative   bg-gradient-to-r bg-rose-600">
            <span className="p-2 text-lg text-white rounded-sm font-semibold relative z-10">
              Today&apos;s Hot Deals <span className="pl-2 text-xs text-stone-900 font-mono">{currentDate}</span>
            </span>
            <div className="-mr-2 w-4 h-full absolute right-0 top-0 bg-rose-600 transform -skew-x-12"></div>
          </div>
        </div>
        <div className="flex flex-row ">
          <span className="p-[10px] text-xs  unded-sm font-semibold  ">
            Why pay more? Unlock superior savings and exclusive deals with our
            memberships!
            <span className="ml-2 text-[11px] p-2 rounded-lg bg-stone-900 text-white cursor-pointer hover:bg-stone-700">
              Join Now
            </span>
          </span>
        </div>
        <div className="text-xs p-2  ">
          Have a question? Call us now 09477926745 or 8700-200
        </div>
        <div className="mr-2 cursor-pointer">
          <AiOutlineInfoCircle size={20} />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
