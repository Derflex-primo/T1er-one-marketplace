"use client";

import { Rating } from "@mui/material";
import { productRating } from "./ProductCard";
import React, { useCallback, useEffect, useState } from "react";
import { BiUndo } from "react-icons/bi";
import SetColors from "./SetColors";
import SetQuantity from "./SetQuantity";
import Button from "./Button";
import ProductImage from "./ProductImage";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { ProductTypes, ProductDetailsProps, ImageProps } from "@/types";
import Specs from "./Specs";
import splitWord from "@/lib/utils/formats";

// FIX DESIGN

export const Horizontal = () => {
  return <hr className="w-[100%] my-2" />;
};
export const colorCategories =
  "font-semibold  text-stone-900 cursor-default  ";
export const productDetails = "mt-4 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-1 md:space-y-6 sm:gap-1";

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToType, cartProducts, handleRemoveProductToType } =
    useCart(); //handles add to cart from CartContextProvider
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [cartProduct, setCartProduct] = useState<ProductTypes>({
    id: product.id,
    name: product.name,
    case: product.case,
    description: product.description,
    category: product.category,
    brand: product.brand,
    images: product.images,
    selectedImg: product.images[0] || null,
    quantity: 1,
    type: product.type,
    reviews: product.reviews,
    specs: product.specs
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const formatWithComma = (number?: number) => {
    if (number === undefined || number === null) {
      return "$0"; // or some default value
    }
    return "$" + new Intl.NumberFormat("en-US").format(number);
  };

  const discountedPrice = product.type[0].price * 0.7; // Temporarry discount

  const handleColorSelect = useCallback((value: ImageProps) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  const productShowRating = product.reviews?.[0]?.rating ?? 0;

  return (
    <div className={`${productDetails} sm:space-y-6 `}>
      <div>
      <ProductImage cartProduct={cartProduct} product={product} />
      </div>
      <div className="flex flex-col gap-1 text-sm ">
        <div className="border-[0.8px] p-4 rounded-xl cursor-default ">
          <span className="text-2xl font-medium text-stone-800">
            {product.name}
          </span>

          <span className="flex mt-2 flex-wrap justify-between items-center">
            <span className="flex space-x-4 items-center">
              <span className="flex text-base space-x-2 text-black">
                <h1>{formatWithComma(discountedPrice)}</h1>
                <h1 className="line-through text-stone-400">
                  {formatWithComma(product.type[0].price)}
                </h1>
              </span>

              <span className="bg-rose-600 text-white font-semibold px-1">
                Save 30%
              </span>
            </span>
          </span>
          <div className="flex justify-between mt-2  items-center sm:flex-row-reverse md:flex-row">
            <Rating
              sx={{ fontSize: "0.8rem" }}
              value={productShowRating}
              readOnly
              defaultValue={2}
            />
            <span className={productRating}>
              reviews{" "}
              <strong className="text-rose-500">
                {product.reviews?.length}
              </strong>
            </span>
          </div>
        </div>
        <div className="flex flex-col border-[0.8px] p-4 rounded-xl mt-2 md:text-sm text-xs">
          <div className={`${colorCategories} mb-2`}>Product info</div>
          <p className="text-stone-900 text-justify">
            {expanded ? product.description : product.description.slice(0, 468)}
            {!expanded && product.description.length > 468 && "..."}
          </p>
          {product.description.length > 468 && (
            <button
              className="flex justify-end hover:underline mt-1"
              onClick={toggleDescription}
            >
              {expanded ? "see less" : "see more"}
            </button>
          )}
        </div>
        <div className="overflow-hidden border-[0.8px] rounded-xl mt-2 mb-3 grid grid-cols-1 sm:grid-cols-2   lg:grid-template-columns repeat(4, min-content)  items-center md:text-sm text-xs">
          <div className="flex space-x-3 border-b-[0.8px]  border-r-[0.8px] px-4  py-2 ">
            <span className={colorCategories}>Model</span>
            <span>{product.specs?.Model}</span>
          </div>
          <div className="flex space-x-3 border-b-[0.8px] border-r-[0.8px]  px-4 py-2 ">
            <span className={colorCategories}>Product Condition</span>
            <span>{product.specs?.["Product Condition"]}</span>
          </div>
          <div className="flex space-x-3 border-b-[0.8px] border-r-[0.8px]  px-4 py-2">
            <span className={colorCategories}>Brand</span>
            <span>{splitWord(product.brand)}</span>
          </div>
          <div className="flex space-x-3 border-b-[0.8px] border-r-[0.8px]  px-4 py-2">
            <span>
              {product.specs ? (
                <Specs
                  product={product.specs}
                  categoryItem={product.category}
                />
              ) : null}
            </span>
          </div>
        </div>
        {isProductInCart ? (
          <div className="flex  gap-1 ">
            <div className="md:max-w-[200px] sm:w-full ">
              <Button
                label="View Cart"
                outline={true}
                onClick={() => router.push("/cart")}
              />
            </div>
            <button
              onClick={() => handleRemoveProductToType(product.id)}
              className="flex justify-center items-center rounded-lg  bg-rose-600 hover:bg-rose-500 border w-12 transition ease-in-out duration-150"
            >
              <BiUndo size={18} className="text-white" /> {/* REDO BUTTON */}
            </button>
          </div>
        ) : (
          <>
            <div>
              <SetColors
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
            </div>
            <div className="mt-4">
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
            </div>
            <div className="md:max-w-[200px] sm:w-full mt-4">
              <Button
                label="Add to cart"
                outline={true}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddProductToType(cartProduct);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
