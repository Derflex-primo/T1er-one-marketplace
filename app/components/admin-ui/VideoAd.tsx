import React from "react";
import Image from "next/image";
import { VideoAdProps } from "@/types";
import { TiDocumentDelete } from "react-icons/ti";

const VideoAd: React.FC<VideoAdProps> = ({ videoAd, onDelete }) => {
  return (
    <div className="flex justify-center mt-12 border rounded-lg">
      {videoAd ? (
        <div className="relative">
          <video controls className="w-full">
            <source src={videoAd} type="video/mp4" />
          </video>
          <button
            className="absolute top-1 right-1 bg-stone-700 text-white rounded-full"
            onClick={onDelete}
          >
            <TiDocumentDelete size={26} />
          </button>
        </div>
      ) : (
        <div className="pt-8">
          <Image
            src="/images/videoAd.svg"
            alt="default undraw video upload"
            width={360}
            height={360}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default VideoAd;
