const SkeletonLoading = ({ width , height }: { width: string, height: string }) => {
  return (
    <div className="animate-pulse bg-gray-300 rounded w-full h-full" style={{ width, height }} />
  );
};

export default SkeletonLoading;
