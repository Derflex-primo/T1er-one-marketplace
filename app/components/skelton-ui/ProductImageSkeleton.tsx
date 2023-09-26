import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductImageSkeleton = () => {
  return (
    <div className="flex flex-row gap-[53px] h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col pt-[54px] items-center justify-center gap-3 cursor-pointer h-full">
        <Skeleton width={72} height={60} style={{ borderRadius: '0.5rem' }} />
        <Skeleton width={72} height={60} style={{ borderRadius: '0.5rem' }} />
        <Skeleton width={72} height={60} style={{ borderRadius: '0.5rem' }} />
        <Skeleton width={72} height={60} style={{ borderRadius: '0.5rem' }} />
        <Skeleton width={72} height={60} style={{ borderRadius: '0.5rem' }} />
        <Skeleton width={72} height={60} style={{ borderRadius: '0.5rem' }} />
      </div>
      <div className="relative pt-[28px] aspect-square">
        <Skeleton width={497} height={497} style={{ borderRadius: '0.5rem' }} />
      </div>
    </div>
  );
};

export default ProductImageSkeleton;
