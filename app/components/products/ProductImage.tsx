"use client";

import { CartProductsType, SelectedImgType } from "./ProductDetails";
import Image from "next/image";

interface ProductDetailsProps {
  cartProduct: CartProductsType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductDetailsProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div
      className="
    grid
    grid-cols-6
    gap-2
    h-full
    max-h-[500px]
    min-h-[300px]
    sm:min-h-[400px]
    "
    >
      <div
    className="
     flex 
     flex-col 
     items-center 
     justify-center 
     rounded-lg
     gap-4 
     cursor-pointer 
     border 
     h-full 
     max-h-[500px] 
     min-h-[300px] 
     sm:min-h-[400px]"
      >
       {product.images.map((image: SelectedImgType) => {
        return (
            <div key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`relative w-[80%] aspect-square rounded border-stone-400
            ${cartProduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none" }`
            }>
                <Image 
                 src={image.image}
                 alt={image.color}
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 fill
                 className="object-contain"
                 />
            </div>
        )
       })}
      </div>
      <div className="
      relative
      col-span-5
      aspect-square
      ">
      <Image
       fill
       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
       quality={100}
       src={cartProduct.selectedImg.image}
       alt={cartProduct.name}
       className="
       w-full 
       h-full 
       object-contain
       max-h-[500px] 
       min-h-[300px] 
       sm:min-h-[400px]"
      />
      </div>
    </div>
  );
};

export default ProductImage;
