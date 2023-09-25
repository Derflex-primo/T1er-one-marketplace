"use client";
import Image from "next/image";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductTypes } from "@/types";
import { formatStr, formatUSDWithComma } from "@/lib/utils/formats";

interface ProductCardProps {
  data: ProductTypes;
}

const productImage =
  "w-full h-full object-contain p-3 duration-300 hover:p-4 hover:cursor-pointer ease-in-out delay-75";
export const productRating =
  "bg-stone-100 text-stone-500 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-stone-200 dark:text-stone-500  ";
const productCotainer =
  "col-span-1 cursor-pointer border-[1px] shadow-lg bg-white rounded-lg hover:animate-pulse";

export const productsWrap = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-8";

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
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

  const productShowRating = data.reviews?.[0]?.rating ?? 0;

  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className={`${productCotainer}`}
    >
      <div>
        <div className="aspect-square overflow-hidden relative w-full">
        {data.images && data.images[0] && data.images[0].image && (
            <Image
              src={data.images[0].image}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={data.name}
              className={productImage}
            />
          )}
        </div>
        <h1 className="mx-2">{formatStr(data.name)}</h1>
        <div className="flex justify-between mx-2 mt-1 text-xs">
          <span>{formatUSDWithComma(data.type[0].price)}</span>
          <span className="bg-green-300 px-1">
            {windowWidth < 640 ? "+30%" : "Save 30%"}
          </span>
        </div>
        <div className="flex justify-between mx-2 my-2 flex-col md:flex-row text-center ">
          <Rating
            sx={{ fontSize: "1rem" }}
            value={productShowRating}
            readOnly
          />
          <span className={`${productRating}`}>review</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
