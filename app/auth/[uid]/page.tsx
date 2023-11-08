"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/db/firebaseUtils";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Container from "@/app/components/Container";
import Image from "next/image";
import { storage } from "@/app/components/admin-ui/AddProducts";
import { IoCloseSharp } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { PurchaseItem, UserPurchasesState } from "@/types";
import { FaBroom, FaSackDollar } from "react-icons/fa6";
import { currentStep, stepMessages, steps } from "@/lib/utils/formats";

const UserInfo = () => {
  const { user } = useAuth();
  const [userPurchases, setUserPurchases] = useState<UserPurchasesState>({
    items: [],
    totalSpent: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    step: "",
  });
  const [current, setCurrent] = useState(currentStep);
  const isCurrent = (step: string) => current === step;
  const defaultPhoto = user?.photoURL?.replaceAll("s96-c", "s480-c") || "";
  const defaultName = user?.displayName;
  const defaultEmail = user?.email;
  const [userInfo, setUserInfo] = useState({
    photo: defaultPhoto || "",
    name: defaultName || "",
    address: "",
    number: "",
    email: "",
    birth: "",
    wallet: "",
  });

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserInfo((prevState) => ({
            ...prevState,
            photo: data?.photo || prevState.photo || defaultPhoto,
            name: data?.name || prevState.name || defaultName,
            address: data?.address || prevState.address,
            number: data?.number || prevState.number,
            email: data?.email || prevState.email || defaultEmail,
            birth: data?.birth || prevState.birth,
            wallet: data?.wallet || prevState.wallet,
          }));
        } else {
          setUserInfo((prevState) => ({
            ...prevState,
            email: user.email || "",
          }));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const saveUserInfo = async () => {
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userInfo);
        console.log("User info saved successfully.");
      } catch (error) {
        console.error("Error saving user info:", error);
      }
    }
  };
  const deletePhoto = async () => {
    if (user && userInfo.photo && userInfo.photo !== defaultPhoto) {
      // Create a reference to the file to delete from storage
      const photoRef = ref(storage, userInfo.photo);

      // Delete the file from storage
      try {
        await deleteObject(photoRef);
        console.log("Photo deleted from storage");
      } catch (error) {
        console.error("Error deleting photo:", error);
      }
    }

    setUserInfo({ ...userInfo, photo: defaultPhoto });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `user_photos/${user?.uid}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    });

    uploadTask
      .then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUserInfo((prev) => ({
            ...prev,
            photo: downloadURL,
          }));
        });
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  };

  useEffect(() => {
    if (user) {
      const purchasesRef = collection(db, "purchases");
      const q = query(purchasesRef, where("userId", "==", user.uid));

      getDocs(q).then((querySnapshot) => {
        let totalSpent = 0;
        let itemsBought: any[] = [];

        querySnapshot.forEach((doc) => {
          totalSpent += doc.data().totalAmount;
          itemsBought.push(...(doc.data().items as PurchaseItem[]));
        });

        setUserPurchases({ items: itemsBought, totalSpent });
      });
    }
  }, [user]);

  const showTooltip = (step: string) => {
    setTooltip({ show: true, content: stepMessages[step], step });
  };

  const hideTooltip = () => {
    setTooltip({ show: false, content: "", step: "" });
  };

  return (
    <Container>
      <div className="mt-4 h-screen box-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUserInfo();
          }}
        >
          <div className="relative h-80 w-full">
            <div className="relative z-0 h-80 w-full bg-gradient-to-r from-stone-100 to-stone-100  rounded-xl overflow-hidden backdrop-opacity-75"></div>
            <div className="absolute top-[120px] left-[380px]  flex flex-row gap-24">
              {Object.entries(steps).map(([step, icon]) => (
                <div
                  key={step}
                  onMouseEnter={() => showTooltip(step as string)} // assert step is a string
                  onMouseLeave={hideTooltip}
                  className={` p-2 hover:bg-white rounded-xl transition ease-in-out duration-150 ${
                    isCurrent(step) ? "text-green-500" : "text-stone-200"
                  }`}
                >
                  <div>{icon}</div>
                  {tooltip.show && tooltip.step === step && (
                    <div className="absolute p-2 bg-white  text-stone-900 rounded-md z-10 text-xs font-semibold mt-5">
                      {tooltip.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute z-30 bottom-[-40px] left-6">
              {userInfo.photo && (
                <Image
                  src={userInfo.photo}
                  alt="User Photo"
                  width={200}
                  height={200}
                  quality={100}
                  className="rounded-2xl z-30"
                />
              )}
              {isEditing && (
                <div className="absolute rounded-2xl inset-0 flex justify-center items-center ">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="fileInput"
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="mt-2 p-1 border-[0.8px] rounded-full bg-white "
                    onClick={() => {
                      const fileInput = document.getElementById("fileInput");
                      if (fileInput) {
                        fileInput.click();
                      }
                    }}
                  >
                    <LiaUserEditSolid className="text-stone-900" size={24} />
                  </button>

                  {isEditing && userInfo.photo !== defaultPhoto && (
                    <button
                      type="button"
                      onClick={deletePhoto}
                      className="mt-2 ml-2"
                    >
                      <IoCloseSharp className="text-red-500" size={19} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row ml-8 mt-16 w-full h-full">
            <div className="w-[50%] space-y-4">
              <div className="flex flex-row items-center space-x-3  w-full mt-2">
                <label htmlFor="name" className="font-semibold text-sm w-1/12">
                  Name
                </label>
                <input
                  id="name"
                  disabled={!isEditing}
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="bg-white w-3/4 border-b-[0.8px] p-1 text-sm"
                />
              </div>
              <div className="flex flex-row items-center space-x-3  w-full mt-2">
                <label htmlFor="email" className="font-semibold text-sm w-1/12">
                  Email
                </label>
                <input
                  id="email"
                  disabled={!isEditing}
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="bg-white w-3/4 border-b-[0.8px] p-1 text-sm"
                />
              </div>
              <div className="flex flex-row items-center space-x-3 w-full  mt-2">
                <label htmlFor="birth" className="font-semibold text-sm w-1/12">
                  Birth
                </label>
                <input
                  type="date" // Set the type to 'date' for date picker
                  id="birth"
                  disabled={!isEditing}
                  value={userInfo.birth || "No birth date provided"}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      birth: e.target.value,
                    }))
                  }
                  className="bg-white w-3/4 border-b-[0.8px] p-1 text-sm"
                />
              </div>

              <div className="flex flex-row items-center space-x-3 w-full mt-2">
                <label
                  htmlFor="number"
                  className="font-semibold text-sm w-1/12"
                >
                  Phone
                </label>
                <input
                  id="number"
                  disabled={!isEditing}
                  value={userInfo.number || "No phone or tel no. provided"}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      number: e.target.value,
                    }))
                  }
                  className="bg-white w-3/4 border-b-[0.8px] p-1 text-sm"
                />
              </div>
              <div className="flex flex-row items-center space-x-3 w-full mt-2">
                <label
                  htmlFor="address"
                  className="font-semibold text-sm w-1/12"
                >
                  Address
                </label>
                <input
                  id="address"
                  disabled={!isEditing}
                  value={userInfo.address || "No address provided"}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="bg-white w-3/4 border-b-[0.8px] p-1 text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="text-sm font-semibold  mr-[98px]"
                  type="button"
                  onClick={() => {
                    if (isEditing) {
                      saveUserInfo().catch((error) => {
                        console.error("Failed to save user info:", error);
                      });
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
            <div className="flex flex-col  w-[50%] h-56 rounded-xl bg-stone-100 mr-8">
              <div className="flex justify-center text-xl font-semibold p-6 border-b-[1px]">
                {userInfo.wallet || "You don't have a wallet"}
              </div>
              <div className="flex flex-row mt-3 justify- h-full ">
                <div className="border-r-[1px] w-full h-full">
                  <div className="flex justify-center font-semibold">
                    Total spent
                  </div>
                  <div className="flex justify-center space-x-2 mt-8 items-center  text-green-500">
                    <FaSackDollar size={24} />{" "}
                    <strong className="text-2xl">
                      {userPurchases.totalSpent}
                    </strong>
                  </div>
                </div>
                <div className=" w-full h-full">
                  <div className=" w-full h-full">
                    <div className="flex justify-center font-semibold">
                      Items bought
                    </div>
                    <div className="flex justify-center  space-x-2 mt-8 items-center text-rose-600 ">
                      <FaBroom size={26} />{" "}
                      <strong className="text-2xl">0</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default UserInfo;
