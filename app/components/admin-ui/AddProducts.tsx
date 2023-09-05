"use client";

import { ProductTypes } from "@/types";
import { useEffect, useRef, useState } from "react";
import { productDetails } from "../products-ui/ProductDetails";
import { fiatCurrencies, sortedOptions, web3Tokens } from "@/lib/utils/formats";
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

const productCollectionRef = collection(db, "products");
const storage = getStorage(app);

const AddProducts = () => {
  // Image attributes
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageColors, setImageColors] = useState<
    { color: string; name: string }[]
  >([]);
  // Check if all fields has  a value
  const [isValid, setIsValid] = useState(true);
  const [selectedType, setSelectedType] = useState("Currency");
  const [options, setOptions] = useState({});
  const [selectedOption, setSelectedOption] = useState("USD");
  const [price, setPrice] = useState("");

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prevImages) => {
      return prevImages.filter((_, i) => i !== index);
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

  // MODIFY THIS

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

      // Update state and local storage
      setImageColors((prevColors) => [...prevColors, ...newColors]);
      setUploadedImages((prevImages) => [...prevImages, ...downloadURLs]);
      localStorage.setItem(
        "uploadedImages",
        JSON.stringify([...uploadedImages, ...downloadURLs])
      );
      localStorage.setItem(
        "imageColors",
        JSON.stringify([...imageColors, ...newColors])
      );
    } catch (error) {
      console.error("An error occurred during multiple file handling:", error);
    }
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

  useEffect(() => {
    const savedImages = localStorage.getItem("uploadedImages");
    const savedColors = localStorage.getItem("imageColors");

    if (savedImages && savedColors) {
      setUploadedImages(JSON.parse(savedImages));
      setImageColors(JSON.parse(savedColors));
    }
  }, []);

  useEffect(() => {
    let value = price.replace(/[^\d.]/g, "");
    if (value === "") {
      setPrice("");
    } else if (selectedType === "Currency") {
      if (!isNaN(Number(value))) {
        setPrice(parseInt(value, 10).toLocaleString());
      }
    } else if (selectedType === "Web3 Tokens") {
      if (!isNaN(Number(value))) {
        setPrice(parseFloat(value).toFixed(4));
      }
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

  const addProduct = async (productCase: "DROP" | "SELL" | "SWAP") => {
    // Check fields value
    if (!validateFields()) return;
    // Extract values from ref.current
    const name = itemNameRef.current ? itemNameRef.current.value : "";
    const type = itemTypeRef.current ? itemTypeRef.current.value : "";
    const option = itemTypeOptionRef.current
      ? itemTypeOptionRef.current.value
      : "";
    const images = uploadedImages.map((url, index) => {
      return {
        color: imageColors[index]?.name || "",
        colorCode: imageColors[index]?.color || "",
        image: url,
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
    const newProduct: ProductTypes = {
      id: "",
      case: productCase,
      name,
      description,
      type: [{ options: option, price: parseFloat(priceValue) }],
      brand,
      category,
      images,
      reviews: [],
      quantity,
      selectedImg: null,
    };
    console.log(images);

    try {
      await addDoc(productCollectionRef, newProduct);
      console.log("Product successfully added");

      // Clear Local Storage
      localStorage.removeItem("uploadedImages");
      localStorage.removeItem("imageColors");
    } catch (e) {
      console.error("Error adding document:", e);
    }
  };

  const inputUi = "border rounded-md p-1 mt-1 text-black";
  return (
    <div className={`${productDetails} mt-8`}>
      <ImagePreview
        uploadedImages={uploadedImages}
        onDelete={handleDeleteImage}
        imageColors={imageColors}
      />

      <div className="flex flex-col gap-1 border rounded-xl h-full text-xs font-semibold text-stone-500 ">
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
                <div className="p-2  border border-dashed  py-6 rounded-md text-center">
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
              className={`${inputUi} w-full resize-y  max-h-40 overflow-auto`}
              required
              ref={itemDescriptionRef}
            ></textarea>
          </div>
          <div className="flex justify-between">
            <span>
              <h1>CATEGORY:</h1>
              <select
                className={`${inputUi} text-black text-[12px]`}
                name="CATEGORY"
                id="category"
                required
                ref={itemCategoryRef}
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
              <h1>QUANTITY:</h1>
              <input
                className={inputUi}
                type="number"
                min={1}
                required
                ref={itemQuantityRef}
              />
            </span>
          </div>
        </form>
        {/* IN THE FUTURE SHOW THE COLOR FLAG */}
        <div className="max-h-p4 grid grid-cols-3 border-t text-xs text-black rounded-b-lg   overflow-hidden">
          <button
            disabled={!isValid}
            className="border-r py-1 hover:bg-stone-700  hover:text-slate-50 ease-in-out delay-75"
            onClick={() => addProduct("DROP")}
          >
            DROP
          </button>
          <button
            disabled={!isValid}
            className="border-r py-1 hover:bg-stone-700  hover:text-slate-50 ease-in-out delay-75"
            onClick={() => addProduct("SELL")}
          >
            SELL
          </button>
          <button
            disabled={!isValid}
            className="py-1 hover:bg-stone-700 hover:text-slate-50 ease-in-out delay-75"
            onClick={() => addProduct("SWAP")}
          >
            SWAP
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
