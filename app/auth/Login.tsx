"use client";

import { Box, Modal, Typography } from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { MdWallet } from "react-icons/md";
import Image from "next/image";
import CartCount from "../components/nav-ui/CartCount";
import { config } from "@/lib/db/firebaseUtils";

const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);

interface LogInPageProps {}

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

const LogInPage: React.FC<LogInPageProps> = (props) => {
  const [authing, setAuthing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        setAuthing(false);
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setCurrentUser(null);
      setLoading(false);
    } catch (error) {
      console.log("Sign out error:", error);
      setLoading(false);
    }
  };

  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className={`flex items-center gap-4 ${scrolled ? "text-white" : ""} `}>
      <div className="flex items-center  ">
        <span
          className={`flex items-center space-x-4 rounded-l-xl pr-3 py-3 px-4 cursor-pointer ${
            scrolled
              ? "backdrop-blur-md bg-white bg-opacity-20   hover:bg-stone-900 hover:backdrop-blur-md hover:bg-opacity-20 border-r-[0.8px]  trasition ease-in-out duration-150"
              : "hover:bg-stone-200 bg-stone-100 trasition ease-in-out duration-150 border-r "
          }`}
        >
          <MdWallet size={26} />
          <button
            className="font-semibold "
            onClick={handleOpen}
            disabled={authing}
          >
            Connect wallet
          </button>
        </span>
        <span
          onClick={() => handleSignOut()}
          className={`cursor-pointer  border-l-none rounded-r-xl py-3 px-3 ${
            scrolled
              ? "backdrop-blur-md bg-white bg-opacity-20 hover:bg-stone-900 hover:backdrop-blur-md hover:bg-opacity-20  trasition ease-in-out duration-150"
              : "hover:bg-stone-200 bg-stone-100 trasition ease-in-out duration-150 "
          } ${
            scrolled ? "text-white" : ""
          } transition-all ease-in-out duration-75`}
        >
          {currentUser && currentUser.photoURL ? (
            <Image
              src={currentUser.photoURL}
              width={26}
              height={26}
              className="bg-white  rounded-full"
              alt="User menu"
            />
          ) : (
            <CgProfile size={26} />
          )}
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
            {currentUser ? (
              <span className="text-green-500">Connected</span>
            ) : (
              <span>Connect your wallet</span>
            )}
          </Typography>
          <Typography
            component="div"
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
            <span> If you don&apos;t have a wallet, ... </span>
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
                <FcGoogle size={24} /> <span>Google Pay</span>
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
