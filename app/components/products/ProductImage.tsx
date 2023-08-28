"use client";

import { ProductTypes, ImageProps } from "@/types";
import Image from "next/image";

interface ProductDetailsProps {
  cartProduct: ProductTypes;
  product: any;
  handleColorSelect: (value: ImageProps) => void;
}

const ProductImage: React.FC<ProductDetailsProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  const selectedColor = cartProduct.images[0].color; 
  const selectedImage = cartProduct.images.find(
    (image) => image.color === selectedColor
  );

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
       {product.images.map((image: ImageProps) => {
        return (
            <div key={image.color}
            onClick={() => handleColorSelect(image)}
            className={`relative w-[80%] aspect-square rounded border-stone-400
            ${selectedColor === image.color ? "border-[1.5px]" : "border-none" }`
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
       src={selectedImage?.image || ''} // Use the selectedImage's image
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
