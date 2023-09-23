"use client";

// Add Video on Bigger View
import { ProductDetailsProps } from "@/types";
import Image from "next/image";
import { BiPlay } from "react-icons/bi";
import { useEffect, useState } from "react";

const ProductImage: React.FC<ProductDetailsProps> = ({
  cartProduct,
  product,
}) => {
  const [selectedMainImage, setSelectedMainImage] = useState<
    string | undefined
  >(cartProduct?.selectedImg?.image);

  const handleClick = (imageUrl: string) => {
    setSelectedMainImage(imageUrl);
  };

  const selectedImg = cartProduct?.selectedImg;

  useEffect(() => {
    if (cartProduct?.selectedImg) {
      setSelectedMainImage(cartProduct.selectedImg.image);
    } else {
      setSelectedMainImage("");
    }
  }, [cartProduct?.selectedImg]);

  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center rounded-lg gap-3 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]  ">
        <div className="relative w-[80%] h-16 aspect-square  ">
          <Image
            src={cartProduct?.selectedImg?.image || ""}
            alt={`Set Image ${cartProduct?.selectedImg?.color}`}
            layout="fill"
            className={`object-contain ${
              selectedMainImage === cartProduct?.selectedImg?.image
                ? "border-[1.5px] border-stone-500 rounded-lg p-1 "
                : "border-none p-2"
            } `}
            onClick={() => handleClick(cartProduct?.selectedImg?.image || "")}
          />
        </div>
        {selectedImg?.setImages?.map((imageUrl: string, index: number) => (
          <div
            key={index}
            className="relative w-[80%] h-16 aspect-square   "
            onClick={() => handleClick(imageUrl)}
          >
            <Image
              src={imageUrl || ""}
              alt={`Set Image ${index}`}
              layout="fill"
              className={`object-contain  ${
                selectedMainImage === imageUrl
                  ? "border-[1.5px] border-stone-500 rounded-lg p-1"
                  : "border-none p-2"
              }`}
            />
          </div>
        ))}

        <div className="relative w-[80%] h-16 aspect-square border rounded-lg flex justify-center items-center">
          <BiPlay  size={28} />
        </div>
      </div>
      <div className="relative col-span-5 aspect-square">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
          src={selectedMainImage || cartProduct?.selectedImg?.image || ""}
          alt={cartProduct?.name || ""}
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
