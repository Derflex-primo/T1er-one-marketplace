"use client";
import Image from "next/image";
import { Rating } from "@mui/material";
import { ProductTypes } from "@/types";
import { formatStr, formatUSDWithComma } from "@/lib/utils/formats";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductCardProps {
  data: ProductTypes;
}

const productImage =
  "w-full h-full object-contain p-2 duration-300 hover:p-3 hover:cursor-pointer ease-in-out delay-75";

export const productRating =
  "bg-stone-100 text-stone-500 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-stone-200 dark:text-stone-500 cursor-not-allowed ";
export const productCotainer =
  "col-span-1 cursor-pointer border-[1px] shadow-sm bg-white rounded-lg hover:";
export const productsWrap =
  "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 mb:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4";

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const productShowRating = data.reviews?.[0]?.rating ?? 0;

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);
    updateWindowWidth();
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <>
      <Link href={`/products/${data.id}`} className={`${productCotainer} shadow-lg`}>
        <div className="">
          <div className="aspect-square overflow-hidden relative w-full">
            {data.images && data.images[0] && data.images[0].image && (
              <Image
                src={data.images[0].image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={data.name}
                className={productImage}
                priority
              />
            )}
          </div>
          <h1 className="mx-2 text-sm font-semibold">{formatStr(data.name)}</h1>
          <div className="flex justify-between mx-2 mt-1 text-xs">
            <span>{formatUSDWithComma(data.type[0].price)}</span>
            <span className="bg-rose-500 text-white font-semibold px-1 text-xs">
              {windowWidth < 640 ? "+30%" : "Save 30%"}
            </span>
          </div>
          <div className="flex justify-between items-center mx-2 my-2 mt-1 flex-row text-center ">
            <Rating
              sx={{ fontSize: "0.8rem" }}
              value={productShowRating}
              readOnly
              defaultValue={2}
            />
            <span className={`${productRating}`}>
              review
              <strong className="text-rose-500 ml-1">{data.reviews?.length}</strong>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
