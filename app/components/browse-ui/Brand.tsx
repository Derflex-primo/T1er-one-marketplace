import { BrowseProps } from "@/types";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import SortByLevels, { Options } from "./SortByLevels";
import Image from "next/image";
import splitWord, {
  connectivityOptions,
  customerRatings,
  discountOptions,
  displayTechnologies,
  formatBrowseStr,
  formatStr,
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
import { IoCloseSharp, IoFilterSharp } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { AiOutlinePushpin } from "react-icons/ai";
import { MdOutlineFilterListOff, MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from "@/hooks/useCart";
import { usePinned } from "@/hooks/usePinned";
import { BsCircleFill } from "react-icons/bs";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

// BUY NOW LACK

const Brand: React.FC<BrowseProps> = ({ products }) => {
  const { handleAddProductToType } = useCart();
  const { handleAddPinnedProductToType } = usePinned();

  const [sortCriteria, setSortCriteria] =
    useState<Options>("Price High to low");
  const [lastButtonPress, setLastButtonPress] = useState<Date | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 972);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [updatedTimeStr, setUpdatedTimeStr] =
    useState<string>("Updated just now");
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
    cores?: string;
    rating?: string;
    releaseYear?: string;
  }>({});

  const handleOptionClick = (type: string, value: string) => {
    setFilterLoading(true);
    setSelectedFilters((prev) => ({ ...prev, [type]: value }));

    setTimeout(() => {
      setFilterLoading(false);
    }, 1500);
  };

  const removeFilter = (type: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[type as keyof typeof newFilters];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const updateProducts = () => {
    if (
      lastButtonPress &&
      new Date().getTime() - lastButtonPress.getTime() < 10000
    ) {
      // Prevents update if it's been less than 10 seconds since the last button press
      return;
    }

    setFilterLoading(true);
    setUpdatedTimeStr("Updated just now"); // Set the text immediately when the user clicks the update

    // Simulate a loading delay. You can replace this with your actual product update logic.
    setTimeout(() => {
      setFilterLoading(false);
      setLastUpdated(new Date());
      setLastButtonPress(new Date());
    }, 2000); // Assuming a 2-second loading time
  };

  const isButtonDisabled =
    lastButtonPress && new Date().getTime() - lastButtonPress.getTime() < 10000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        const diffInSeconds =
          (new Date().getTime() - lastUpdated.getTime()) / 1000;
        if (diffInSeconds < 60) {
          // Less than 1 minute
          setUpdatedTimeStr(`Updated ${Math.floor(diffInSeconds)} seconds ago`);
        } else if (diffInSeconds < 3600) {
          // Less than 1 hour but more than 1 minute
          const minutes = Math.floor(diffInSeconds / 60);
          setUpdatedTimeStr(
            `Updated ${minutes} minute${minutes > 1 ? "s" : ""} ago`
          );
        } else {
          setUpdatedTimeStr(`Updated a while ago`);
          clearInterval(interval);
        }
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [lastUpdated]);

  let filteredProducts = [...products];

  if (sortCriteria) {
    switch (sortCriteria) {
      case "Price High to low":
        filteredProducts.sort(
          (a, b) =>
            Math.min(...b.type.map((t) => t.price)) -
            Math.min(...a.type.map((t) => t.price))
        );
        break;
      case "Price Low to high":
        filteredProducts.sort(
          (a, b) =>
            Math.min(...a.type.map((t) => t.price)) -
            Math.min(...b.type.map((t) => t.price))
        );
        break;
      case "Top Discount":
        break;
      case "Gadjet A - Z":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Gadjet Z - A":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }

  for (const [key, value] of Object.entries(selectedFilters)) {
    switch (key) {
      case "gadjet":
        filteredProducts = filteredProducts.filter(
          (product) => product.category === value
        );
        break;
      case "storage":
        filteredProducts = filteredProducts.filter((product) => {
          const storageValues =
            product.specs?.["Storage Capacity"]?.split(", ") || [];
          if (value === "2TB and above") {
            return storageValues.some((storage) =>
              ["2TB", "3TB", "4TB", "5TB"].includes(storage)
            );
          } else {
            return storageValues.includes(value);
          }
        });
        break;
      case "ram":
        filteredProducts = filteredProducts.filter(
          (product) => product.specs?.["RAM"] === value
        );
        break;
      case "connectivity":
        filteredProducts = filteredProducts.filter(
          (product) => product.specs && product.specs[value]
        );
        break;
      case "displayTech":
        filteredProducts = filteredProducts.filter(
          (product) => product.specs?.["Display Technologies"] === value
        );
        break;
      case "refreshRate":
        filteredProducts = filteredProducts.filter(
          (product) => product.specs?.["Screen refresh rate"] === value
        );
        break;
      case "os":
        filteredProducts = filteredProducts.filter((product) =>
          product.specs?.["Operating System"]?.startsWith(value)
        );
        break;
      case "cores":
        filteredProducts = filteredProducts.filter(
          (product) => product.specs?.["Processor cores"] === value
        );
        break;
      case "rating":
        filteredProducts = filteredProducts.filter((product) => {
          if (!product.reviews || product.reviews.length === 0) {
            return parseFloat(value) === 2; //  Temporary fix the ProducTypes "reviews - rating - user"  /images/
          }
          const avgRating =
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length;
          return avgRating === parseFloat(value);
        });
      case "releaseYear":
        filteredProducts = filteredProducts.filter(
          (product) => product.specs?.["Release year"] === value
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 972);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container>
      <div className="flex  w-full mt-4 gap-12 ">
        <div className="hidden md:flex  rounded-xl w-[20%]">
          <div className="p-3 font-medium">
            <div className="flex rounded-xl border-[0.8px] mb-2 items-center justify-between p-3">
              <span className="text-sm">FILTER</span>
              <span className="mr-1">
                <IoFilterSharp />
              </span>
            </div>
            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.gadjet
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({ ...prev, gadjet: !prev.gadjet }))
              }
            >
              Gadjet type
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.gadjet
                    ? "text-lime-500"
                    : openFilter.gadjet
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.gadjet && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="p-3 cursor-pointer rounded-xl hover:bg-stone-100"
                    onClick={() => handleOptionClick("gadjet", option.label)}
                  >
                    {splitWord(option.label)}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.storage
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({ ...prev, storage: !prev.storage }))
              }
            >
              Storage capacity
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.storage
                    ? "text-lime-500"
                    : openFilter.storage
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.storage && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {storageCapacity.map((option) => (
                  <div
                    key={option}
                    className="p-3 cursor-pointer rounded-xl  hover:bg-stone-100"
                    onClick={() => handleOptionClick("storage", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.ram
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  ram: !prev.ram,
                }))
              }
            >
              RAM capacity
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.ram
                    ? "text-lime-500"
                    : openFilter.ram
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.ram && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {ramCapacities.map((capacity) => (
                  <div
                    key={capacity}
                    className="p-3 cursor-pointer rounded-xl  hover:bg-stone-100"
                    onClick={() => handleOptionClick("ram", capacity)}
                  >
                    {capacity}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.connectivity
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  connectivity: !prev.connectivity,
                }))
              }
            >
              Connectivity options
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.connectivity
                    ? "text-lime-500"
                    : openFilter.connectivity
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.connectivity && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {connectivityOptions.map((option) => (
                  <div
                    key={option}
                    className="p-3 cursor-pointer rounded-xl hover:bg-stone-100"
                    onClick={() => handleOptionClick("connectivity", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.displayTech
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  displayTech: !prev.displayTech,
                }))
              }
            >
              Display technologies
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.displayTech
                    ? "text-lime-500"
                    : openFilter.displayTech
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.displayTech && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {displayTechnologies.map((tech) => (
                  <div
                    key={tech}
                    className="p-3 cursor-pointer  rounded-xl  hover:bg-stone-100"
                    onClick={() => handleOptionClick("displayTech", tech)}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.refreshRate
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  refreshRate: !prev.refreshRate,
                }))
              }
            >
              Screen refresh rate
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.refreshRate
                    ? "text-lime-500"
                    : openFilter.refreshRate
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.refreshRate && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {screenRefreshRates.map((rate) => (
                  <div
                    key={rate}
                    className="p-3 cursor-pointer  rounded-xl hover:bg-stone-100"
                    onClick={() => handleOptionClick("refreshRate", rate)}
                  >
                    {rate}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.os
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  os: !prev.os,
                }))
              }
            >
              Operating system
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.os
                    ? "text-lime-500"
                    : openFilter.os
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.os && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {operatingSystems.map((os) => (
                  <div
                    key={os}
                    className="p-3 cursor-pointer rounded-xl hover:bg-stone-100"
                    onClick={() => handleOptionClick("os", os)}
                  >
                    {os}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.cores
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  cores: !prev.cores,
                }))
              }
            >
              Processor cores
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.cores
                    ? "text-lime-500"
                    : openFilter.cores
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.cores && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {processorCores.map((core) => (
                  <div
                    key={core}
                    className="p-3 cursor-pointer  rounded-xl hover:bg-stone-100"
                    onClick={() => handleOptionClick("cores", core)}
                  >
                    {core}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.rating
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  rating: !prev.rating,
                }))
              }
            >
              Customer rating
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.rating
                    ? "text-lime-500"
                    : openFilter.rating
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.rating && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {customerRatings.map((rating) => (
                  <div
                    key={rating}
                    className="p-3 cursor-pointer rounded-xl hover:bg-stone-100"
                    onClick={() => handleOptionClick("rating", rating)}
                  >
                    {rating}
                  </div>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.releaseYear
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({
                  ...prev,
                  releaseYear: !prev.releaseYear,
                }))
              }
            >
              Release year
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.releaseYear
                    ? "text-lime-500"
                    : openFilter.releaseYear
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.releaseYear && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {releaseYears.map((year) => (
                  <div
                    key={year}
                    className="p-3 cursor-pointer  rounded-xl  hover:bg-stone-100"
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
              className={`flex items-center justify-between w-full p-3  cursor-pointer select-none ${
                openFilter.discount
                  ? "border-[0.8px] bg-stone-100 rounded-xl"
                  : "hover:bg-stone-100 rounded-xl "
              } `}
              onClick={() =>
                setOpenFilter((prev) => ({ ...prev, discount: !prev.discount }))
              }
            >
              Discount available
              <BsCircleFill
                size={8}
                className={`mr-2 transition-transform 
                ${
                  selectedFilters.discount
                    ? "text-lime-500"
                    : openFilter.discount
                    ? "text-rose-500"
                    : "text-stone-200"
                }`}
              />
            </div>

            {openFilter.discount && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {discountOptions.map((option) => (
                  <div
                    key={option}
                    className="p-3 cursor-pointer rounded-xl hover:bg-stone-100"
                    onClick={() => handleOptionClick("discount", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex  flex-col w-full md:w-[80%]">
          <div className="flex justify-between items-center">
            <div className="text-sm md:text-base  flex gap-1 md:gap-6">
              <div className="flex ml-1 items-center gap-3">
                <div
                  onClick={updateProducts}
                  className={`${
                    isButtonDisabled ? "cursor-not-allowed " : "cursor-pointer "
                  }`}
                >
                  <GrUpdate
                    className={`rotate-45 ${
                      isButtonDisabled ? "animate-pulse" : ""
                    }`}
                  />
                </div>

                <div className="cursor-default">
                  {filterLoading ? "Loading items..." : updatedTimeStr}
                </div>
              </div>
              <div className="select-none font-semibold">
                {filteredProducts.length} items
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div 
                 
                 className=" px-2 py-2 md:hidden border rounded-xl dark:ring-stone-50 outline-none font-semibold ">
                <IoFilterSharp size={24} />
              </div>

              <SortByLevels
                currentSort={sortCriteria}
                setSort={setSortCriteria}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(selectedFilters).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-wrap items-center bg-stone-100 rounded-xl py-2 px-3 select-none space-x-2 font-semibold"
              >
                <span>{splitWord(value)}</span>
                <button
                  onClick={() => removeFilter(key)} // Pass the filter type to the removeFilter function
                  className="py-1 rounded-full"
                >
                  <IoCloseSharp className="text-black" size={19} />
                </button>
              </div>
            ))}
            {Object.keys(selectedFilters).length > 1 && (
              <button
                onClick={clearAllFilters}
                className="flex flex-wrap items-center bg-stone-100 hover:bg-stone-200 transition ease-in-out duration-150 rounded-xl py-2 px-3 select-none space-x-2 font-semibold"
              >
                <MdOutlineFilterListOff className="text-rose-500" size={24} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 z-10 mt-3 md:mt-5 relative">
            {filteredProducts.length === 0 ? (
              <div className="text-center w-full">
                <Image
                  src="/images/productNotAdded.svg"
                  alt="No products found"
                  width={400}
                  height={400}
                  className="mx-auto"
                  priority={false}
                />
                <p className="mt-2">
                  No products found for the selected filters.
                </p>
              </div>
            ) : filterLoading ? (
              Array(filteredProducts.length)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl shadow-md overflow-hidden"
                    style={{ borderRadius: "0.75rem" }}
                  >
                    <Skeleton
                      width={226}
                      height={240}
                      style={{
                        borderTopLeftRadius: "0.75rem",
                        borderTopRightRadius: "0.75rem",
                      }}
                    />
                    <div className="relative p-3 space-y-2">
                      <div className="relative">
                        <Skeleton height={16} width={102} />
                      </div>
                      <div className="relative">
                        <Skeleton height={12} width={24} />
                      </div>
                      <div className="h-1"></div>
                      <div className="relative space-y-1">
                        <Skeleton height={16} width={74} />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton height={12} width={54} />
                        <Skeleton height={12} width={54} />
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative rounded-xl border  group overflow-hidden shadow-md   "
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square overflow-hidden relative   sm:h-60 sm:w-56">
                      {product.images &&
                        product.images[0] &&
                        product.images[0].image && (
                          <Image
                            src={product.images[0].image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain  p-2 group-transition-transform duration-300 ease-in-out transform group-hover:scale-110 cursor-pointer"
                            priority={false}
                          />
                        )}
                    </div>
                  </Link>
                  <div className="text-sm md:text-base relative p-3 space-y-2">
                    <div className="cursor-default">
                      {isSmallScreen
                        ? formatStr(product.name)
                        : formatBrowseStr(product.name)}
                    </div>

                    <div className="text-xs cursor-default">
                      Model:{" "}
                      {product.specs && Object.values(product.specs?.Model)}
                    </div>
                    <div className="flex flex-row items-center space-x-2 cursor-default">
                      <div className="text-xs">Theme:</div>
                      {product.images?.map((image, index) => (
                        <div
                          key={index}
                          className="flex flex-row space-x-2 h-2 w-2 md:h-4 md:w-4 rounded-full"
                          style={{ backgroundColor: image.colorCode }}
                        ></div>
                      ))}
                    </div>
                    <div className="cursor-default">
                      {formatUSDWithComma(product.type[0].price)}
                    </div>
                    <div className="flex justify-between items-center my-2 flex-row text-center cursor-default">
                      <Rating
                        sx={{ fontSize: "0.8rem" }}
                        value={product.reviews?.[0]?.rating || 2}
                        readOnly
                      />
                      <span
                        className={`${productRating} items-center space-x-1`}
                      >
                        review
                        <strong className="text-rose-500 ml-1">
                          {product.reviews?.length}
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center content-center overflow-hidden h-10 cursor-pointer absolute -bottom-10 rounded-t-full w-56 bg-rose-600 z-20 group-hover:-translate-y-10 transition-transform">
                    <div className="text-center h-full flex items-center justify-center w-[70%] border-r-[1px] border-white hover:bg-rose-500">
                      <p className="text-sm font-semibold text-white">
                        Buy now
                      </p>
                    </div>
                    <div
                      className="w-[30%]  h-full flex items-center justify-center pr-2 hover:bg-rose-500"
                      onClick={() => {
                        handleAddProductToType({
                          id: product.id,
                          name: product.name,
                          case: product.case,
                          description: product.description,
                          category: product.category,
                          brand: product.brand,
                          images: product.images,
                          selectedImg: product.images[0] || null,
                          quantity: 1,
                          type: product.type,
                          reviews: product.reviews,
                          specs: product.specs,
                        });
                      }}
                    >
                      <MdOutlineShoppingCart size={22} className="text-white" />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      handleAddPinnedProductToType({
                        id: product.id,
                        name: product.name,
                        case: product.case,
                        description: product.description,
                        category: product.category,
                        brand: product.brand,
                        images: product.images,
                        selectedImg: product.images[0] || null,
                        quantity: 1,
                        type: product.type,
                        reviews: product.reviews,
                        specs: product.specs,
                      });
                    }}
                    className="absolute   cursor-pointer text-white r -top-11 -right-11 h-12 w-12 bg-rose-600 rounded-l-full  rounded-t-none group-hover:translate-y-11 group-hover:-translate-x-11  transition-transform hover:bg-rose-500"
                  >
                    <div className="relative">
                      <AiOutlinePushpin
                        className="absolute z-10 right-2 -bottom-[26px]"
                        size={18}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Brand;
