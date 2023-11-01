"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Michroma } from "next/font/google";
import Container from "../Container";
import LogInPage from "@/app/auth/Login";
import Drop from "../dropTrade-ui/Drop";
import Trade from "../dropTrade-ui/Trade";
import { SlMenu } from "react-icons/sl";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useProducts } from "@/hooks/useProducts";
import splitWord from "@/lib/utils/formats";
import Pinned from "./Pinned";
import Image from "next/image";
import SortBrowse from "../browse-ui/SortBrowse";

// FIX BROWSE MODAL

const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  const [browseType, setBrowseType] = useState<string | null>(null);

  const { products } = useProducts();

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

  const handleBrowseClick = (type: string) => {
    setBrowseType(type);
    handleOpenBrowse();
  };

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openBrowse, setOpenBrowse] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenBrowse = () => setOpenBrowse(true);

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

  const browseRef = useRef<HTMLDivElement | null>(null);

  const style = {
    position: "absolute" as "absolute",
    top:
      (browseRef.current
        ? browseRef.current.offsetTop + browseRef.current.offsetHeight
        : 0) + 12,
    left: browseRef.current ? browseRef.current.offsetLeft : 0,
    width: 168,
    bgcolor: "background.paper",
    boxShadow: 16,
    border: "2px",
    borderRadius: "12px",
    overflow: "hidden",
    outline: "none",
    "& .MuiTypography-root": {
      fontSize: "14px",
    },
    padding: "12px",
  };

  const styleBox = {
    position: "absolute" as "absolute",
    top:
      (browseRef.current
        ? browseRef.current.offsetTop + browseRef.current.offsetHeight
        : 0) + 12,
    left: browseRef.current ? browseRef.current.offsetLeft + 180 : 180,
    width: 168,
    bgcolor: "background.paper",
    boxShadow: 16,
    border: "2px",
    borderRadius: "12px",
    overflow: "hidden",
    outline: "none",
    "& .MuiTypography-root": {
      fontSize: "14px",
    },
    zIndex: 9999,
  };

  return (
    <div
      className={`
    sticky 
    top-0 
    w-full 
    z-40 
    shadow-sm 
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
        items-center
        justify-between
        gap-3
        md:gap-0
        "
          >
            <div className="flex items-center md:hidden overflow-hidden">
              <Link
                href="/"
                className={`${michroma.className} text-lg font-semibold`}
              >
                T1
              </Link>
            </div>
            <div className="hidden md:flex w-80  justify-between items-center">
              <Link
                href="/"
                className={`cursor-pointer   
                
            `}
              >
                {scrolled ? (
                  <Image
                    src="/images/tierOneLogoWhite.svg"
                    alt="Tier One logo"
                    width={115}
                    height={115}
                  />
                ) : (
                  <Image
                    src="/images/tierOneLogo.svg"
                    alt="Tier One logo"
                    width={115}
                    height={115}
                  />
                )}
              </Link>
              <hr className="inline border-[0.8px] h-8 " />
              <div className="flex items-center gap-4 text-base cursor-pointer font-semibold">
                <Drop />
                <Trade />
              </div>
            </div>
            <div className="flex flex-grow relative ml-10 mx-4 md:block ">
              <IoSearch
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  scrolled ? "text-white" : "text-black"
                }`}
              />

              <div
                className={`cursor-pointer shadow-xs text-stone-900 absolute p-2 rounded-lg bg-stone-300 right-3 top-1/2 transform -translate-y-1/2 ${
                  scrolled
                    ? " backdrop-blur-md bg-white bg-opacity-20 text-white "
                    : ""
                }
              `}
              >
                <BsThreeDotsVertical size={14} />
              </div>
              <label htmlFor="searchProducts" className="sr-only">
                Search Products
              </label>
              <input
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
                placeholder="Search for products, Shops, Accounts"
              />
            </div>

            <LogInPage />
          </div>
        </Container>
      </div>
      {!scrolled && (
        <div className="px-8 shadow-t-lg shadow-rose-600">
          <div className="flex flex-row  py-2 justify-between">
            <div className="flex flex-row gap-4  ">
              {/* <div
                ref={browseRef}
                onClick={() => {
                  if (open) {
                    handleClose();
                  } else {
                    handleOpen();
                  }
                }}
                className={`cursor-pointer z-96 flex flex-row items-center space-x-2  text-sm  hover:bg-stone-100  p-3 transition ease-in-out duration-150 rounded-xl ${
                  open ? "select-none" : ""
                }`}
              >
                {open ? <IoCloseSharp size={18} /> : <SlMenu size={18} />}
                <span className="text-sm  font-bold">Browse</span>
              </div>

              <Modal
                open={open}
                onClose={handleClose}
                slotProps={{
                  backdrop: { style: { backgroundColor: "transparent" } },
                }}
                aria-labelledby="modal-modal-browse"
                aria-describedby="modal-modal-items"
              >
                <Box sx={style}>
                  <Typography component="div" id="modal-modal-browse">
                    <div className="text-sm cursor-pointer text-stone-900 rounded-lg px-4 py-3 border-non focus:outline-none  font-semibold  outline-none  hover:bg-stone-100">
                      Deals
                    </div>
                  </Typography>
                  <Typography component="div" id="modal-modal-browse">
                    <div className="text-sm  cursor-pointer text-stone-900 rounded-lg px-4 py-3 border-non focus:outline-none font-semibold  outline-none  hover:bg-stone-100">
                      Shops
                    </div>
                  </Typography>
                  <Typography component="div" id="modal-modal-browse">
                    <div
                      onClick={() => handleBrowseClick("Brands")}
                      className="text-sm  cursor-pointer text-stone-900 rounded-lg px-4 py-3 border-non focus:outline-none font-semibold  outline-none  hover:bg-stone-100"
                    >
                      Brands
                    </div>
                  </Typography>
                  <Typography component="div" id="modal-modal-browse">
                    <div
                      onClick={() => handleBrowseClick("Categories")}
                      className="text-sm  cursor-pointer text-stone-900 rounded-lg px-4 py-3 border-non focus:outline-none font-semibold  outline-none  hover:bg-stone-100"
                    >
                      Categories
                    </div>
                  </Typography>
                </Box>
              </Modal>
              <Modal
                open={openBrowse}
                onClose={() => setOpenBrowse(false)}
                slotProps={{
                  backdrop: { style: { backgroundColor: "transparent" } },
                }}
                aria-labelledby="modal-modal-brandsFeatured"
                aria-describedby="modal-modal-brandItems"
              >
                {browseType === "Brands" ? (
                  <Box sx={styleBox}>
                    {uniqueBrands.map((brand) => (
                      <>
                       <p className="text-xs">absolute Nov/4/23</p>
                        <Typography
                          component="div"
                          id="modal-modal-brandsFeatured"
                        >
                          <Link href={`/product/${brand}`}>
                            <div
                              key={brand}
                              onClick={() => {
                                setOpenBrowse(false);
                                setOpen(false);
                              }}
                              className="p-4  text-xs cursor-pointer hover:bg-stone-100 overflow-hidden"
                            >
                              {splitWord(brand)}
                            </div>
                          </Link>
                        </Typography>
                        <Typography component="div">
                          <hr />
                        </Typography>
                      </>
                    ))}
                  </Box>
                ) : (
                  <Box sx={styleBox}>
                    {uniqueCategories.sort().map((category) => (
                      <>
                       <p className="text-xs">absolute Nov/4/23</p>
                        <Typography
                          component="div"
                          id="modal-modal-brandsFeatured"
                        >
                          <Link href={`/product/${category}`}>
                            <div
                              key={category}
                              onClick={() => {
                                setOpenBrowse(false);
                                setOpen(false);
                              }}
                              className="p-4  text-xs cursor-pointer hover:bg-stone-100 overflow-hidden"
                            >
                              {splitWord(category)}
                            </div>
                          </Link>
                        </Typography>
                        <Typography component="div">
                          <hr />
                        </Typography>
                      </>
                    ))}
                  </Box>
                )}
              </Modal> */}

              <SortBrowse />

              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl  hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Monthly Deals
              </Link>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl  hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Gift cards
              </Link>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Top rated
              </Link>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
              >
                New Arrivals
              </Link>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Pre orders
              </Link>
            </div>
            <div className="flex flex-row gap-2">
              <div className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150">
                <Pinned />
              </div>
              <Link
                href={""}
                className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
