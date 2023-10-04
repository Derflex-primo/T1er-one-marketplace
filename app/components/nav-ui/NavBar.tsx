"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Michroma } from "next/font/google";
import Container from "../Container";
import LogInPage from "@/app/auth/Login";
import Drop from "../dropTrade-ui/Drop";
import Trade from "../dropTrade-ui/Trade";
import { SlMenu } from "react-icons/sl";
import { AiOutlinePushpin } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  function throttle(
    func: (...args: any[]) => void,
    wait: number
  ): (...args: any[]) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (...args: any[]) {
      if (!timeout) {
        timeout = setTimeout(() => {
          func(...args);
          timeout = null;
        }, wait);
      }
    };
  }

  useEffect(() => {
    const handleScroll = throttle(() => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    }, 100); // throttle to run once every 100ms

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div
      className={`
        sticky
        top-0
        w-full
        z-30
        shadow-sm
        bg-[#f5f7f7]-200
        ${
          scrolled
            ? "bg-gradient-to-r from-rose-700 to-stone-900 text-white"
            : ""
        }
        transition-colors duration-75
      `}
    >
      <div className={`py-4 ${scrolled ? "" : "border-b-[1px]"}`}>
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
            <div className="flex items-center md:hidden">
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
                className={`${michroma.className} text-lg font-semibold`}
              >
                T1er One
              </Link>
              <hr className="inline border-[1.4px] h-8" />
              <div className="flex gap-12 text-base font-semibold">
                <Drop />
                <Trade />
              </div>
            </div>
            <div className="flex flex-grow relative ml-10 mx-4 md:block">
              <IoSearch className="absolute left-3 text-black top-1/2 transform -translate-y-1/2" />
              
              <div className="cursor-pointer shadow-xs text-stone-900 absolute p-2 rounded-lg bg-stone-200 right-3 top-1/2 transform -translate-y-1/2">
              <BsThreeDotsVertical size={14} />
              </div>
              <label htmlFor="searchProducts" className="sr-only">
                Search Products
              </label>
              <input
                id="searchProducts"
                className="text-black w-full pl-10 py-3 border rounded-xl md:block placeholder-stone-800  focus:outline-none focus:ring-[0.6px] focus:ring-stone-900"  
                type="text"
                placeholder="Search for products, Shops, Accounts"
              />
            </div>

            <LogInPage />
          </div>
        </Container>
      </div>
      {!scrolled && (
        <Container>
          <div className="flex flex-row  py-2 justify-between">
            <div className="flex flex-row gap-8  ">
              <span className="flex flex-row  items-center space-x-2">
                <SlMenu size={18} />
                <span className="text-sm font-semibold">Browse</span>
              </span>
              <Link href={""} className="text-sm font-semibold">
                Monthly Deals
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Gift cards
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Top rated
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Shops
              </Link>
              <Link href={""} className="text-sm font-semibold">
                New Arrivals
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Pre orders
              </Link>
            </div>
            <div className="flex flex-row gap-8">
              <Link
                href={""}
                className="flex flex-row items-center space-x-1 text-sm font-semibold"
              >
                <AiOutlinePushpin size={18} />
                <span>Pinned</span>
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Support
              </Link>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default NavBar;
