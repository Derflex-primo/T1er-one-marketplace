"use client";

//  FIX AUTH 

import {
  CategoryType,
  ImageProps,
  ProductTypes,
  SpecsProps,
  StoreProps,
  UserAuthProps,
  VideoAdProps,
} from "@/types";
import { useEffect, useRef, useState } from "react";
import { productDetails } from "../products-ui/ProductDetails";
import {
  fiatCurrencies,
  gadgetDealTypes,
  logisticsPartnersPH,
  sortedOptions,
  web3Tokens,
} from "@/lib/utils/formats";
import { addDoc, collection } from "firebase/firestore";
import { db, app } from "@/lib/db/firebaseUtils";
import { analyzeImageColor } from "@/lib/analysis/image-color";
import toast from "react-hot-toast";
import ImagePreview from "./ImageBasket";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import SpecsCategories from "./SpecsCategories";
import VideoAd from "./VideoAd";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const AUTHORIZED_EMAIL_ADMIN = process.env.NEXT_PUBLIC_AUTHORIZED_EMAIL_ADMIN;
const AUTHORIZED_EMAIL_USER = process.env.NEXT_PUBLIC_AUTHORIZED_EMAIL_USER;
const productCollectionRef = collection(db, "products");
export const storage = getStorage(app);

export const inputUi = "border rounded-md p-1 mt-1 text-black";
const AddProducts = () => {
  // Auth check admin or user
  const [addedBy, setAddedBy] = useState<UserAuthProps | null>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  type UserRole = "admin" | "user" | null;
  const [isAuthorized, setIsAuthorized] = useState(false);
  // Handle Category
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // To keep track of selected category
  const [specs, setSpecs] = useState<SpecsProps>({});
  // Image attributes
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageColors, setImageColors] = useState<
    { color: string; name: string }[]
  >([]);
  // Video attrubutes
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  // Check if all fields has  a value
  const [isValid, setIsValid] = useState(true);
  const [selectedType, setSelectedType] = useState("Currency");
  const [options, setOptions] = useState({});
  const [selectedOption, setSelectedOption] = useState("USD");
  const [price, setPrice] = useState("");

  //DEALS AND LOGISTICS
  const [selectedDeal, setSelectedDeal] = useState<string>("");
  const [selectedLogistics, setSelectedLogistics] = useState<string>("");

  // STORE NAME
  const [store, setStore] = useState<StoreProps>({
    storeName: "",
    storeAddress: "",
  });

  // Image Groups
  const [imagesInGroups, setImagesInGroups] = useState<ImageProps[]>([]);

  const addImageToGroup = (index: number, imageUrl: string) => {
    const newImagesInGroups = [...imagesInGroups];

    // Create a new group if it doesn't exist
    if (!newImagesInGroups[index]) {
      newImagesInGroups[index] = { setImages: [] };
    }

    // Add the new image
    newImagesInGroups[index].setImages.push(imageUrl);

    setImagesInGroups(newImagesInGroups);
  };

  // This handles specs - C
  const handleSpecsChange = (newSpecs: SpecsProps) => {
    setSpecs(newSpecs);
  };

  const handleCategoryChanges = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCategory = event.target.value as CategoryType;
    setSelectedCategory(newCategory);
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) => {
      return prevImages.filter((_, i) => i !== index);
    });

    setImagesInGroups((prevGroups) => {
      return prevGroups.filter((_, i) => i !== index);
    });
  };

  const uploadVideoToStorage = async (file: File): Promise<string> => {
    const filename = file.name;
    const storageRef = ref(storage, `videos/${filename}`);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        if (typeof reader.result === "string") {
          try {
            await uploadString(
              storageRef,
              reader.result.split(",")[1],
              "base64"
            );
            const downloadURL = await getDownloadURL(storageRef);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const filename = file.name;
    const storageRef = ref(storage, `images/${filename}`);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        if (typeof reader.result === "string") {
          try {
            await uploadString(
              storageRef,
              reader.result.split(",")[1],
              "base64"
            );
            const downloadURL = await getDownloadURL(storageRef);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle main img data
  const handleMultipleFiles = async (files: FileList | null): Promise<void> => {
    if (!files) {
      console.log("No files selected");
      return;
    }

    try {
      const fileArray = Array.from(files);
      console.log("Files to upload:", fileArray); // Debugging line

      // Upload images to Firebase Storage and get download URLs
      const downloadURLs = await Promise.all(
        fileArray.map(uploadImageToStorage)
      );
      console.log("Download URLs:", downloadURLs); // Debugging line

      // Process image colors for all files concurrently
      const newColors = await Promise.all(
        fileArray.map(async (file) => {
          const colorInfo = await analyzeImageColor(file);
          return { color: colorInfo.hex, name: colorInfo.name };
        })
      );
      console.log("New Colors:", newColors); // Debugging line

      // Update state storage
      setImageColors((prevColors) => [...prevColors, ...newColors]);
      setUploadedImages((prevImages) => [...prevImages, ...downloadURLs]);
    } catch (error) {
      console.error("An error occurred during multiple file handling:", error);
    }
  };

  //Handle delete vid temporary
  const handleDeleteVideo = () => {
    setVideoUrl(undefined);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d.]/g, ""); // Remove any non-digit and non-dot characters
    if (value === "") {
      setPrice("");
      return;
    }

    if (selectedType === "Currency") {
      if (/^\d+$/.test(value)) {
        value = parseInt(value, 10).toLocaleString(); // Convert to integer, then back to string with commas
        setPrice(value);
      }
    } else if (selectedType === "Web3 Tokens") {
      if (/^\d+\.?\d*$/.test(value)) {
        setPrice(value); // Keep as is
      }
    }
  };

  //DEALS AND LOGISTICS

  const handleDealChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeal(e.target.value);
  };

  const handleLogisticsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLogistics(e.target.value);
  };

  // STORE NAME & ADDRESS

  const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore((prev) => ({ ...prev, storeName: e.target.value }));
  };

  const handleStoreAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore((prev) => ({ ...prev, storeAddress: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
  };

  // To prevent loop
  const priceRef = useRef(price);

  useEffect(() => {
    priceRef.current = price;
  }, [price]);

  useEffect(() => {
    let value = priceRef.current.replace(/[^\d.]/g, "");
    if (value === "") {
      setPrice((prevPrice) => (prevPrice !== "" ? "" : prevPrice));
    } else if (selectedType === "Currency") {
      const formattedPrice = parseInt(value, 10).toLocaleString();
      setPrice((prevPrice) =>
        prevPrice !== formattedPrice ? formattedPrice : prevPrice
      );
    } else if (selectedType === "Web3 Tokens") {
      const formattedPrice = parseFloat(value).toFixed(4);
      setPrice((prevPrice) =>
        prevPrice !== formattedPrice ? formattedPrice : prevPrice
      );
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedType === "Currency") {
      setOptions(fiatCurrencies);
      setSelectedOption("USD");
    } else if (selectedType === "Web3 Tokens") {
      setOptions(web3Tokens);
      setSelectedOption("ETH");
    }
  }, [selectedType]);

  // EMAIL AUTH OPERATIONS

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        let role: UserRole;

        // Check the role based on email
        if (user.email === AUTHORIZED_EMAIL_ADMIN) {
          setIsAuthorized(true);
          role = "admin";
        } else if (user.email === AUTHORIZED_EMAIL_USER) {
          setIsAuthorized(true);
          role = "user";
        } else {
          setIsAuthorized(false);
          role = null;
        }

        setRole(role);

        // Capture user details if the role is valid (either user or admin)
        if (role) {
          const userDetails = {
            id: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            emailVerified: user.emailVerified ? new Date().toISOString() : null,
            image: user.photoURL || "",
            phoneNumber: user.phoneNumber || "",
            addedTime: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            role: role,
          };

          setAddedBy(userDetails);
        }
      } else {
        setIsAuthorized(false);
        setRole(null);
      }
    });
  }, []);

  const validateFields = () => {
    const refs = [
      itemNameRef,
      itemTypeRef,
      itemTypeOptionRef,
      itemTypePriceRef,
      itemDescriptionRef,
      itemCategoryRef,
      itemBrandRef,
      itemQuantityRef,
      dealRef,
      itemImagesRef,
      logisticsRef,
      storeAddressRef,
      storeNameRef,
    ];
    let formsValidated = true;

    refs.forEach((ref) => {
      if (ref.current && !ref.current.value) {
        ref.current.classList.add("border-red-500");
        formsValidated = false;
      } else {
        ref.current?.classList.remove("border-red-500");
      }
    });

    if (uploadedImages.length === 0) {
      formsValidated = false;
      toast("Please upload at least one image.");
    }

    setIsValid(formsValidated);

    if (!formsValidated) {
      toast("Please fill all the required fields.");
    }

    if (!dealRef.current?.value) {
      toast("Please select a deal.");
      return false;
    }

    if (!logisticsRef.current?.value) {
      toast("Please select a logistics partner.");
      return false;
    }

    if (!storeNameRef.current?.value) {
      toast("Please add your store");
      return false;
    }

    if (!storeNameRef.current?.value || !storeAddressRef.current?.value) {
      toast("Please provide both store name and address.");
      return false;
    }

    return formsValidated;
  };

  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemTypeRef = useRef<HTMLSelectElement>(null);
  const itemTypeOptionRef = useRef<HTMLSelectElement>(null);
  const itemTypePriceRef = useRef<HTMLInputElement>(null);
  const itemImagesRef = useRef<HTMLInputElement>(null);
  const itemDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const itemCategoryRef = useRef<HTMLSelectElement>(null);
  const itemBrandRef = useRef<HTMLInputElement>(null);
  const itemQuantityRef = useRef<HTMLInputElement>(null);
  const dealRef = useRef<HTMLSelectElement>(null);
  const logisticsRef = useRef<HTMLSelectElement>(null);
  const storeNameRef = useRef<HTMLInputElement>(null);
  const storeAddressRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    // Reset state variables
    setSelectedCategory("");
    setSpecs({});
    setUploadedImages([]);
    setImageColors([]);
    setIsValid(true);
    setSelectedType("Currency");
    setOptions({});
    setSelectedOption("USD");
    setPrice("");
    setVideoUrl(undefined);
    setSelectedDeal("");
    setSelectedLogistics("");
    setStore({
      storeName: "",
      storeAddress: "",
    });

    // Reset form fields using refs
    if (itemNameRef.current) itemNameRef.current.value = "";
    if (itemTypeRef.current) itemTypeRef.current.value = "";
    if (itemTypeOptionRef.current) itemTypeOptionRef.current.value = "";
    if (itemTypePriceRef.current) itemTypePriceRef.current.value = "";
    if (itemDescriptionRef.current) itemDescriptionRef.current.value = "";
    if (itemCategoryRef.current) itemCategoryRef.current.value = "";
    if (itemBrandRef.current) itemBrandRef.current.value = "";
    if (itemQuantityRef.current) itemQuantityRef.current.value = "1";
    if (dealRef.current) dealRef.current.value = "";
    if (logisticsRef.current) logisticsRef.current.value = "";
    if (storeNameRef.current) storeNameRef.current.value = "";
    if (storeAddressRef.current) storeAddressRef.current.value = "";
  };

  const addProduct = async (productCase: "DROP" | "SELL" | "SWAP") => {
    if (!isAuthorized) {
      toast("You are not authorized to add products.");
      return;
    }

    if (role === "user") {
      // implement any restrictions or modifications for a regular user here.
      toast("You have user permissions.");
      // restrict users from adding a product:
      // return;
    } else if (role === "admin") {
      // Implement any specific logic for admin here if needed.
      toast("You have admin permissions.");
    }

    // Check fields value
    if (!validateFields()) return;
    // Extract values from ref.current
    const name = itemNameRef.current ? itemNameRef.current.value : "";
    const type = itemTypeRef.current ? itemTypeRef.current.value : "";
    const option = itemTypeOptionRef.current
      ? itemTypeOptionRef.current.value
      : "";
    const combinedImages = uploadedImages.map((url, index) => {
      const additionalImages = imagesInGroups[index]?.setImages || [];
      return {
        color: imageColors[index]?.name || "",
        colorCode: imageColors[index]?.color || "",
        image: url,
        setImages: additionalImages, // This line attaches the additional images to the main image
      };
    });

    let priceValue = itemTypePriceRef.current
      ? itemTypePriceRef.current.value
      : "";
    if (selectedType === "Currency") {
      priceValue = priceValue.replace(/,/g, "");
    }
    const description = itemDescriptionRef.current
      ? itemDescriptionRef.current.value
      : "";
    const category = itemCategoryRef.current
      ? itemCategoryRef.current.value
      : "";
    const brand = itemBrandRef.current ? itemBrandRef.current.value : "";
    const quantity = itemQuantityRef.current
      ? parseInt(itemQuantityRef.current.value, 10)
      : 1;
    const videoAdProps: VideoAdProps | undefined = videoUrl
      ? { videoAd: videoUrl }
      : undefined;
    const newProduct: ProductTypes = {
      id: "",
      case: productCase,
      name,
      description,
      type: [{ options: option, price: parseFloat(priceValue) }],
      brand,
      category,
      images: combinedImages,
      vidAd: videoAdProps,
      reviews: [],
      quantity,
      specs,
      selectedImg: null,
      deal: selectedDeal,
      logistics: selectedLogistics,
      store: store,
      addedBy: addedBy,
    };
    console.log(imagesInGroups);

    try {
      await addDoc(productCollectionRef, newProduct);
      console.log("Product successfully added");
      resetForm();
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  return (
    <>
      <div className={`${productDetails}  mt-8`}>
        <ImagePreview
          uploadedImages={uploadedImages}
          onDelete={handleDeleteImage}
          imageColors={imageColors}
          imagesInGroups={imagesInGroups}
          addImageToGroup={addImageToGroup}
        />
        <div className="flex flex-col gap-1 border rounded-xl  text-xs font-semibold text-stone-500 ">
          <form className="space-y-6 p-6" action="">
            <div className="flex justify-between">
              <div className="flex flex-col space-y-2">
                <span>
                  <h1>ITEM NAME:</h1>
                  <input
                    className={inputUi}
                    type="text"
                    required
                    ref={itemNameRef}
                  />
                </span>
                <div className="relative">
                  <h1 className="mb-2">ITEM IMAGE:</h1>
                  <div className="p-2  border border-dashed py-6 rounded-md text-center hover:border-blue-500">
                    <input
                      className="hidden"
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        handleMultipleFiles(e.target.files);
                      }}
                      required
                      ref={itemImagesRef}
                      multiple
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer"
                      onDrop={async (e) => {
                        e.preventDefault();
                        handleMultipleFiles(e.dataTransfer.files);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Drag & Drop your image or{" "}
                      <span className="text-blue-600 hover:underline">
                        Browse
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <h2 className="mb-2">ITEM VIDEO AD:</h2>
                  <div className="p-2 border border-dashed py-6 rounded-md text-center hover:border-indigo-500">
                    <input
                      className="hidden"
                      id="videoInput"
                      type="file"
                      accept="video/*" // Note: The accept type is now video/*
                      onChange={async (e) => {
                        if (e.target.files) {
                          const url = await uploadVideoToStorage(
                            e.target.files[0]
                          );
                          setVideoUrl(url);
                        }
                      }}
                      required
                    />
                    <label
                      htmlFor="videoInput"
                      className="cursor-pointer"
                      onDrop={async (e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files) {
                          const url = await uploadVideoToStorage(
                            e.dataTransfer.files[0]
                          );
                          setVideoUrl(url);
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Drag & Drop your video or{" "}
                      <span className="text-indigo-600 hover:underline">
                        Browse
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <span>
                  <h1>TYPE:</h1>
                  <select
                    className={`${inputUi} text-black text-[12px]`}
                    onChange={(e) => setSelectedType(e.target.value)}
                    required
                    ref={itemTypeRef}
                  >
                    <option value="Currency">Gov. Currency</option>
                    <option value="Web3 Tokens">Web3 Tokens</option>
                  </select>
                </span>
                <span>
                  <h1>OPTIONS:</h1>
                  <select
                    className={`${inputUi} text-black text-[12px]`}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    required
                    ref={itemTypeOptionRef}
                  >
                    {Object.keys(options).map((key) => (
                      <option key={key} value={key}>
                        {(options as Record<string, string>)[key]}
                      </option>
                    ))}
                  </select>
                </span>
                <span>
                  <h1>PRICE:</h1>
                  <div className="space-x-2">
                    <span
                      className={
                        selectedType === "Currency"
                          ? "text-green-500"
                          : selectedType === "Web3 Tokens"
                          ? "text-violet-500"
                          : ""
                      }
                    >
                      {selectedOption ? selectedOption : ""}
                    </span>
                    <input
                      className={inputUi}
                      type="text"
                      min={1}
                      value={price}
                      onChange={handlePriceChange}
                      required
                      ref={itemTypePriceRef}
                    />
                  </div>
                </span>
              </div>
            </div>
            <div>
              <h1>DESCRIPTION:</h1>
              <textarea
                name="message"
                className={`${inputUi} w-full mb-2  h-full resize-y overflow-auto`}
                required
                ref={itemDescriptionRef}
              ></textarea>
              <span>
                <h1>STORE ADDRESS:</h1>
                <input
                  type="text"
                  required
                  className={`${inputUi} mb-2 w-full`}
                  value={store.storeAddress}
                  onChange={handleStoreAddressChange}
                  ref={storeAddressRef}
                />
              </span>
              <span>
                <h1>STORE NAME:</h1>
                <input
                  onChange={handleStoreNameChange}
                  className={inputUi}
                  type="text"
                  required
                  ref={storeNameRef}
                />
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 items-start">
              <span>
                <h1>CATEGORY:</h1>
                <select
                  className={`${inputUi} text-black text-[12px]`}
                  name="CATEGORY"
                  id="category"
                  required
                  value={selectedCategory}
                  ref={itemCategoryRef}
                  onChange={handleCategoryChange}
                  onSelect={handleCategoryChanges}
                >
                  {sortedOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </span>
              <span>
                <h1>BRAND:</h1>
                <input
                  className={inputUi}
                  type="text"
                  required
                  ref={itemBrandRef}
                />
              </span>
              <span>
                <h1>DEALS:</h1>
                <select
                  ref={dealRef}
                  className={`${inputUi} text-black text-[12px]`}
                  name="deals"
                  id="deals"
                  onChange={handleDealChange}
                >
                  <option value="" disabled selected>
                    Select a deal
                  </option>
                  {gadgetDealTypes.map((deal) => (
                    <option key={deal.value} value={deal.value}>
                      {deal.label}
                    </option>
                  ))}
                </select>
              </span>
              <span>
                <h1>QUANTITY:</h1>
                <input
                  className={inputUi}
                  type="number"
                  min={1}
                  required
                  ref={itemQuantityRef}
                />
              </span>
              <span>
                <h1>LOGISTICS:</h1>
                <select
                  ref={logisticsRef}
                  className={`${inputUi} text-black text-[12px]`}
                  name="logistics"
                  id="logistics"
                  onChange={handleLogisticsChange}
                >
                  <option value="" disabled selected>
                    Select a logistics partner
                  </option>
                  {logisticsPartnersPH.map((partner) => (
                    <option key={partner.value} value={partner.value}>
                      {partner.label}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-12">
        <SpecsCategories
          category={selectedCategory}
          onSpecsChange={handleSpecsChange}
        />
      </div>
      <VideoAd videoAd={videoUrl} onDelete={handleDeleteVideo} />
      <div className="mt-8 max-h-p4 grid grid-cols-3 border text-xs text-black rounded-lg   overflow-hidden">
        <button
          disabled={!isValid}
          className="border-r py-1 hover:bg-rose-600  hover:text-slate-50 ease-in-out delay-75"
          onClick={() => addProduct("DROP")}
        >
          DROP
        </button>
        <button
          disabled={!isValid}
          className="border-r py-1 hover:bg-rose-600  hover:text-slate-50 ease-in-out delay-75"
          onClick={() => addProduct("SELL")}
        >
          SELL
        </button>
        <button
          disabled={!isValid}
          className="py-1 hover:bg-rose-600 hover:text-slate-50 ease-in-out delay-75"
          onClick={() => addProduct("SWAP")}
        >
          SWAP
        </button>
      </div>
    </>
  );
};

export default AddProducts;
