import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TiDocumentDelete } from "react-icons/ti";
import { ImagePreviewProps } from "@/types";
import { CircularProgress } from "@mui/material";

// FIX LOADING STATE

const ImagePreview: React.FC<ImagePreviewProps> = ({
  uploadedImages,
  onDelete,
  imageColors,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoadingMainImage, setLoadingMainImage] = useState(true);
  const [animateDefault, setAnimateDefault] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    if (uploadedImages.length > 0) {
      setLoadingMainImage(true);
      setAnimateDefault(true);

      const newTimer = setTimeout(() => {
        setSelectedImage(uploadedImages[uploadedImages.length - 1]);
        setAnimateDefault(false);
        setLoadingMainImage(false);
      }, 3000);

      setTimer(newTimer);
    } else {
      setLoadingMainImage(false);
      setAnimateDefault(false);
    }
  }, [uploadedImages]);
  return (
    <div className="image-upload-preview  p-4 rounded shadow-lg relative">
      <div className="h-[260px] w-full relative">
        {isLoadingMainImage ? (
          <div className="absolute inset-0 flex justify-center items-center  animate-pulse ">
            <CircularProgress color="inherit" />
          </div>
        ) : selectedImage ? (
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src={selectedImage}
              alt="Selected Preview"
              width={260}
              height={260}
              quality={75}
              className="uploaded-image rounded"
            />
          </div>
        ) : (
          <div
            className={`flex justify-center items-center transition-all ease-in-out duration-[3000ms] ${
              animateDefault ? " " : " "
            }`}
          >
            <Image
              src="/images/imgDefaultBasket.svg"
              alt="default undraw img upload"
              width={400}
              height={400}
              priority
            />
          </div>
        )}

        {selectedImage && (
          <div className="flex flex-col mt-4 text-xs absolute top-0 right-4">
            <div className="flex flex-col text-white bg-stone-900 p-4 rounded">
              <span>
                Item color:{" "}
                <span
                  className="p-1 rounded"
                  style={{
                    backgroundColor:
                      imageColors[uploadedImages.indexOf(selectedImage)]?.color,
                  }}
                >
                  {imageColors[uploadedImages.indexOf(selectedImage)]?.name}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="border mt-8">
          {uploadedImages.map((uploadedImageUrl, index) => (
            <div className="relative inline-block" key={index}>
              <button
                className="p-2"
                onClick={() => setSelectedImage(uploadedImageUrl)}
              >
                <Image
                  src={uploadedImageUrl}
                  alt="Thumbnail"
                  width={54}
                  height={54}
                />
              </button>

              <button
                className="absolute top-1 right-1 bg-stone-700 text-white rounded-full"
                onClick={() => {
                  onDelete(index);
                  if (selectedImage === uploadedImageUrl) {
                    setSelectedImage(null);
                  }
                }}
              >
                <TiDocumentDelete size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
