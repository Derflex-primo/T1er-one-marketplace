"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProductTypes } from "@/types";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: ProductTypes;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const buttonStyle =
  "border-[0.8px]  border-stone-200 px-2  p-2 text-stone-700 ";

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartProduct,
  cartCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex justify-end sm:justify-start items-center">
      {cartCounter ? null : <div className={`font-semibold md:text-sm text-xs text-stone-800 cursor-default px-[14px] hidden  sm:flex`}>Quantity:</div>}
      <div className="flex gap-[.4px] items-center text-base">
        <button
          onClick={handleQtyDecrease}
          className={`${buttonStyle} relative rounded-l-lg  hover:bg-rose-600 hover:text-white transition ease-in-out delay-100`}
        >
          <AiOutlineMinus size={16} />
        </button>
        <div className={`border-[0.8px]  px-2 py-1 md:px-4 `}>{cartProduct.quantity}</div>
        <button
          onClick={handleQtyIncrease}
          className={`${buttonStyle}relative rounded-r-lg hover:bg-rose-600 hover:text-white transition ease-in-out delay-100`}
        >
           <AiOutlinePlus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
