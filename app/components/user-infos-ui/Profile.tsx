import React from "react";
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
  const { user, signInWithGoogle, handleSignOut } = useAuth();

  const ButtonStyle = `p-3 select-none text-stone-900 cursor-pointer font-semibold rounded-xl flex items-center space-x-4 hover:bg-stone-100   trasition ease-in-out duration-150`;

  return (
    <HoverCard.Root openDelay={0} closeDelay={500}>
      <div className="group flex">
        {" "}
        {/* Added group class here */}
        <HoverCard.Trigger
          className={`cursor-pointer  border-l-none rounded-r-xl py-3 px-3 focus:outline-none ${
            scrolled
              ? "backdrop-blur-md bg-white bg-opacity-20 hover:bg-stone-900 hover:backdrop-blur-md hover:bg-opacity-20  trasition ease-in-out duration-150"
              : "hover:bg-stone-200 bg-stone-100 trasition ease-in-out duration-150 "
          } ${
            scrolled ? "text-white" : ""
          } transition-all ease-in-out duration-75`}
        >
          {user && user.photoURL ? (
            <Image
              src={user.photoURL}
              width={26}
              height={26}
              className="bg-white  rounded-full"
              alt="User menu"
            />
          ) : (
            <CgProfile size={26} />
          )}
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
                  href={`/auth/${user.uid}`}
                  className={ButtonStyle}
                >
                  <BsPerson size={20} />
                  <h2>Profile</h2>
                </Link>
              ) : (
                <div onClick={connectWallet} className={ButtonStyle}>
                  <BsPerson size={20} />
                  <h2>Profile</h2>
                </div>
              )}
              <div className={ButtonStyle}>
                <PiNotificationDuotone size={20} />
                <h2>Notification</h2>
              </div>
            </div>
            <div className="border-b-[0.8px] p-2">
              <div className={ButtonStyle}>
                <PiTimer size={20} />
                <h2>Purchase</h2>
              </div>
              <div className={ButtonStyle}>
                <AiOutlineSetting size={20} />
                <h2>Settings</h2>
              </div>
            </div>
            <div className="border-b-[0.8px] p-2">
              <div
                onClick={user ? () => handleSignOut() : undefined}
                className={`p-4 select-none text-stone-900 font-semibold rounded-xl flex items-center space-x-4 hover:bg-stone-200   trasition ease-in-out duration-150 ${
                  !user ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <IoLogOutOutline size={20} />
                <h2>Logout</h2>
              </div>
              <div className={ButtonStyle}>
                <MdOutlineBugReport size={20} />
                <h2>Report</h2>
              </div>
              <div className={ButtonStyle}>
                <FiHelpCircle size={18} />
                <h2>Help center</h2>
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </div>
    </HoverCard.Root>
  );
};

export default Profile;
