"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack, MdOutlineRemoveShoppingCart } from "react-icons/md";
import Button from "../components/products-ui/Button";
import ItemContent from "./ItemContent";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { config, db } from "@/lib/db/firebaseUtils";
import { formatUSDWithComma } from "@/lib/utils/formats";
import LogisticContent from "./LogisticContent";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";

const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
  });
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserInfo = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserInfo({
            name: userData.name || "Name not set",
            address: userData.address || "Address not set",
          });
        }
      };

      fetchUserInfo();
    }
  }, [user]);

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Connect your wallet"); // TEMPORARYY
    } else {
      console.log("Proceeding - loading checkout");
    }
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center min-h-screen">
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
    <div className="flex flex-row justify-evenly min-h-screen space-x-6">
      <div className="flex flex-col w-[50%] gap-x-4  ">
        <div className="border-[0.8px] shadow-sm p-4 rounded-xl mb-4">
          <div className="grid grid-cols-5 text-xs gap-4  items-center pt-2 ">
            <div className="col-span-2 justify-self-start  font-semibold">
              PRODUCT
            </div>
            <div className="justify-self-center font-semibold">PRICE</div>
            <div className="justify-self-center font-semibold">QUANTITY</div>
            <div className="justify-self-end  font-semibold">TOTAL</div>
          </div>
          <div>
            <div>
              {cartProducts &&
                cartProducts.map((item) => {
                  return <ItemContent key={item.id} item={item} />;
                })}
            </div>
          </div>
        </div>
        <Button label="Clear all" onClick={handleClearCart} />
      </div>
      <div className="flex flex-col w-[50%] gap-4 ">
        <div className="flex flex-col border-[0.8px] shadow-sm p-4 rounded-xl ">
          <div className="flex  justify-between ">
            <div className="flex-shrink-0 font-semibold text-xs items-center pt-2">
              SHIPPING DETAILS
            </div>
            <div className="flex-shrink-0">
              <LogisticContent />
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-4 items-center mt-4">
              <div className="font-semibold text-sm">RECEIVER</div>
              <div>{userInfo.name || "Name not set"}</div>
            </div>
            <div className="flex flex-row gap-4 items-center mt-4">
              <div className="font-semibold text-sm">ADDRESS</div>
              <div>{userInfo.address || "Address not set"}</div>
            </div>
            <div className="flex flex-row gap-3 items-center mt-4">
              <span className="font-semibold text-sm">SUBTOTAL</span>
              <span>{formatUSDWithComma(cartTotalAmount)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col  gap-1 items-start text-sm">
          <Button label="Check out" onClick={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

export default CartClient;

// CREATE DATA BASE
