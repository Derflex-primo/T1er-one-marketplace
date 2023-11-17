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
import { formatUSDWithComma, logisticsPartnersPH } from "@/lib/utils/formats";
import LogisticContent from "./LogisticContent";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";

const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const { user, signInWithGoogle } = useAuth();
  const [selectedLogisticsPartner, setSelectedLogisticsPartner] = useState(
    logisticsPartnersPH[0]
  );
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
      signInWithGoogle()
        .then(() => {})
        .catch((error) => {
          console.error("Sign in failed", error);
        });
    } else {
      // Handle the checkout for logged-in users
      alert(
        `Your country does not support STRIPE payment gateway. Call the administrator of this account.`
      );
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

  const handleLogisticsChange = (selectedOption: any) => {
    setSelectedLogisticsPartner(selectedOption);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen md:space-x-6">
      <div className="flex flex-col w-full md:w-[50%] gap-x-4  ">
        <div className="border-[0.8px]  shadow-sm p-4 rounded-xl mb-4">
          <div className="grid  grid-cols-4 sm:grid-cols-5 text-xs gap-4  text-rose-600 items-center pt-2 ">
            <div className="sm:col-span-2 justify-self-start  font-semibold">
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
        <div className="hidden md:flex">
          <Button label="Clear all" onClick={handleClearCart} />
        </div>
      </div>
      <div className="flex flex-col  w-full md:w-[50%] gap-4 text-xs md:text-base">
        <div className="flex flex-col border-[0.8px]  shadow-sm p-4 rounded-xl ">
          <div className="flex  justify-between ">
            <div className="flex-shrink-0 text-rose-600 font-semibold text-xs items-center pt-2">
              SHIPPING DETAILS
            </div>
            <div className="flex-shrink-0">
              <LogisticContent
                selectedLogisticsPartner={selectedLogisticsPartner}
                handleLogisticsChange={handleLogisticsChange}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-4 items-center mt-4">
              <div className="font-semibold text-xs md:text-sm">RECEIVER</div>
              <div>{userInfo.name || "Name not set"}</div>
            </div>
            <div className="flex flex-row gap-4  mt-4">
              <div className="font-semibold text-xs md:text-sm">ADDRESS</div>
              <div>
                {userInfo.address || "Please set your address in user profile"}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center mt-4">
              <div className="font-semibold text-xs md:text-sm">COURIER</div>
              <div>{selectedLogisticsPartner.label || "Address not set"}</div>
            </div>
            <div className="flex flex-row gap-4 items-center mt-4">
              <div className="font-semibold text-xs md:text-sm">SHIPPING METHOD</div>
              <div>
                {selectedLogisticsPartner.shippingMethod || "Address not set"}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center mt-4">
              <div className="font-semibold text-xs md:text-sm">
                ESTIMATED DELIVERY DATE
              </div>
              <div>
                {selectedLogisticsPartner.estimatedDelivery ||
                  "1 - 4 bussiness days"}
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center mt-4">
              <div className="font-semibold text-xs md:text-sm">
                ADDITIONAL INSTRUCTIONS
              </div>
              <input
                type="text"
                className="flex-1 border-b border-gray-300 focus:outline-none focus:border-stone-900"
                placeholder="Enter any additional instructions here"
              />
            </div>
            <div className="flex flex-row gap-3 items-center mt-4">
              <span className="font-semibold text-xs md:text-sm">SUBTOTAL</span>
              <span>
                {formatUSDWithComma(cartTotalAmount)} +{" "}
                {formatUSDWithComma(selectedLogisticsPartner.fee)}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-2 items-start text-sm">
          <Button label="Check out" onClick={handleCheckout} />
        </div>
        <div className="flex md:hidden justify-evenly">
        <div className="flex flex-grow justify-evenly gap-3">
        <Button label="Clear all" onClick={handleClearCart} />
        <Button label="Check out" onClick={handleCheckout} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
