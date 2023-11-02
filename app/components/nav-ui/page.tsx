"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Michroma } from "next/font/google";
import Container from "../Container";
import LogInPage from "@/app/auth/Login";
import Drop from "../dropTrade-ui/Drop";
import Trade from "../dropTrade-ui/Trade";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Pinned from "./Pinned";
import Image from "next/image";
import SortBrowse from "../browse-ui/SortBrowse";

const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  const changedBackground = () => {
    if (window.scrollY >= 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changedBackground);

    return () => {
      window.removeEventListener("scroll", changedBackground);
    };
  }, []);

  return (
    <div
      className={`
    sticky 
    top-0 
    w-full 
    z-40 
    shadow-sm 
    ${scrolled ? "bg-gradient-to-r  bg-rose-700 text-white" : ""}
    transition-colors duration-300
    overflow-visible
  `}
    >
      <div className={`py-4 ${scrolled ? "" : " "}`}>
        <Container>
          <div
            className="
        flex
        items-center
        justify-between
        gap-3
        md:gap-0
        "
          >
            <div className="flex items-center md:hidden overflow-hidden">
              <Link
                href="/"
                className={`${michroma.className} text-lg font-semibold`}
              >
                T1
              </Link>
            </div>
            <div className="hidden md:flex w-80  justify-between items-center">
              <Link
                href="/"
                className={`cursor-pointer   
                
            `}
              >
                {scrolled ? (
                  <Image
                    src="/images/tierOneLogoWhite.svg"
                    alt="Tier One logo"
                    width={115}
                    height={115}
                  />
                ) : (
                  <Image
                    src="/images/tierOneLogo.svg"
                    alt="Tier One logo"
                    width={115}
                    height={115}
                  />
                )}
              </Link>
              <hr className="inline border-[0.8px] h-8 " />
              <div className="flex items-center gap-4 text-base cursor-pointer font-semibold">
                <Drop />
                <Trade />
              </div>
            </div>
            <div className="flex flex-grow relative ml-10 mx-4 md:block ">
              <IoSearch
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  scrolled ? "text-white" : "text-black"
                }`}
              />

              <div
                className={`cursor-pointer shadow-xs text-stone-900 absolute p-2 rounded-lg bg-stone-300 right-3 top-1/2 transform -translate-y-1/2 ${
                  scrolled
                    ? " backdrop-blur-md bg-white bg-opacity-20 text-white "
                    : ""
                }
              `}
              >
                <BsThreeDotsVertical size={14} />
              </div>
              <label htmlFor="searchProducts" className="sr-only">
                Search Products
              </label>
              <input
                id="searchProducts"
                className={`
                w-full pl-10 py-3 bg-stone-100 rounded-xl md:block focus:outline-none focus:ring-[0.6px] 
                 ${
                   scrolled
                     ? "text-white   backdrop-blur-md bg-white bg-opacity-20 focus:ring-white hover:bg-stone-900 hover:backdrop-blur-md hover:bg-opacity-20  trasition ease-in-out duration-150"
                     : "text-black placeholder-stone-800 focus:ring-stone-900 hover:bg-stone-200 bg-stone-100 trasition ease-in-out duration-150 "
                 }
                `}
                type="text"
                placeholder="Search for products, Shops, Accounts"
              />
            </div>

            <LogInPage />
          </div>
        </Container>
      </div>
      {!scrolled && (
        <div className="px-8 shadow-t-lg shadow-rose-600">
          <div className="flex flex-row  py-2 justify-between">
            <div className="flex flex-row gap-4   ">
              <SortBrowse />
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl  hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Monthly Deals
              </Link>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl  hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Gift cards
              </Link>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Top rated
              </Link>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
              >
                New Arrivals
              </Link>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Pre orders
              </Link>
            </div>
            <div className="flex flex-row gap-2">
              <div className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150">
                <Pinned />
              </div>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
