import { config } from "@/config/config";
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
import CartCount from "../components/nav/CartCount";

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
  }, [auth]);

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

  return (
    <div className="flex items-center gap-4 ">
      <div className="flex items-center  ">
        <span className="flex items-center space-x-4 border-[1.4px] rounded-l-xl pr-3 py-3 px-4 hover:border-slate-400 transition ease-in-out delay-75">
          <MdWallet size={24} />
          <button
            className="cursor-pointer font-semibold text-stone-800"
            onClick={handleOpen}
            disabled={authing}
          >
            Connect wallet
          </button>
        </span>
        <span
          onClick={() => handleSignOut()}
          className="cursor-pointer border-[1.4px] border-l-none rounded-r-xl py-[9px] px-3 hover:border-slate-400 transition ease-in-out delay-75"
        >
          {currentUser && currentUser.photoURL ? (
            <Image
              src={currentUser.photoURL}
              width={30}
              height={30}
              className="bg-white border-[1px] rounded-full"
              alt="User menu"
            />
          ) : (
            <CgProfile size={30} />
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
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {currentUser ? (
              <h1 className="text-green-500">Connected</h1>
            ) : (
              <h1>Connect your wallet</h1>
            )}
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
            If you don't have a wallet, you can either select a provider and
            create one. <span className="text-sky-500">Learn more</span>
          </Typography>
          <Typography sx={{ px: 3 }}>
            <hr />
          </Typography>
          <Typography>
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
          <Typography sx={{ textAlign: "center", mb: 2 }}>
            <hr className="pb-4" />
            <strong>Show more</strong>
          </Typography>
        </Box>
      </Modal>
      <div className="border-[1.4px] px-2 py-2 rounded-xl cursor-pointer hover:border-slate-400 transition ease-in-out delay-75 ">
        <CartCount  />
      </div>
    </div>
  );
};

export default LogInPage;
