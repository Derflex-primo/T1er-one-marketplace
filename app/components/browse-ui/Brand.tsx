import { BrowseProps } from "@/types";
import React, { useState } from "react";
import Container from "../Container";
import SortByLevels from "./SortByLevels";
import Image from "next/image";
import {
  connectivityOptions,
  customerRatings,
  discountOptions,
  displayTechnologies,
  formatBrowseStr,
  formatUSDWithComma,
  operatingSystems,
  options,
  processorCores,
  ramCapacities,
  releaseYears,
  screenRefreshRates,
  storageCapacity,
} from "@/lib/utils/formats";
import Rating from "@mui/material/Rating";
import { productRating } from "../products-ui/ProductCard";
import { IoCloseSharp } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";

const Brand: React.FC<BrowseProps> = ({ products }) => {
  const [openFilter, setOpenFilter] = useState<{ [key: string]: boolean }>({});
  const [selectedFilters, setSelectedFilters] = useState<{
    discount?: string;
    gadjet?: string;
    storage?: string;
    connectivity?: string;
    displayTech?: string;
    refreshRate?: string;
    ram?: string;
    os?: string;
    releaseYear?: string;
    rating?: string;
    cores?: string;
  }>({});

  const handleOptionClick = (type: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [type]: value }));
  };

  const removeFilter = (type: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[type as keyof typeof newFilters];
      return newFilters;
    });
  };

  return (
    <Container>
      <div className="flex w-full mt-2 gap-12">
        <div className="border rounded-xl w-[20%]">
          <h1 className="border-b p-3 text-stone-900">FILTERS</h1>

          <div>
            <div
              className={`w-full p-3 border-b cursor-pointer select-none ${
                openFilter.gadjet
                  ? " bg-rose-600 text-white ease-in-out duration-300"
                  : "hover:text-rose-500"
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({ ...prev, gadjet: !prev.gadjet }))
              }
            >
              Gadjet type
            </div>

            {openFilter.gadjet && (
              <div className="w-full bg-white  ease-in-out duration-300 select-none">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="p-3 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("gadget", option.label)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3 border-b cursor-pointer select-none ${
                openFilter.storage
                  ? " bg-rose-600 text-white ease-in-out duration-300"
                  : "hover:text-rose-500"
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({ ...prev, storage: !prev.storage }))
              }
            >
              Storage capacity
            </div>

            {openFilter.storage && (
              <div className="w-full bg-white  ease-in-out duration-300 select-none">
                {storageCapacity.map((option) => (
                  <div
                    key={option}
                    className="p-3 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("storage", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            <div
              className={`w-full p-3 border-b cursor-pointer select-none ${
                openFilter.ram
                  ? "bg-rose-600 text-white"
                  : "hover:text-rose-500"
              }`}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  ram: !prev.ram,
                }))
              }
            >
              RAM capacity
            </div>

            {openFilter.ram && (
              <div className="w-full bg-white ease-in-out duration-300 select-none">
                {ramCapacities.map((capacity) => (
                  <div
                    key={capacity}
                    className="p-2 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("ram", capacity)}
                  >
                    {capacity}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3 border-b cursor-pointer ${
                openFilter.connectivity
                  ? " bg-rose-600 text-white ease-in-out duration-300"
                  : "hover:text-rose-500"
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  connectivity: !prev.connectivity,
                }))
              }
            >
              Connectivity options
            </div>

            {openFilter.connectivity && (
              <div className="w-full bg-white  ease-in-out duration-300 select-none">
                {connectivityOptions.map((option) => (
                  <div
                    key={option}
                    className="p-3 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("connectivity", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3 border-b cursor-pointer  select-none ${
                openFilter.displayTech
                  ? " bg-rose-600 text-white ease-in-out duration-300"
                  : "hover:text-rose-500"
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  displayTech: !prev.displayTech,
                }))
              }
            >
              Display Technologies
            </div>

            {openFilter.displayTech && (
              <div className="w-full bg-white  ease-in-out duration-300 select-none">
                {displayTechnologies.map((tech) => (
                  <div
                    key={tech}
                    className="p-3 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("displayTech", tech)}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3 border-b cursor-pointer select-none ${
                openFilter.refreshRate
                  ? "bg-rose-600 text-white"
                  : "hover:text-rose-500"
              }`}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  refreshRate: !prev.refreshRate,
                }))
              }
            >
              Screen refresh rate
            </div>

            {openFilter.refreshRate && (
              <div className="w-full bg-white ease-in-out duration-300 select-none">
                {screenRefreshRates.map((rate) => (
                  <div
                    key={rate}
                    className="p-2 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("refreshRate", rate)}
                  >
                    {rate}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3 border-b cursor-pointer select-none ${
                openFilter.os ? "bg-rose-600 text-white" : "hover:text-rose-500"
              }`}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  os: !prev.os,
                }))
              }
            >
              Operating System
            </div>

            {openFilter.os && (
              <div className="w-full bg-white ease-in-out duration-300 select-none">
                {operatingSystems.map((os) => (
                  <div
                    key={os}
                    className="p-2 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("os", os)}
                  >
                    {os}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3 border-b cursor-pointer select-none ${
                openFilter.cores
                  ? "bg-rose-600 text-white"
                  : "text-current hover:text-rose-500"
              }`}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  cores: !prev.cores,
                }))
              }
            >
              Processor Cores
            </div>

            {openFilter.cores && (
              <div className="w-full bg-white ease-in-out duration-300 select-none">
                {processorCores.map((core) => (
                  <div
                    key={core}
                    className="p-2 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("cores", core)}
                  >
                    {core}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3 border-b cursor-pointer select-none ${
                openFilter.rating
                  ? "bg-rose-600 text-white"
                  : " hover:text-rose-500"
              }`}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  rating: !prev.rating,
                }))
              }
            >
              Customer Rating
            </div>

            {openFilter.rating && (
              <div className="w-full bg-white ease-in-out duration-300 select-none">
                {customerRatings.map((rating) => (
                  <div
                    key={rating}
                    className="p-2 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("rating", rating)}
                  >
                    {rating}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3 border-b cursor-pointer select-none ${
                openFilter.releaseYear
                  ? "bg-rose-600 text-white"
                  : "hover:text-rose-500"
              }`}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  releaseYear: !prev.releaseYear,
                }))
              }
            >
              Release year
            </div>

            {openFilter.releaseYear && (
              <div className="w-full bg-white ease-in-out duration-300 select-none">
                {releaseYears.map((year) => (
                  <div
                    key={year}
                    className="p-2 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() =>
                      handleOptionClick("releaseYear", year.toString())
                    }
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`w-full p-3  cursor-pointer select-none  ${
                openFilter.discount
                  ? " bg-rose-600 text-white ease-in-out duration-300"
                  : "hover:text-rose-500"
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({ ...prev, discount: !prev.discount }))
              }
            >
              Discount available
            </div>

            {openFilter.discount && (
              <div className="w-full bg-white  ease-in-out duration-300 select-none">
                {discountOptions.map((option) => (
                  <div
                    key={option}
                    className="p-3 cursor-pointer border-b hover:bg-stone-200"
                    onClick={() => handleOptionClick("discount", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-[80%]">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="flex items-center gap-3">
                <GrUpdate className="rotate-45" />
                Updated just now
              </div>
              <div className="font-semibold">{products.length} items</div>
            </div>
            <div>
              <SortByLevels />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(selectedFilters).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-wrap items-center border border-stone-200 bg-stone-100 rounded-full py-2 px-3 select-none space-x-2"
              >
                <span>{value}</span>
                <button
                  onClick={() => removeFilter(key)} // Pass the filter type to the removeFilter function
                  className="px-2 py-1 rounded-full"
                >
                  <IoCloseSharp className="text-black" size={19} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3  z-0 mt-5">
            {products.map((product) => (
              <div key={product.id} className="relative rounded-xl border ">
                <div className="relative z-0 h-60 w-60">
                  {product.images &&
                    product.images[0] &&
                    product.images[0].image && (
                      <Image
                        src={product.images[0].image}
                        alt={product.name}
                        fill
                        className="object-contain p-3"
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
