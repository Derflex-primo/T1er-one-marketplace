"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { Michroma } from "next/font/google";
import Container from "../Container";
import LogInPage from "@/app/auth/Login";
import Drop from "../dropTrade-ui/Drop";
import Trade from "../dropTrade-ui/Trade";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { useSearch } from "@/providers/SearchContext";
import { LoadingContext } from "@/providers/LoadingProvider";
import Fuse from "fuse.js";
import { useProducts } from "@/hooks/useProducts";
import { ProductTypes } from "@/types";
import {
  formatModel,
  formatPinnedStr,
  formatUSDWithComma,
} from "@/lib/utils/formats";
import CircularProgress from "@mui/material/CircularProgress";

const NavBar = () => {
  const { setSearchTerm, searchTerm } = useSearch();
  const { products } = useProducts();
  const { setIsLoading, isLoading } = useContext(LoadingContext);
  const [search, setSearch] = useState("");
  const enterPressedLinkRef = useRef<HTMLAnchorElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const fuse = new Fuse(products, {
    keys: ["name", "description", "category", "brand"],
    includeScore: true,
    threshold: 0.2,
  });

  const filteredProductsBy_Search: ProductTypes[] = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : products;

  const changedBackground = () => {
    if (window.scrollY >= 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    if (searchTerm.trim() !== "") {
      setSearchTerm(searchTerm.trim()); // Update search term in context
      setIsLoading(true);
      // Simulate a delay for fetching search results
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Adjust time as needed
    } else {
      setSearchTerm(""); // Clear search term in context
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && search.trim() && enterPressedLinkRef.current) {
      enterPressedLinkRef.current.click();
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchTerm("");
  };

  useEffect(() => {
    window.addEventListener("scroll", changedBackground);

    return () => {
      window.removeEventListener("scroll", changedBackground);
    };
  }, []);

  return (
    <div
      className={`
    sticky 
    top-0 
    w-full 
    z-40 
    ${scrolled ? "bg-gradient-to-r  bg-rose-700 text-white" : ""}
    transition-colors duration-300
    overflow-visible
  `}
    >
      <div className={`py-4 ${scrolled ? "" : " "}`}>
        <Container>
          <div
            className="
        flex
        flex-row
        items-center
        justify-between
        gap-3
        md:gap-0
        "
          >
            <div className="flex w-80  justify-between items-center">
              <Link
                href="/"
                className={`cursor-pointer   
                
            `}
              >
                <Image
                  src={
                    scrolled
                      ? "/images/tierOneLogoWhite.svg"
                      : "/images/tierOneLogo.svg"
                  }
                  alt="Tier One logo"
                  width={115}
                  height={115}
                  priority
                  quality={100}
                  className="object-contain focus:outline-none"
                />
              </Link>
              <hr className="hidden sm:inline border-[0.8px] h-8 " />
              <div className="hidden sm:flex items-center gap-4 text-base cursor-pointer font-semibold">
                <Link href={`/components/fallback-ui`}>
                  <Drop />
                </Link>
                <Link href={`/components/fallback-ui`}>
                  <Trade />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex flex-grow relative ml-10 mx-4 ">
              <IoSearch
                className={`absolute  z-40 left-3 top-1/2 transform -translate-y-1/2 
              
                `}
              />

              <div
                className={`cursor-pointer z-40 shadow-xs text-stone-900 absolute p-2 rounded-lg bg-stone-300 right-3 top-1/2 transform -translate-y-1/2 ${
                  scrolled
                    ? " backdrop-blur-md bg-white bg-opacity-20 text-white "
                    : ""
                }
              `}
              >
                {search ? (
                  <IoCloseSharp size={14} onClick={clearSearch} />
                ) : (
                  <BsThreeDotsVertical size={14} />
                )}
              </div>
              <label htmlFor="searchProducts" className="sr-only">
                Search Products
              </label>
              <div style={{ display: "none" }}>
                <Link
                  href={`/product/${search}`}
                  ref={enterPressedLinkRef}
                ></Link>
              </div>
              <span className="relative flex-grow">
                <input
                  value={search}
                  id="searchProducts"
                  className={`
                w-full pl-10 py-3 bg-stone-100 rounded-xl md:block focus:outline-none focus:ring-[0.6px] 
                 ${
                   scrolled
                     ? "text-white   backdrop-blur-md bg-white bg-opacity-20 focus:ring-white hover:bg-stone-900 hover:backdrop-blur-md hover:bg-opacity-20  trasition ease-in-out duration-150"
                     : "text-black placeholder-stone-800 focus:ring-stone-900 hover:bg-stone-200 bg-stone-100 trasition ease-in-out duration-150 "
                 }
                `}
                  type="text"
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search"
                />
                {search && filteredProductsBy_Search.length > 0 && (
                  <div className="absolute mt-4 z-50 bg-white shadow-md border-[0.8px] rounded-xl max-h-[300px] overflow-auto w-full">
                    {isLoading ? ( 
                      <div className="animate-pulse p-7 flex justify-center ">
                        <CircularProgress size={26} color="inherit"/>
                      </div>
                    ) : (
                      filteredProductsBy_Search.map((product, index) => (
                        <div
                          key={index}
                          className="border-b-[0.8px] hover:bg-stone-100 cursor-pointer"
                        >
                          <Link
                            onClick={clearSearch}
                            href={`/products/${product.id}`}
                            className="p-3  flex flex-row justify-between text-stone-900  items-center space-x-4 "
                          >
                            <div className="flex flex-row   items-center space-x-4 ">
                              <div className="p-1 ">
                                <Image
                                  src={product.images[0].image || ""}
                                  alt={product.name || "product image"}
                                  width={36}
                                  height={36}
                                  className=" rounded"
                                />
                              </div>
                              <div className="flex flex-col content-center gap-1">
                                <span className="text-sm font-semibold  ">
                                  {formatPinnedStr(product.name)}
                                </span>
                                <span className="flex flex-row items-center space-x-2">
                                  <span className="text-sm">
                                    {product.specs &&
                                      Object.values(
                                        formatModel(product.specs?.Model)
                                      )}
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-row space-x-4">
                              {product.images?.map((image, index) => (
                                <div
                                  key={index}
                                  className="flex flex-row space-x-2 h-2 w-2   rounded-full"
                                  style={{ backgroundColor: image.colorCode }}
                                ></div>
                              ))}
                            </div>
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </span>
            </div>
            <LogInPage />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
