import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductCardSkeleton = () => {
  return  <Skeleton className="w-11/24 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 h-[300px] rounded-lg overflow-hidden" style={{borderRadius: '0.5rem' }} />

};

export default ProductCardSkeleton;
