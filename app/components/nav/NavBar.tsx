"use client";
import React from "react";
import Link from "next/link";
import { Michroma } from "next/font/google";
import Container from "../Container";
import LogInPage from "@/app/auth/Login";

const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  return (
    <div
      className="
    sticky
    top-0
    w-full
    z-30
    shadow-sm
    bg-[#f5f7f7]-200
    "
    >
      <div className="py-4 border-[1px]">
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
            <Link
              href="/"
              className={`${michroma.className} text-lg font-semibold`}
            >
              T1er One
            </Link>
            <div className="hidden md:block">Search</div>

            <LogInPage />
          </div>
        </Container>
      </div>
      NavBar
    </div>
  );
};

export default NavBar;
