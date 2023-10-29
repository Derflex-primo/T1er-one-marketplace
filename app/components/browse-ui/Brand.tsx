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
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from "@/hooks/useCart";
import { FiChevronDown } from "react-icons/fi";

//  ADD PINNED AND ADD TO CART AND BUY NOW

const Brand: React.FC<BrowseProps> = ({ products }) => {
  const { handleAddProductToType } = useCart();

  const [sortCriteria, setSortCriteria] =
    useState<Options>("Price High to low");
  const [isLoading, setIsLoading] = useState(false);
  const [lastButtonPress, setLastButtonPress] = useState<Date | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
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
    setSelectedFilters((prev) => ({ ...prev, [type]: value }));
  };

  const removeFilter = (type: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[type as keyof typeof newFilters];
      return newFilters;
    });
  };

  const updateProducts = () => {
    if (
      lastButtonPress &&
      new Date().getTime() - lastButtonPress.getTime() < 10000
    ) {
      // Prevents update if it's been less than 10 seconds since the last button press
      return;
    }

    setIsLoading(true);
    setUpdatedTimeStr("Updated just now"); // Set the text immediately when the user clicks the update

    // Simulate a loading delay. You can replace this with your actual product update logic.
    setTimeout(() => {
      setIsLoading(false);
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
      case "gadget":
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

  return (
    <Container>
      <div className="flex w-full mt-4 gap-12">
        <div className="  rounded-xl w-[20%]">
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
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.gadjet ? "rotate-180" : ""
                }`}
              />
            </div>

            {openFilter.gadjet && (
              <div className="mb-2 p-3 shadow-2xl rounded-2xl border-[0.8px] mt-2 w-full bg-white  ease-in-out duration-300 select-none">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="p-3 cursor-pointer rounded-xl hover:bg-stone-100"
                    onClick={() => handleOptionClick("gadget", option.label)}
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
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.storage ? "rotate-180" : ""
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
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.ram ? "rotate-180" : ""
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
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.connectivity ? "rotate-180" : ""
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
              Display Technologies
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.displayTech ? "rotate-180" : ""
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
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.refreshRate ? "rotate-180" : ""
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
              Operating System
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.os ? "rotate-180" : ""
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
              Processor Cores
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.cores ? "rotate-180" : ""
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
              Customer Rating
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.rating ? "rotate-180" : ""
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
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.releaseYear ? "rotate-180" : ""
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
              <FiChevronDown
                className={`h-5 w-5 ml-3 text-stone-900 transition-transform ${
                  openFilter.discount ? "rotate-180" : ""
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
        <div className="flex flex-col w-[80%]">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="flex items-center gap-3">
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
                  {isLoading ? "Loading items..." : updatedTimeStr}
                </div>
              </div>
              <div className="select-none font-semibold">
                {filteredProducts.length} items
              </div>
            </div>
            <div>
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
                  className="px-2 py-1 rounded-full"
                >
                  <IoCloseSharp className="text-black" size={19} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 z-10 mt-5 relative">
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
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative rounded-xl border  group overflow-hidden   shadow-md "
                >
                  <div className="relative z-0 h-60 w-56">
                    {product.images &&
                      product.images[0] &&
                      product.images[0].image && (
                        <Image
                          src={product.images[0].image}
                          alt={product.name}
                          fill
                          sizes="100%"
                          className="object-contain p-3 group-transition-transform duration-300 ease-in-out transform group-hover:scale-110 cursor-pointer"
                          priority={false}
                        />
                      )}
                  </div>
                  <div className="relative p-3 space-y-2">
                    <div className="cursor-default">
                      {formatBrowseStr(product.name)}
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
                          className="flex flex-row space-x-2 h-4 w-4 rounded-full"
                          style={{ backgroundColor: image.colorCode }}
                        ></div>
                      ))}
                    </div>
                    <div className="cursor-default">
                      {formatUSDWithComma(product.type[0].price)}
                    </div>
                    <div className="flex justify-between items-center my-2 flex-col md:flex-row text-center cursor-default">
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
                        });
                      }}
                    >
                      <MdOutlineShoppingCart size={22} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute   cursor-pointer text-white r -top-11 -right-11 h-12 w-12 bg-rose-600 rounded-l-full  rounded-t-none group-hover:translate-y-11 group-hover:-translate-x-11  transition-transform hover:bg-rose-500">
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
