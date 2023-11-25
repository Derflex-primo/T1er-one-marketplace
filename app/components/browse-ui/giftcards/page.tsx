"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

const GiftCards = () => {
  const { signInWithGoogle, user } = useAuth();
  return (
    <div className="h-full md:h-screen w-full px-10 pt-6 flex flex-col-reverse justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[50%] w-full">
        <div className="flex flex-col h-full w-full col-span-1 overflow-hidden border rounded-2xl">
          <span className="h-[5%] border-b bg-rose-500"></span>
          <div className="flex flex-col w-full gap-4 p-4 h-[35%]  border-b">
            <div className="flex justify-center text-lg font-bold">
              T1ER THREE
            </div>
            <div className="flex justify-center items-end space-x-2">
              <div className="flex text-[30px] font-extrabold">$13</div>
              <div className="flex ">month</div>
            </div>
          </div>
          <div className="flex flex-col w-full h-[40%] gap-3 p-3 text-sm font-semibold border-b">
            <div className="flex justify-center ">Extended Warranty</div>
            <div className="flex justify-center ">2yrs Accidental damage</div>
            <div className="flex justify-center ">30% Discount on Repairs</div>
            <div className="flex justify-center ">Theft Protection</div>
          </div>
          <div className="flex justify-center w-full  p-4 px-16 h-[20%]">
            <button
              onClick={() =>
                user ? alert("Features not implemented") : signInWithGoogle()
              }
              className="font-bold bg-gradient-to-r from-rose-600 to-rose-400 text-white hover:to-rose-600 transition ease-in-out duration-300  border w-full rounded-full h-[%16] "
            >
              Buy now
            </button>
          </div>
        </div>
        <div className="flex flex-col h-full w-full col-span-1 overflow-hidden border rounded-2xl">
          <span className="h-[5%] border-b bg-rose-500"></span>
          <div className="flex flex-col w-full gap-4 p-4 h-[35%]  border-b">
            <div className="flex justify-center text-lg font-bold">
              T1ER TWO
            </div>
            <div className="flex justify-center items-end space-x-2">
              <div className="flex text-[30px] font-extrabold">$36</div>
              <div className="flex ">month</div>
            </div>
          </div>
          <div className="flex flex-col w-full h-[40%] gap-3 p-3 text-sm font-semibold border-b">
            <div className="flex justify-center ">Extended Warranty</div>
            <div className="flex justify-center ">5yrs Accidental damage</div>
            <div className="flex justify-center ">50% 0Discount on Repairs</div>
            <div className="flex justify-center ">Theft Protection</div>
          </div>
          <div className="flex justify-center w-full  p-4 px-16 h-[20%]">
            <button
              onClick={() =>
                user ? alert("Features not implemented") : signInWithGoogle()
              }
              className="font-bold bg-gradient-to-r from-rose-600 to-rose-400 text-white hover:to-rose-600 transition ease-in-out duration-300  border w-full rounded-full h-[%16] "
            >
              Buy now
            </button>
          </div>
        </div>
        <div className="flex flex-col h-full w-full col-span-1 overflow-hidden border rounded-2xl">
          <span className="h-[5%] border-b bg-rose-500"></span>
          <div className="flex flex-col w-full gap-4 p-4 h-[35%]  border-b">
            <div className="flex justify-center text-lg font-bold">
              T1ER ONE
            </div>
            <div className="flex justify-center items-end space-x-2">
              <div className="flex text-[30px] font-extrabold">$56</div>
              <div className="flex ">month</div>
            </div>
          </div>
          <div className="flex flex-col w-full h-[40%] gap-3 p-3 text-sm font-semibold border-b">
            <div className="flex justify-center ">Extended Warranty</div>
            <div className="flex justify-center ">10yrs Accidental damage</div>
            <div className="flex justify-center ">Unlimited Repairs</div>
            <div className="flex justify-center ">Theft Protection</div>
          </div>
          <div className="flex justify-center w-full  p-4 px-16 h-[20%]">
            <button
              onClick={() =>
                user ? alert("Features not implemented") : signInWithGoogle()
              }
              className="font-bold bg-gradient-to-r from-rose-600 to-rose-400 text-white hover:to-rose-600 transition ease-in-out duration-300  border w-full rounded-full h-[%16] "
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="h-[500px] p-4  border-[0.8px] rounded-2xl mb-6 w-full flex sm:flex-row flex-col justify-center sm:justify-normal">
        <div className="w-full sm:w-[50%] relative h-full">
          <Image
            src="/images/giftcards.svg"
            alt="giftcard image"
            fill
            className="object-contain"
            sizes="auto"
          />
        </div>
        <div className="flex justify-center w-full sm:w-[50%] h-full items-center">
          <div className="flex flex-col justify-center  ">
            <h1 className="text-xl sm:text-xl md:text-[30px] font-semibold ">
              Wanna get some discount?
            </h1>
            <div className="relative  flex flex-col justify-center p-4">
              <input
                type="email"
                placeholder="@"
                className="border-2 rounded-full  focus:outline focuse:outline-offset-1 outline-rose-500 p-4"
              />
              <button className="absolute right-6 hover:bg-rose-600 font-semibold px-4 bg-rose-500 text-white p-2 rounded-full text-xl">
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
