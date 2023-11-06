"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/db/firebaseUtils";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

const UserInfo = () => {
  const { user } = useAuth();
  const defaultPhoto = user?.photoURL?.replaceAll("s96-c", "s480-c") || "";
  const defaultName = user?.displayName;
  const defaultEmail = user?.email;

  console.log(defaultName);

  const [userInfo, setUserInfo] = useState({
    photo: defaultPhoto || "",
    name: defaultName || "",
    address: "",
    number: "",
    email: "",
    wallet: "",
  });

  const [isEditing, setIsEditing] = useState(false);


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
            <div className="relative z-0 h-80 w-full bg-stone-100 rounded-xl overflow-hidden backdrop-opacity-75"></div>

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
          <div className="flex justify-end w-full mb-6 ">
            <div className="flex flex-col space-y-2 ml-8 mt-2 ">
              {isEditing ? (
                <>
                  <label htmlFor="email" className="font-semibold text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="bg-white  border-[0.8px] p-1 text-sm"
                  />
                </>
              ) : (
                <span className="">{userInfo.email || "No email provided"}</span>
              )}
            </div>
            <div className="flex flex-col space-y-2 ml-8 mt-2  ">
              {isEditing ? (
                <>
                  <label htmlFor="number" className="font-semibold text-sm">
                    Tel/Phone no.
                  </label>
                  <input
                    id="number"
                    value={userInfo.number}
                    onChange={(e) =>
                      setUserInfo((prev) => ({
                        ...prev,
                        number: e.target.value,
                      }))
                    }
                    className="bg-white  border-[0.8px] p-1 text-sm "
                  />
                </>
              ) : (
                <span className="mr-2">{userInfo.number || "No number provided"}</span>
              )}
            </div>
          </div>
          <div
            className={`flex flex-col space-y-2 ml-8`}
          >
            {isEditing ? (
              <>
                <label htmlFor="email" className="font-semibold text-sm">
                  Name
                </label>
                <input
                  id="email"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="bg-white  border-[0.8px] p-1 text-sm w-56"
                />
              </>
            ) : (
              <span className="text-2xl font-semibold">{userInfo.name}</span>
            )}
          </div>

          <button
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
        </form>
      </div>
    </Container>
  );
};

export default UserInfo;
