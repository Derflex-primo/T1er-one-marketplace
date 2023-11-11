import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
const ProductBrowseSkeleton = () => {
  return (
    <>
    <Skeleton className="h-60 w-56" />
     <div className="relative p-3 space-y-2">
     <div className="relative p-3 space-y-2">
      <Skeleton className="h-[16px] w-8" />
     </div>
     <div className="relative p-3 space-y-2">
      <Skeleton className="h-[12px] w-6" />
     </div>
     <div className="h-4">
     </div>
     <div className="relative p-3 space-y-2">
      <Skeleton className="h-[16px] w-5" />
     </div>
     </div>
    </>
  )
}

export default ProductBrowseSkeleton