"use client";

import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { useEffect, useState, useContext, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdWallet } from "react-icons/md";
import CartCount from "../components/nav-ui/CartCount";
import { useAuth } from "@/hooks/useAuth";
import Profile from "../components/user-infos-ui/Profile";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { useSearch } from "@/providers/SearchContext";
import { LoadingContext } from "@/providers/LoadingProvider";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { useProducts } from "@/hooks/useProducts";
import Fuse from "fuse.js";
import { ProductTypes } from "@/types";
import Image from "next/image";
import {
  formatModel,
  formatPinnedStr,
  formatUSDWithComma,
} from "@/lib/utils/formats";
// PROFILE ADDRESS -  TIER ONE FIREBASE

interface LogInPageProps {}

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { 
    xs: "90%", // Full width for very small devices
    sm: "80%", // Slightly smaller for small devices
    md: "70%", // And so on...
    lg: "40%",
    xl: "40%",
    "2xl": "40%"  
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 4,
  borderRadius: "16px",
  outline: "none",
};
const LogInPage: React.FC<LogInPageProps> = () => {
  const { user, signInWithGoogle, handleSignOut } = useAuth();
  const { setIsLoading, isLoading } = useContext(LoadingContext);
  const { setSearchTerm, searchTerm } = useSearch();
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [authing, setAuthing] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const enterPressedLinkRef = useRef<HTMLAnchorElement>(null);
  const handleSearchModalOpen = () => setSearchModalOpen(true);
  const handleSearchModalClose = (
    event: React.MouseEvent | React.TouchEvent
  ) => {
    event.stopPropagation();
    setSearchModalOpen(false);
  };
  const fuse = new Fuse(products, {
    keys: ["name", "description", "category", "brand"],
    includeScore: true,
    threshold: 0.2,
  });

  const filteredProductsBy_Search: ProductTypes[] = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : products;

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
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchModalClose(event as unknown as React.MouseEvent);
      if (searchModalOpen) {
        // Close the search modal
        setSearchModalOpen(false);
        // If there is a search term, navigate to the search page
        if (search.trim() !== "") {
          if (enterPressedLinkRef.current) {
            enterPressedLinkRef.current.click();
          }
        }
      }
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchTerm("");
  };

  const changedBackground = () => {
    if (window.scrollY >= 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changedBackground);

    return () => {
      window.removeEventListener("scroll", changedBackground);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`flex items-center gap-3 ${scrolled ? "text-white" : ""} `}>
      <div className="flex items-center">
        <div
          onClick={handleSearchModalOpen}
          className={`flex md:hidden items-center space-x-4 rounded-xl  py-4 px-4 cursor-pointer ${
            scrolled
              ? "md:backdrop-blur-md md:bg-white bg-opacity-20 md:hover:bg-stone-900 md:hover:backdrop-blur-md hover:bg-opacity-20  transition ease-in-out duration-150"
              : "md:hover:bg-stone-200 md:bg-stone-100 transition ease-in-out duration-150 "
          }`}
        >
          <IoSearch
            size={26}
            className={` ${scrolled ? "text-white" : "text-black"}`}
          />
          <div style={{ display: "none" }}>
            <Link
              onClick={(event) => handleSearchModalClose(event)}
              href={`/product/${search}`}
              ref={enterPressedLinkRef}
            ></Link>
          </div>
          {searchModalOpen && (
            <div className="fixed top-0 right-0 w-full h-screen bg-black bg-opacity-50 z-50">
              <div className="sticky p-3 h-20 top-0 border-b-[0.8px] bg-white flex justify-between w-full items-center ">
                <div className="flex w-full justify-between items-center text-stone-900">
                  <div className="flex items-center ">
                    <FiChevronDown
                      onClick={(event) => handleSearchModalClose(event)}
                      size={26}
                      className="rotate-90"
                    />
                    <input
                      type="text"
                      value={search}
                      onKeyPress={handleKeyPress}
                      onChange={handleSearchChange}
                      className="p-2 w-full focus:outline-none"
                      placeholder="Search"
                    />
                  </div>
                  {search && (
                    <button onClick={handleClearSearch}>
                      <IoCloseSharp size={19} />
                    </button>
                  )}
                </div>
              </div>
              {search && (
                <div className="bg-white">
                  {isLoading ? (
                    <div className="flex justify-center z-40 p-6">
                      <CircularProgress size={10} color="inherit" />
                    </div>
                  ) : (
                    filteredProductsBy_Search.map((product, index) => (
                      <div key={index}>
                        <div className="p-3 flex flex-row justify-between text-stone-900  items-center space-x-4 ">
                          <Link
                            onClick={(event) => handleSearchModalClose(event)}
                            href={`/products/${product.id}`}
                            className="flex flex-row   items-center space-x-4 "
                          >
                            <div className="p-1  rounded-xl">
                              <Image
                                src={product.images[0].image || ""}
                                alt={product.name || "product image"}
                                width={36}
                                height={36}
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
                                <div
                                  className="space-x-2 h-4 w-4 rounded-full"
                                  style={{
                                    backgroundColor:
                                      product.images[0].colorCode,
                                  }}
                                ></div>
                              </span>
                            </div>
                          </Link>
                          <div className="pl-8 text-sm  ">
                            {formatUSDWithComma(product.type[0].price)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <span
          onClick={handleOpen}
          className={`flex items-center space-x-4 rounded-l-xl  md:pr-3 py-3 px-3 cursor-pointer ${
            scrolled
              ? "backdrop-blur-md md:bg-white md:bg-opacity-20 md:hover:bg-stone-900 md:hover:backdrop-blur-md md:border-r md:hover:bg-opacity-20 transition ease-in-out duration-150"
              : "hover:bg-stone-200 md:bg-stone-100 transition ease-in-out duration-150 md:border-r"
          } ${user ? "hidden md:flex" : "flex"}`}  
        >
          <MdWallet size={26} />
          <button className="hidden md:flex font-semibold">Login</button>
        </span>
        <span className={`flex ${!user ? "hidden md:flex" : "flex md:flex"}`}>
          <Profile connectWallet={handleOpen} scrolled={scrolled} />
        </span>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box sx={style}>
          <Typography
            component="div"
            id="modal-modal-title"
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {user ? (
              <span className="text-green-500">Connected</span>
            ) : (
              <span>Connect your account</span>
            )}
          </Typography>
          <Typography
            component="div"
            id="modal-modal-description"
            sx={{
              mt: 2,
              mb: 2,
              px: 4,
              fontSize: "16px",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            <span>
              {" "}
              If you don&apos;t have a account, you can select provider and
              create one.{" "}
            </span>
            <span className="text-sky-500">Learn more</span>
          </Typography>
          <Typography component="div">
            <hr />
          </Typography>
          <Typography component="div">
            <div
              onClick={() => signInWithGoogle()}
              className="flex px-6 justify-between items-center cursor-pointer hover:bg-stone-100 py-4"
            >
              <span className="flex space-x-4 font-semibold">
                <FcGoogle size={24} /> <span>Google</span>
              </span>
              <span className="text-stone-600 text-xs font-semibold">
                POPULAR
              </span>
            </div>
          </Typography>
          <Typography component="div" sx={{ textAlign: "center", mb: 2 }}>
            <hr className="pb-4" />
            <strong>Show more</strong>
          </Typography>
        </Box>
      </Modal>
      <div
        className={`px-2 py-2 rounded-xl cursor-pointer ${
          scrolled
            ? "backdrop-blur-md bg-white bg-opacity-20 hover:bg-stone-900 hover:backdrop-blur-md hover:bg-opacity-20  trasition ease-in-out duration-150"
            : "hover:bg-stone-200 bg-stone-100 trasition ease-in-out duration-150 "
        }`}
      >
        <CartCount />
      </div>
    </div>
  );
};

export default LogInPage;
