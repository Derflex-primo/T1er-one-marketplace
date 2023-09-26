import Skeleton from "react-loading-skeleton";
import { Horizontal, productDetails } from "../products-ui/ProductDetails";
import "react-loading-skeleton/dist/skeleton.css";
import ProductImageSkeleton from "./ProductImageSkeleton";

export const ProductDetailsSkeleton = () => {
  return (
    <div
      className="
    flex 
    flex-row  
    justify-between
    gap-22
    mx-[40px]
    xl:px-20
    md:px-2
    px-4"
    >
      {/* Product Image Skeleton */}
      <ProductImageSkeleton />

      {/* Product Details Skeleton */}
      <div className="flex flex-col gap-1 w-full pl-[24px]  pt-[28px]  ">
        <Skeleton style={{ borderRadius: "8px" }} width="70%" height="30px" />
        <Skeleton style={{ borderRadius: "8px" }} width="100%" height="20px" />
        <Horizontal />
        <Skeleton style={{ borderRadius: "8px" }} width="100%" height="100px" />
        <Horizontal />
        <div className="flex flex-row space-x-10 mb-6">
          <Skeleton
            style={{ borderRadius: "4px" }}
            width="100px"
            height="20px"
          />
          <Skeleton
            style={{ borderRadius: "4px" }}
            width="100px"
            height="20px"
          />
          <Skeleton
            style={{ borderRadius: "4px" }}
            width="100px"
            height="20px"
          />
          <Skeleton
            style={{ borderRadius: "4px" }}
            width="100px"
            height="20px"
          />
        </div>
        <div className="mt-4">
          <Skeleton
            style={{ borderRadius: "8px" }}
            width="200px"
            height="40px"
          />
        </div>
        <div className="mt-4">
          <Skeleton
            style={{ borderRadius: "8px" }}
            width="200px"
            height="40px"
          />
        </div>
        <div className="mt-4">
          <Skeleton
            style={{ borderRadius: "8px" }}
            width="200px"
            height="40px"
          />
        </div>
      </div>
    </div>
  );
};
