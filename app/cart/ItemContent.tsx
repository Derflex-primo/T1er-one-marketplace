"use client";

import Link from "next/link";
import Image from "next/image";
import SetQuantity from "../components/products-ui/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { CartProduct } from "@/types";
import {
  formatBrowseStr,
  formatModel,
  formatStr,
  formatUSDWithComma,
} from "@/lib/utils/formats";

interface ItemContentProps {
  item: CartProduct;
}

const removeBtn =
  "text-stone text-xs bg-stone-200 rounded-sm px-1 hover:text-white hover:bg-red-500 transition ease-in-out delay-100";
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductToType,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();

  return (
    <div>
      <div
        className="
    grid 
    grid-cols-4
    sm:grid-cols-5
    py-4
    items-center
    text-[12px]
    md:text-sm
    gap-4 
    "
      >
        <div
          className="
        sm:col-span-2
        flex
        justify-self-start
        gap-2
        md:gap-4
        "
        >
          <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
              {item.selectedImg?.image ? (
                <Image
                  src={item.selectedImg.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              ) : null}
            </div>
          </Link>
          <div className="hidden sm:flex flex-col justify-between">
            <Link href={`/product/${item.id}`}>{formatStr(item.name)}</Link>
            <div>{item.selectedImg?.color}</div>
            <div className="w-[70px]">
              <button
                onClick={() => handleRemoveProductToType(item.id)}
                className={removeBtn}
              >
                remove
              </button>
            </div>
          </div>
        </div>
        <div className="justify-self-center">
          {formatUSDWithComma(item.type[0].price)}
        </div>
        <div className="justify-self-center ">
          <SetQuantity
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() => {
              handleCartQtyIncrease(item);
            }}
            handleQtyDecrease={() => {
              handleCartQtyDecrease(item);
            }}
          />
        </div>
        <div className="justify-self-end font-semibold">
          {formatUSDWithComma(item.type[0].price * item.quantity)}
        </div>
      </div>
      <div className="flex sm:hidden flex-row justify-between  ">
        <div className="flex flex-row space-x-2">
         <Link href={`/product/${item.id}`}>{formatBrowseStr(item.name)}</Link>
          <span className="flex flex-row items-center space-x-2">
            <div
              className="flex justify-start space-x-2 h-4 w-4 rounded-full"
              style={{
                backgroundColor: item.selectedImg?.colorCode,
              }}
            ></div>
          </span>
        </div>
        <button
          onClick={() => handleRemoveProductToType(item.id)}
          className={removeBtn}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default ItemContent;
