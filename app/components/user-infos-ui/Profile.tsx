// NPM CANARY - changed 11/12/23

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import * as HoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { BsPerson } from "react-icons/bs";
import { PiNotificationDuotone, PiTimer } from "react-icons/pi";
import { MdOutlineBugReport } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";

interface Profile {
  scrolled: boolean;
  connectWallet: () => void;
}

const Profile: React.FC<Profile> = ({ scrolled, connectWallet }) => {
  const { user, handleSignOut, fetchUserProfilePhoto } = useAuth();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(
    user?.photoURL || null
  );

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileDevice(window.innerWidth < 478);
    };

    // Check initially and on resize
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleCardToggle = () => {
    if (isMobileDevice) {
      setIsCardOpen(!isCardOpen);
    }
  };
  // Image rendered default load state bug

  useEffect(() => {
    async function updateUserPhoto() {
      if (user?.uid) {
        const newPhotoURL = await fetchUserProfilePhoto(user.uid);
        if (newPhotoURL && newPhotoURL !== user.photoURL) {
          setUserPhoto(newPhotoURL);
        }
      }
    }

    updateUserPhoto();
  }, [user, fetchUserProfilePhoto]);

  const closeCard = () => {
    setIsCardOpen(false);
  };

  const ButtonStyle = `p-3 select-none text-stone-900 cursor-pointer font-semibold rounded-xl flex items-center space-x-4 hover:bg-stone-100   trasition ease-in-out duration-150`;

  return (
    <HoverCard.Root
      open={isCardOpen}
      onOpenChange={setIsCardOpen}
      openDelay={0}
      closeDelay={500}
    >
      <div className="group flex">
        {" "}
        {/* Added group class here */}
        <HoverCard.Trigger
          onClick={handleCardToggle}
          className={`flex items-center cursor-pointer border-l-none rounded-r-xl p-3 focus:outline-none ${
            scrolled
              ? "backdrop-blur-md md:bg-white md:bg-opacity-20 md:hover:bg-stone-900 md:hover:backdrop-blur-md md:hover:bg-opacity-20 transition ease-in-out duration-150"
              : "md:hover:bg-stone-200 md:bg-stone-100 transition ease-in-out duration-150"
          } ${scrolled ? "text-white" : ""}`}
        >
          <span className={`${user ? "relative h-[26px] w-[26px]" : ""}`}>
            {user ? (
              <Image
                src={userPhoto || user.photoURL || ""}
                fill
                className="rounded-full object-cover"
                alt="User menu"
                sizes="auto"
              />
            ) : (
              <CgProfile size={26} className="object-cover" /> // Fallback icon
            )}
          </span>
        </HoverCard.Trigger>
        <HoverCard.Content
          align="end"
          sideOffset={12}
          className={`bg-white z-30 overflow-hidden border-[0.5px] rounded-2xl border-b-none md:w-[236px] shadow-2xl  transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition duration-300 ease-in-out`}
        >
          <div>
            <div className="border-b-[0.8px] p-2">
              {user ? (
                <Link
                  onClick={closeCard}
                  href={`/auth/${user.uid}`}
                  className={ButtonStyle}
                >
                  <BsPerson size={20} />
                  <h2>Profile</h2>
                </Link>
              ) : (
                <div
                  onClick={() => {
                    connectWallet();
                    closeCard();
                  }}
                  className={ButtonStyle}
                >
                  <BsPerson size={20} />
                  <h2>Profile</h2>
                </div>
              )}
              <Link
                onClick={closeCard}
                className={ButtonStyle}
                href={`/components/fallback-ui`}
              >
                <PiNotificationDuotone size={20} />
                <h2>Notification</h2>
              </Link>
            </div>
            <div className="border-b-[0.8px] p-2">
              <Link
                onClick={closeCard}
                className={ButtonStyle}
                href={`/components/fallback-ui`}
              >
                <PiTimer size={20} />
                <h2>Purchase</h2>
              </Link>
              <Link
                onClick={closeCard}
                className={ButtonStyle}
                href={`/components/fallback-ui`}
              >
                <AiOutlineSetting size={20} />
                <h2>Settings</h2>
              </Link>
            </div>
            <div className="p-2">
              <Link href={`/`}>
                <div
                  onClick={
                    user
                      ? () => {
                          handleSignOut();
                          closeCard();
                        }
                      : undefined
                  }
                  className={`p-3 select-none text-stone-900 font-semibold rounded-xl flex items-center space-x-4 hover:bg-stone-100   trasition ease-in-out duration-150 ${
                    !user ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <IoLogOutOutline size={20} />
                  <h2>Logout</h2>
                </div>
              </Link>
              <Link
                onClick={closeCard}
                className={ButtonStyle}
                href={`/components/fallback-ui`}
              >
                <MdOutlineBugReport size={20} />
                <h2>Report</h2>
              </Link>
              <Link
                onClick={closeCard}
                className={ButtonStyle}
                href={`/components/fallback-ui`}
              >
                <FiHelpCircle size={18} />
                <h2>Help center</h2>
              </Link>
            </div>
          </div>
        </HoverCard.Content>
      </div>
    </HoverCard.Root>
  );
};

export default Profile;
