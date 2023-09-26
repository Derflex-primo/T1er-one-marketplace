"use client";

import { ProductDetailsProps } from "@/types";
import Image from "next/image";
import { BiHide, BiPlay } from "react-icons/bi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductImage: React.FC<ProductDetailsProps> = ({
  cartProduct,
  product,
}) => {
  const [selectedMainImage, setSelectedMainImage] = useState<
    string | undefined
  >(cartProduct?.selectedImg?.image);
  const [selectVideoPlay, setSelectVideoPlay] = useState<boolean>(false);
  const [isVideoSelected, setIsVideoSelected] = useState<boolean>(false);

  const handleClick = (imageUrl: string) => {
    setSelectedMainImage(imageUrl);
    setSelectVideoPlay(false);
    setIsVideoSelected(false);
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
      <div className="col-span-1 overflow-y-auto max-h-[500px] items-center  space-y-3">
        <div className="relative w-[80%] h-16 aspect-square border rounded-lg cursor-pointer ">
          <Image
            src={cartProduct?.selectedImg?.image || ""}
            alt={`Set Image ${cartProduct?.selectedImg?.color}`}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 26.4vw"
            className={`object-contain ${
              !isVideoSelected &&
              selectedMainImage === cartProduct?.selectedImg?.image
                ? "border-[1.5px] border-stone-500 rounded-lg p-1 "
                : "border-none p-2"
            }`}
            onClick={() => handleClick(cartProduct?.selectedImg?.image || "")}
            priority
          />
        </div>

        {selectedImg?.setImages?.map((imageUrl: string, index: number) => (
          <div
            key={index}
            className="relative w-[80%] h-16 aspect-square border rounded-lg cursor-pointer"
            onClick={() => {
              handleClick(imageUrl);
              setIsVideoSelected(false);
            }}
          >
            <Image
              src={imageUrl || ""}
              alt={`Set Image ${index}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-contain ${
                selectedMainImage === imageUrl && !isVideoSelected
                  ? "border-[1.5px] border-stone-500 rounded-lg p-1"
                  : "border-none p-2"
              }`}
            />
          </div>
        ))}

        <div
          onClick={() => {
            if (product.vidAd?.videoAd && product.vidAd.videoAd.trim() !== "") {
              if (selectVideoPlay) {
                setSelectVideoPlay(false);
                setIsVideoSelected(false);
              } else {
                setSelectVideoPlay(true);
                setIsVideoSelected(true);
              }
            } else {
              toast.error("This product does not have a video ad available.");
            }
          }}
          className={`relative w-[80%] h-16 aspect-square ${
            isVideoSelected ? "border-[1.5px] border-stone-500" : "border"
          } rounded-lg flex justify-center items-center ${
            product.vidAd?.videoAd && product.vidAd.videoAd.trim() !== ""
              ? selectVideoPlay
                ? "hover:text-rose-500"
                : "hover:text-black"
              : "hover:text-rose-500"
          }`}
        >
          <div className="flex justify-center items-center h-8 w-8 cursor-pointer">
            {selectVideoPlay ? (
              <BiHide size={28} className="text-rose-500" />
            ) : (
              <BiPlay size={28} />
            )}
          </div>
        </div>
      </div>
      <div className="relative col-span-5 aspect-square">
        {selectVideoPlay ? (
          <div className="bg-black aspect-square rounded-lg overflow-hidden shadow-lg">
            <video controls autoPlay className="w-full h-full object-cover">
              <source src={product.vidAd?.videoAd} type="video/mp4" />
            </video>
          </div>
        ) : (
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
            src={selectedMainImage || cartProduct?.selectedImg?.image || ""}
            alt={cartProduct?.name || ""}
            className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px] "
          />
        )}
      </div>
    </div>
  );
};

export default ProductImage;
