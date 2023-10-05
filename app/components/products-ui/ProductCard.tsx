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
  "w-full h-full object-contain p-2 duration-300 hover:p-3 hover:cursor-pointer ease-in-out delay-75";

export const productRating =
  "bg-stone-100 text-stone-500 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-stone-200 dark:text-stone-500 cursor-not-allowed ";
const productCotainer =
  "col-span-1 cursor-pointer border-[1px] shadow-sm bg-white rounded-lg hover:animate-pulse";

export const productsWrap =
  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-10 gap-4";

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
        <h1 className="mx-2 text-sm">{formatStr(data.name)}</h1>
        <div className="flex justify-between mx-2 mt-1 text-xs">
          <span>{formatUSDWithComma(data.type[0].price)}</span>
          <span className="bg-rose-500 text-white font-semibold px-1 text-xs">
            {windowWidth < 640 ? "+30%" : "Save 30%"}
          </span>
        </div>
        <div className="flex justify-between items-center mx-2 my-2 flex-col md:flex-row text-center ">
          <Rating
            sx={{ fontSize: "0.8rem" }}
            value={productShowRating}
            readOnly
          />

          <span className={`${productRating}`}>
            review{" "}
            <strong className="text-rose-500">{data.reviews?.length}</strong>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
