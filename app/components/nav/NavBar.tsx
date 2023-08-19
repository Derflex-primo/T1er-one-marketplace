"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Michroma } from "next/font/google";
import Container from "../Container";
import PiShoppingBagOpenThin from "./CartCount";
import { UserAuth } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import SkeletonLoading from "../SkeletonLoading";
import { Modal, Box, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { MdWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const michroma = Michroma({ subsets: ["latin"], weight: ["400"] });

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 4,
  borderRadius: "16px",
};

const NavBar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignIn = async () => {
    try {
      googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await logOut();
      setLoading(false);
    } catch (error) {
      console.log("Sign out error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const isAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    isAuth();
  }, [user]);

  return (
    <div
      className="
    sticky
    top-0
    w-full
    z-30
    shadow-sm
    bg-[#f5f7f7]-200
    "
    >
      <div className="py-4 border-[1px]">
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
            <Link
              href="/"
              className={`${michroma.className} text-lg font-semibold`}
            >
              T1er One
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-4 ">
              {loading ? (
                <SkeletonLoading width="182px" height="42px" />
              ) : !user ? (
                <>
                  <div className="flex items-center  ">
                    <span className="flex items-center space-x-4 border-[1.4px] rounded-l-xl pr-3 py-3 px-4 hover:border-slate-400 transition ease-in-out delay-75">
                      <MdWallet size={24} />
                      <button
                        onClick={handleOpen}
                        className="cursor-pointer font-semibold text-stone-800"
                      >
                        Connect wallet
                      </button>
                    </span>
                    <span className="cursor-pointer border-[1.4px] border-l-none rounded-r-xl py-[9px] px-3 hover:border-slate-400 transition ease-in-out delay-75">
                      <CgProfile size={30} />
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
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                          textAlign: "center",
                          fontWeight: 600,
                        }}
                      >
                        Connect your wallet or google
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{
                          mt: 2,
                          mb: 2,
                          px: 4,
                          fontSize: "14px",
                          fontWeight: 400,
                          textAlign: "center",
                        }}
                      >
                        If you don't have a wallet, you can either select a
                        provider and create one.{" "}
                        <span className="text-sky-500">Learn more</span>
                      </Typography>
                      <Typography sx={{ px: 3 }}>
                        <hr />
                      </Typography>
                      <Typography>
                        <div
                          onClick={handleSignIn}
                          className="flex px-6 justify-between items-center cursor-pointer hover:bg-stone-100 py-4"
                        >
                          <span className="flex space-x-4 font-semibold">
                            <FcGoogle size={24} /> <span>Google Pay</span>
                          </span>
                          <span className="text-stone-600 text-xs font-semibold">
                            POPULAR
                          </span>
                        </div>
                      </Typography>
                      <Typography sx={{ textAlign: "center", mb: 2 }}>
                        <hr className="pb-4" />
                        <strong>Show more</strong>
                      </Typography>
                    </Box>
                  </Modal>
                </>
              ) : (
                <div className="flex items-center  ">
                  <span className="flex items-center space-x-4 border-[1.4px] rounded-l-xl pr-3 py-3 px-4 hover:border-slate-400 transition ease-in-out delay-75">
                    <MdWallet size={24} />
                    <button
                      onClick={handleOpen}
                      className="cursor-pointer font-semibold text-stone-800"
                    >
                      Connected
                    </button>
                  </span>
                  <span
                    onClick={handleSignOut}
                    className="cursor-pointer border-[1.4px] border-l-none rounded-r-xl py-[9px] px-3 hover:border-slate-400 transition ease-in-out delay-75"
                  >
                    <Image
                      src={user.photoURL}
                      width={30}
                      height={30}
                      className="bg-white border-[1px] rounded-full"
                      alt="User menu"
                    />
                  </span>
                </div>
              )}

              <div className="border-[1.4px] px-2 py-2 rounded-xl hover:border-slate-400 transition ease-in-out delay-75 ">
                <PiShoppingBagOpenThin />
              </div>
            </div>
          </div>
        </Container>
      </div>
      NavBar
    </div>
  );
};

export default NavBar;
