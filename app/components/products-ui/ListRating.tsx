"use client";

import moment from "moment";
import Heading from "../Heading";
import { Rating } from "@mui/material";
import Avatar from "../Avatar";
import { useState } from "react";
import { productRating } from "./ProductCard";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  const [expandedStates, setExpandedStates] = useState(
    product.reviews.map(() => false)
  );

  const toggleDescription = (index: number) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  return (
    <div className="max-w-[650px]">
      <div className="mt-8 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
        {product.reviews === undefined ? (
          <h1>No reviews</h1>
        ) : (
          product.reviews.map((review: any, index: number) => {
            const expanded = expandedStates[index];
            const hasLongComment =
              review.comment &&
              typeof review.comment === "string" &&
              review.comment.length > 180;

            return (
              <div key={review.id} className="max-w-[95%]">
                <div className="flex gap-2 items-center">
                  <Avatar src={review?.user?.image || null} />
                  <div className="">{review?.user?.name || null}</div>
                  <div className="font-thin text-xs text-stone-400">
                    {moment(review.createdData).fromNow()}
                  </div>
                </div>

                <div className="mt-2">
                  <Rating
                    value={review?.rating || 0}
                    sx={{ fontSize: "1rem" }}
                  />

                  <div className="ml-2 text-stone-500 text-xs text-justify gap-4">
                    {expanded
                      ? review.comment
                      : review.comment && typeof review.comment === "string"
                      ? review.comment.slice(0, 180)
                      : ""}
                    {!expanded && hasLongComment && "..."}
                    {hasLongComment && (
                      <button
                        className="hover:underline text-black"
                        onClick={() => toggleDescription(index)}
                      >
                        {expanded ? "See less" : "See more"}
                      </button>
                    )}
                  </div>

                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListRating;
