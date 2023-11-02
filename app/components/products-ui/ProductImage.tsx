"use client";

import { ProductDetailsProps } from "@/types";
import Image from "next/image";
import { BiHide, BiPlay } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { styleSpecs } from "./Specs";
import { IoCloseSharp } from "react-icons/io5";
import "@/app/globals.css";

// Add Loading state in main image view

const ProductImage: React.FC<ProductDetailsProps> = ({
  cartProduct,
  product,
}) => {
  const [selectedMainImage, setSelectedMainImage] = useState<
    string | undefined
  >(cartProduct?.selectedImg?.image);
  const [selectVideoPlay, setSelectVideoPlay] = useState<boolean>(false);
  const [selectedModalImage, setSelectedModalImage] = useState<
    string | undefined
  >(undefined);
  const [isVideoSelected, setIsVideoSelected] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const zoomedImageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomedImageRef.current) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    zoomedImageRef.current.style.transformOrigin = `${x}% ${y}%`;
    zoomedImageRef.current.classList.add("scale-150");
    zoomedImageRef.current.style.visibility = "visible";
  };

  const handleMouseOut = () => {
    if (!zoomedImageRef.current) return;
    zoomedImageRef.current.classList.remove("scale-150");
  };

  const handleClick = (imageUrl: string) => {
    setIsLoading(true);
    setSelectedMainImage(imageUrl);
    setSelectedModalImage(imageUrl);
    setSelectVideoPlay(false);
    setIsVideoSelected(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectedImg = cartProduct?.selectedImg;

  useEffect(() => {
    setIsLoading(true);
    if (cartProduct?.selectedImg) {
      setSelectedMainImage(cartProduct.selectedImg.image);
    } else {
      setSelectedMainImage("");
    }
  }, [cartProduct?.selectedImg]);

  useEffect(() => {
    if (selectedImg?.setImages && selectedImg.setImages.length > 0) {
      setSelectedModalImage(selectedImg.setImages[0]);
    }
  }, [selectedImg]);

  return (
      <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="col-span-1 pt-6 overflow-y-auto max-h-[500px] items-center  space-y-3">
          <div className="relative w-[70%] h-16 aspect-square border rounded-lg cursor-pointer ">
            <Image
              src={cartProduct?.selectedImg?.image || ""}
              alt={`Set Image ${cartProduct?.selectedImg?.color}`}
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 26.4vw"
              className={`object-contain ${
                !isVideoSelected &&
                selectedMainImage === cartProduct?.selectedImg?.image
                  ? "border-[1.5px] border-stone-500 rounded-lg p-1"
                  : "border-none p-2 "
              }`}
              quality={75}
              onLoad={() => setIsLoading(false)}
              onClick={() => handleClick(cartProduct?.selectedImg?.image || "")}
              priority={false}
            />
          </div>

          {selectedImg?.setImages
            ?.slice(0, 3)
            .map((imageUrl: string, index: number) => (
              <div
                key={index}
                className="relative w-[70%] h-16 aspect-square border rounded-lg cursor-pointer overflow-hidden"
                onClick={() => {
                  handleClick(imageUrl);
                  setIsVideoSelected(false);
                }}
              >
                <Image
                  src={imageUrl || ""}
                  alt={`Set Image ${index}`}
                  fill
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-contain ${
                    selectedMainImage === imageUrl && !isVideoSelected
                      ? "border-[1.5px] border-stone-500 rounded-lg p-1"
                      : "border-none p-2 "
                  }`}
                  priority={false}
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            ))}
          <button
            className={`relative w-[70%] text-xs h-16 aspect-square border rounded-lg cursor-pointer hover:underline underline-offset-2  `}
            onClick={handleOpen}
          >
            {selectedImg?.setImages?.length || 0} more
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-image"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleSpecs}>
              <Typography
                component="div"
                id="modal-modal-image"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pt: "18px",
                  pb: "14px",
                }}
              >
                <div
                  className=" image-container relative h-[500px] w-[500px]  overflow-hidden hover:cursor-zoom-in"
                  onMouseMove={handleMouseMove}
                  onMouseOut={handleMouseOut}
                >
                  <Image
                    src={selectedModalImage || ""}
                    alt="Selected Image"
                    fill
                    priority={false}
                    sizes="(max-width: 768px) 500px, 500px"
                    className="object-contain"
                    ref={zoomedImageRef}
                  />
                </div>
              </Typography>
              <Button
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  minWidth: "auto",
                  paddingRight: "12px",
                  paddingTop: "10px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.8,
                  },
                }}
                onClick={handleClose}
              >
                <IoCloseSharp
                  className="text-black hover:text-red-500 "
                  size={19}
                />
              </Button>
              <Button // PRODUCT IMAGES / CUSTOMER IMAGES
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  minWidth: "auto",
                  paddingRight: "12px",
                  paddingTop: "10px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.8,
                  },
                }}
              ></Button>
              <Typography
                component="div"
                className="flex justify-center space-x-4"
                style={{
                  overflowX: "auto",
                  marginBottom: "24px",
                  marginTop: "24px",
                }}
              >
                {selectedImg?.setImages.map((url: string, i: number) => (
                  <div
                    className={`relative h-16 w-16 border p-2 ${
                      selectedModalImage === url ? "border-sky-500" : "border"
                    }`}
                    key={i}
                  >
                    <Image
                      src={url || ""}
                      alt={`More images ${i}`}
                      fill
                      priority={false}
                      sizes="64px"
                      className="object-contain cursor-pointer"
                      onClick={() => setSelectedModalImage(url)}
                    />
                  </div>
                ))}
              </Typography>
            </Box>
          </Modal>

          <div
            onClick={() => {
              if (
                product.vidAd?.videoAd &&
                product.vidAd.videoAd.trim() !== ""
              ) {
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
            className={`relative w-[70%] h-16 aspect-square ${
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
              className={`w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px] transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              priority={false}
              loading="lazy"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </div>
      </div>
  );
};

export default ProductImage;
