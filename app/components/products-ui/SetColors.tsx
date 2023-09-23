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
      <div className="flex flex-col mt-2 gap-4  ">
        <span className={colorCategories}>Theme: {selectedImageColor}</span>
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
                      layout="fill"
                      objectFit="contain"
                      quality={100}
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
