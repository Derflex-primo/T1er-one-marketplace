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

export const Horizontal = () => {
  return <hr className="w-[100%] my-2" />;
};
export const colorCategories =
  "font-medium text-xs text-stone-600 cursor-default";
export const productDetails = "grid grid-cols-1 md:grid-cols-2 gap-12";

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

  return (
    <div className={productDetails}>
      <ProductImage cartProduct={cartProduct} product={product} />
      <div className="flex flex-col gap-1 text-sm">
        <div className="border p-4 rounded-xl cursor-default">
          <span className="text-2xl font-medium text-stone-800">
            {product.name}
          </span>

          <span className="flex  flex-wrap justify-between items-center">
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
            <div className="flex justify-between mt-2 space-x-2 items-center sm:flex-row-reverse md:flex-row">
              <span className={productRating}>
                reviews{" "}
                <strong className="text-rose-500">
                  {product.reviews?.length}
                </strong>
              </span>
              {product.reviews?.length === 0 ? null : (
                <Rating sx={{ fontSize: "1rem" }} readOnly />
              )}
            </div>
          </span>
        </div>
        <div className="border p-4 rounded-xl mt-2">
          <div className={`${colorCategories} mb-2`}>Product info</div>
          <p className="text-stone-500 text-justify">
            {expanded ? product.description : product.description.slice(0, 468)}
            {!expanded && product.description.length > 468 && "..."}
          </p>
          {product.description.length > 468 && (
            <button className="hover:underline" onClick={toggleDescription}>
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </div>
        <div className="border rounded-xl p-4 mt-2 mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-template-columns repeat(4, min-content) gap-6 items-center">
          <span className="flex bg-stone-100 rounded-lg p-2 space-x-2 items-center font-semibold">
            <span className={colorCategories}>Category</span>
            <span className="text-black text-xs capitalize cursor-default">
              {product.category}
            </span>
          </span>
          <span className="flex  bg-stone-100 rounded-lg p-2  space-x-2 items-center font-semibold">
            <span className={colorCategories}>Brand</span>
            <span className="text-black text-xs font-semibold cursor-default">
              {product.brand}
            </span>
          </span>
          <span>
            {product.specs ? (
              <Specs product={product.specs} categoryItem={product.category} />
            ) : null}
          </span>
          <span className="flex  bg-stone-100 rounded-lg p-2  space-x-2 items-center font-semibold">
            <span className={colorCategories}>Status</span>
            <span
              className={`
            ${
              product.quantity > 0
                ? "text-green-400 font-semibold cursor-default text-xs"
                : "text-rose-400 font-semibold cursor-default text-xs"
            }`}
            >
              {product.quantity > 0 ? "In stock" : "Out of stock"}
            </span>
          </span>
        </div>

        {isProductInCart ? (
          <div className="flex gap-1 ">
            <div className="md:max-w-[200px] sm:w-full ">
              <Button
                label="View Cart"
                outline={true}
                onClick={() => router.push("/cart")}
              />
            </div>
            <button
              onClick={() => handleRemoveProductToType(product)}
              className="flex justify-center items-center rounded-lg  bg-stone-800 hover:bg-stone-700 border w-12"
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
