"use client";

import Link from "next/link";
import Image from "next/image";
import SetQuantity from "../components/products-ui/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { ProductTypes } from "@/types";
import { formatStr, formatUSDWithComma } from "@/lib/utils/formats";

interface ItemContentProps {
  item: ProductTypes;
}

const removeBtn =
  "text-stone text-xs bg-stone-300 rounded-sm px-1 hover:text-white hover:bg-red-500 transition ease-in-out delay-100";
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductToType,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();

  return (
    <div
      className="
    grid 
    grid-cols-5
    py-4
    items-center
    text-xs
    md:text-sm
    gap-4
    border-t-[1.5px]
    border-slate-200 "
    >
      <div
        className="
        col-span-2
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
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{formatStr(item.name)}</Link>
          <div>{item.selectedImg?.color}</div>
          <div className="w-[70px]">
            <button
              onClick={() => handleRemoveProductToType(item)}
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
      <div className="justify-self-center">
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
  );
};

export default ItemContent;
