"use client"
import Link from "next/link";
import Image from "next/image";
import { Michroma } from "next/font/google";
import Container from "../Container";
import PiShoppingBagOpenThin from "./CartCount";

const michroma = Michroma({subsets: ["latin"], weight: ["400"]})

const NavBar = () => {
  const userLogo = "/images/noface.png"  
  const cartLogo = "/icons/cart.svg"
  return (
    <div className="
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
        <div className="
        flex
        items-center
        justify-between
        gap-3
        md:gap-0
        ">
            <Link href="/" className={`${michroma.className} text-lg font-semibold`}>T1er One</Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
                <PiShoppingBagOpenThin />
                <Image
                 src={userLogo}
                 width={30}
                 height={30}
                 className="bg-white border-[1px] rounded-full"
                 alt="User menu" />
            </div>
        </div>
      </Container>
    </div>
    NavBar</div>
  )
}

export  default NavBar;