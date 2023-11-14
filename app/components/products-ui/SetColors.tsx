"use client";

import { ImageProps, ProductTypes } from "@/types";
import { colorCategories } from "./ProductDetails";
import Image from "next/image";
import { GiPlainCircle } from "react-icons/gi";

interface SetColorsProps {
  images: ImageProps[];
  cartProduct: ProductTypes;
  handleColorSelect: (value: ImageProps) => void;
}

const SetColors: React.FC<SetColorsProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  const selectedImageColor =
    images.find((img) => img.image === cartProduct.selectedImg?.image)?.color ||
    "";

  return (
    <div>
      <div className="px-4 flex flex-col  gap-4  md:text-sm text-xs">
        <span className={colorCategories}>Theme: <strong className="font-normal">{selectedImageColor}</strong></span>
        <div className="flex gap-3">
          {images &&
            images.map((image) => {
              return (
                <div className="" key={image.image}>
                  <button
                    onClick={() => handleColorSelect(image)}
                    className="relative h-10 w-10"
                  >
                    <Image
                      src={image.image || ""}
                      alt={image.color || ""}
                      fill
                      className="object-contain"
                      quality={75}
                      sizes="40px"
                      priority={false} 
                    />
                    {cartProduct.selectedImg?.image === image.image && (
                      <span className="absolute top-[-6px] right-[-1px]">
                        <GiPlainCircle style={{ color: image.colorCode }} />
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SetColors;
