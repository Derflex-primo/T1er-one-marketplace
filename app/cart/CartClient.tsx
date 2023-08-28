"use client";
import React, { useState } from 'react';
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack, MdOutlineRemoveShoppingCart } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/products/Button";
import ItemContent from "./ItemContent";
import { formatUSDWithComma } from "@/utils/formatter";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { config } from "@/config/config";
import { Toaster } from 'react-hot-toast';

const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const currentUser = auth.currentUser;



  const handleCheckout = () => {
    if (!currentUser) {
      alert("Connect your wallet") // TEMPORARYY
    } else {
      console.log("Proceeding - loading checkout");
    }
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center text-2xl gap-2">
          Your cart is empty{" "}
          <MdOutlineRemoveShoppingCart className="text-rose-500" size={28} />
        </div>
        <div>
          <Link
            href={"/"}
            className="flex  items-center gap-1 mt-2 text-stone-500"
          >
            <MdArrowBack />
            <span>Browse some products</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Checkout Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item}/>;
          })}
      </div>
      <div className="flex justify-between gap-4 border-t-[1.5px] border-slate-200 py-4 ">
        <div className="w-[90px]">
          <Button label="Clear Cart" small outline={true} onClick={() => { handleClearCart()}} />
        </div>
        <div className="flex flex-col  gap-1 items-start text-sm">
          <div className="flex justify-between w-full text-base">
            <span className="font-semibold">Subtotal</span>
            <span>{formatUSDWithComma(cartTotalAmount)}</span>
          </div>
          <p className="text-stone-500 mb-2">
            Taxes & shipping calculated at checkout.
          </p>
          <Button label="Check out" onClick={handleCheckout} />
          <Link
            href={"/"}
            className="flex  items-center gap-1 mt-2 text-stone-500"
          >
            <MdArrowBack />
            <span>Continue shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;


// CREATE DATA BASE

