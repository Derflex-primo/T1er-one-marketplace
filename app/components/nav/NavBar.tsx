"use client";
import Link from "next/link";
import Image from "next/image";
import { Michroma } from "next/font/google";
import Container from "../Container";
import PiShoppingBagOpenThin from "./CartCount";
import { UserAuth } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import SkeletonLoading from "../SkeletonLoading";


const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const handleSignIn = async () => {
    try {
      googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = async () => {
    try {
      setLoading(true);  
      await logOut();   
      setLoading(false);  
    } catch (error) {
      console.log("Sign out error:", error);
      setLoading(false);  
    }
  };

  useEffect(() =>{
   const isAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
   }
   isAuth();
  },[user]);


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
            <div className="flex items-center gap-8 md:gap-12">
              <PiShoppingBagOpenThin />

              {loading ? 
              <SkeletonLoading width="132px" height="34px" />
              : !user ? (
                <>
                  <h1 onClick={handleSignIn} className="cursor-pointer">Sign In</h1>
                  <h1 className="cursor-pointer">Sign Up</h1>
                </>
              ) : (
                <>
                   <h1 onClick={handleSignOut} className="cursor-pointer">Log Out</h1>
                  <Image
                    src={user.photoURL}
                    width={30}
                    height={30}
                    className="bg-white border-[1px] rounded-full"
                    alt="User menu"
                  />
                </>
              )}

              <div></div>
            </div>
          </div>
        </Container>
      </div>
      NavBar
    </div>
  );
};

export default NavBar;
