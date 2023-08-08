"use client";

import React from "react";
import { CartProductsType, colorCategories } from "./ProductDetails";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductsType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const buttonStyle =
  "border-[1.5px] border-stone-200 px-2  p-2 text-stone-700 ";

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartProduct,
  cartCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center mt-4">
      {cartCounter ? null : <div className={colorCategories}>Quantity:</div>}
      <div className="flex gap-[.4px] items-center text-base">
        <button
          onClick={handleQtyDecrease}
          className={`${buttonStyle} relative rounded-l-lg  hover:bg-stone-600 hover:text-white transition ease-in-out delay-100`}
        >
          <AiOutlineMinus size={16} />
        </button>
        <div className={`border-[1.5px] px-4 py-1`}>{cartProduct.quantity}</div>
        <button
          onClick={handleQtyIncrease}
          className={`${buttonStyle}relative rounded-r-lg hover:bg-stone-600 hover:text-white transition ease-in-out delay-100`}
        >
           <AiOutlinePlus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
