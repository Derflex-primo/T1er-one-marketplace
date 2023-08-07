"use client";
import Image from "next/image";
import { formatter, formatUSDWithComma } from "@/utils/formatter";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    data:any
}

const productImage = "w-full h-full object-contain p-4 transform translate-4 transition-transform duration-300 hover:scale-90 hover:cursor-pointer "
const productRating ="bg-blue-100 text-blue-800 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800  "
const productCotainer = "col-span-1 cursor-pointer border-[1px] shadow-lg bg-white rounded-lg"

const ProductCard:React.FC<ProductCardProps> = ({ data }) => {
const productShowRating = data.reviews.reduce((acc: number, item:any) => item.rating + acc, 0) / data.reviews.length;
const router = useRouter();
  return (
    <div onClick={() => router.push(`/product/${data.id}`)} className={productCotainer}>
      <div>
        <div className="aspect-square overflow-hidden relative w-full">
            <Image 
            src={data.images[0].image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={data.name}
            className={productImage}
            />
        </div>
        <div className="mx-2">
          <h1>{formatter(data.name)}</h1>
        </div>
        <div className="flex justify-between mx-2 mt-1 text-xs">
          <span>{formatUSDWithComma(data.price)}</span>
          <span className="bg-green-300">Save 30%</span>
        </div>
        <div className="flex justify-between mx-2 my-2 ">
          <Rating sx={{fontSize: "1rem"}} value={productShowRating} readOnly/>
          <span className={productRating}>reviews <strong className="text-rose-500">{data.reviews.length}</strong></span>  
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
