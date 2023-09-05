"use client"

import { ImageProps, ProductTypes } from "@/types"
import { colorCategories } from "./ProductDetails"

interface SetColorsProps {
    images: ImageProps[],
    cartProduct: ProductTypes,
    handleColorSelect: (value: ImageProps) => void
}

const SetColors:React.FC<SetColorsProps> = ({images, cartProduct, handleColorSelect }) => {
  return (
    <div>
        <div className="flex mt-4 gap-4  items-center">
            <span className={colorCategories}>Theme:</span>
            <div className="flex gap-1">{images && images.map((image) =>{
                return (
                <div key={image.color} 
                onClick={() => handleColorSelect(image)}
                className={`
                flex
                h-7
                w-7
                rounded-full
                border-slate-400
                items-center
                justify-center
                cursor-pointer
                ${cartProduct.selectedImg?.color === image.color ? "border-[1.5px]" : "border-none"}
                `}>
                  <div 
                  style={{background:image.colorCode}}
                  className="h-5 w-5 rounded-full  border-stone-500">
                  </div>
                </div>)
            })}</div>
        </div>
    </div>
  )
}

export default SetColors