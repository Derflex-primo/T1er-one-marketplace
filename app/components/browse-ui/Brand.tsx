import { BrowseProps } from "@/types";
import React, { useState } from "react";
import Container from "../Container";
import SortByLevels from "./SortByLevels";
import Image from "next/image";
import { formatBrowseStr, formatUSDWithComma } from "@/lib/utils/formats";
import Rating from "@mui/material/Rating";
import { productRating } from "../products-ui/ProductCard";

const Brand: React.FC<BrowseProps> = ({ products }) => {
  return (
    <Container>
      <div className="flex w-full mt-2 gap-4">
        <div className="border w-[20%]">
          <h1 className="font-semibold text-xs text-stone-900">FILTERS</h1>
          <select className="mt-4" name="DARYL" id="">
            <option value="">PENDING</option>
            <option value="">DARYL</option>
            <option value="">BJ</option>
            <option value="">MIKKO</option>
          </select>
        </div>
        <div className="flex flex-col  w-[80%]">
          <div className="flex justify-end">
            <SortByLevels />
          </div>
          <div className="flex gap-3  mt-5">
            {products.map((product) => (
              <div  key={product.id} className="relative rounded-xl border ">
                <div  className="relative h-60 w-60">
                  {product.images &&
                    product.images[0] &&
                    product.images[0].image && (
                      <Image
                        src={product.images[0].image}
                        alt={product.name}
                        fill
                        className="object-contain  p-3"
                      />
                    )}
                </div>
                <div className="p-3 space-y-2">
                  <div>{formatBrowseStr(product.name)}</div>
                  <div className="text-xs">
                    Model:{" "}
                    {product.specs && Object.values(product.specs?.Model)}
                  </div>
                  <div className="flex flex-row items-center space-x-2">
                    <div className="text-xs">Theme:</div>
                    {product.images?.map((image, index) => (
                      <div
                        key={index}
                        className="flex flex-row space-x-2 h-4 w-4 rounded-full"
                        style={{ backgroundColor: image.colorCode }}
                      ></div>
                    ))}
                  </div>
                  <div>{formatUSDWithComma(product.type[0].price)}</div>
                  <div className="flex justify-between items-center  my-2 flex-col md:flex-row text-center ">
                    <Rating
                      sx={{ fontSize: "0.8rem" }}
                      value={product.reviews?.[0]?.rating || 2}
                      readOnly
                    />
                    <span className={`${productRating} items-center space-x-1`}>
                      review
                      <strong className="text-rose-500 ml-1">
                        {product.reviews?.length}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Brand;
