"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Michroma } from "next/font/google";
import Container from "../Container";
import LogInPage from "@/app/auth/Login";
import Drop from "../dropTrade-ui/Drop";
import Trade from "../dropTrade-ui/Trade";
import { SlMenu } from "react-icons/sl";
import { AiOutlinePushpin } from "react-icons/ai";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useProducts } from "@/hooks/useProducts";

// Finish Browse

const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  const { products } = useProducts();

  const uniqueBrands = Array.from(
    new Set(products.map((product) => product.brand))
  );

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openBrowse, setOpenBrowse] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenBrowse = () => setOpenBrowse(true);
  const handleClose = () => setOpen(false);

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
    boxShadow: 24,
    border: "2px",
    borderRadius: "12px",
    overflow: "hidden",
    outline: "none",
    "& .MuiTypography-root": {
      fontSize: "14px",
    },
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
    boxShadow: 24,
    border: "2px",
    borderRadius: "12px",
    overflow: "hidden",
    outline: "none",
    "& .MuiTypography-root": {
      fontSize: "14px",
    },
  };

  return (
    <div
      className={`
    sticky 
    top-0 
    w-full 
    z-30 
    shadow-sm 
    ${scrolled ? "bg-gradient-to-r  bg-rose-700 text-white" : ""}
    transition-colors duration-300
  `}
    >
      <div className={`py-4 ${scrolled ? "" : "border-b-[1px]"}`}>
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
            <div className="flex items-center md:hidden">
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
                className={`${michroma.className} text-lg font-semibold`}
              >
                T1er One
              </Link>
              <hr className="inline border-[1.4px] h-8" />
              <div className="flex gap-12 text-base font-semibold">
                <Drop />
                <Trade />
              </div>
            </div>
            <div className="flex flex-grow relative ml-10 mx-4 md:block">
              <IoSearch
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  scrolled ? "text-white" : "text-black"
                }`}
              />

              <div
                className={`cursor-pointer shadow-xs text-stone-900 absolute p-2 rounded-lg bg-stone-300 right-3 top-1/2 transform -translate-y-1/2 ${
                  scrolled
                    ? " backdrop-blur-md bg-white bg-opacity-20 text-white"
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
                w-full pl-10 py-3 border rounded-xl md:block focus:outline-none focus:ring-[0.6px] 
                 ${
                   scrolled
                     ? "text-white   backdrop-blur-md bg-white bg-opacity-20 focus:ring-white"
                     : "text-black placeholder-stone-800 focus:ring-stone-900"
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
        <Container>
          <div className="flex flex-row  py-2 justify-between">
            <div className="flex flex-row gap-8  ">
              <div
                ref={browseRef}
                onClick={() => {
                  if (open) {
                    handleClose();
                  } else {
                    handleOpen();
                  }
                }}
                className={`cursor-pointer z-96 flex flex-row items-center space-x-2 ${
                  open ? "select-none" : ""
                }`}
              >
                {open ? <IoCloseSharp size={18} /> : <SlMenu size={18} />}
                <span className="text-sm font-semibold">Browse</span>
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
                    <div className="p-4 cursor-pointer hover:bg-stone-100 overflow-hidden">
                      Deals
                    </div>
                  </Typography>
                  <Typography component="div">
                    <hr />
                  </Typography>
                  <Typography component="div" id="modal-modal-browse">
                    <div className="p-4 cursor-pointer hover:bg-stone-100">
                      Shops
                    </div>
                  </Typography>
                  <Typography component="div">
                    <hr />
                  </Typography>
                  <Typography component="div" id="modal-modal-browse">
                    <div
                      onClick={handleOpenBrowse}
                      className="p-4 cursor-pointer hover:bg-stone-100 overflow-hidden"
                    >
                      Brands
                    </div>
                  </Typography>
                  <Typography component="div">
                    <hr />
                  </Typography>
                  <Typography component="div" id="modal-modal-browse">
                    <div
                      onClick={handleOpenBrowse}
                      className="p-4 cursor-pointer hover:bg-stone-100 overflow-hidden"
                    >
                     Categories
                    </div>
                  </Typography>
                </Box>
              </Modal>
              <Modal
                open={openBrowse} // State to control the Brands modal
                onClose={() => setOpenBrowse(false)}
                slotProps={{
                  backdrop: { style: { backgroundColor: "transparent" } },
                }}
                aria-labelledby="modal-modal-brandsFeatured"
                aria-describedby="modal-modal-brandItems"
              >
                <Box sx={styleBox}>
                  {uniqueBrands.map((brand) => (
                    <>
                      <Typography
                        component="div"
                        id="modal-modal-brandsFeatured"
                      >
                        <div
                          key={brand}
                          className="p-4 cursor-pointer hover:bg-stone-100 overflow-hidden"
                        >
                          {brand}
                        </div>
                      </Typography>
                      <Typography component="div">
                        <hr />
                      </Typography>
                    </>
                  ))}
                </Box>
              </Modal>

              <Link href={""} className="text-sm font-semibold">
                Monthly Deals
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Gift cards
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Top rated
              </Link>
              <Link href={""} className="text-sm font-semibold">
                New Arrivals
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Pre orders
              </Link>
            </div>
            <div className="flex flex-row gap-8">
              <Link
                href={""}
                className="flex flex-row items-center space-x-1 text-sm font-semibold"
              >
                <AiOutlinePushpin size={18} />
                <span>Pinned</span>
              </Link>
              <Link href={""} className="text-sm font-semibold">
                Support
              </Link>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default NavBar;
