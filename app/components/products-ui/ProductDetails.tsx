"use client";

// RE - DO PRODUCT DETAILS - ui

import { Rating } from "@mui/material";
import { productRating } from "./ProductCard";
import React, { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import SetColors from "./SetColors";
import SetQuantity from "./SetQuantity";
import Button from "./Button";
import ProductImage from "./ProductImage";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { ProductTypes, ProductDetailsProps, ImageProps } from "@/types";
import Specs from "./Specs";

const Horizontal = () => {
  return <hr className="w-[100%] my-2" />;
};
export const colorCategories = "font-medium text-stone-600 cursor-default";
export const productDetails = "grid grid-cols-1 md:grid-cols-2 gap-12";

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToType, cartProducts } = useCart(); //handles add to cart from CartContextProvider
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
    return new Intl.NumberFormat("en-US").format(number);
  };

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
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);

  return (
    <div className={productDetails}>
      <ProductImage cartProduct={cartProduct} product={product} />
      <div className="flex flex-col gap-1 text-sm">
        <span className="text-2xl font-medium text-stone-800">
          {product.name}
        </span>

        <span className="flex flex-wrap justify-between items-center">
          <span className="flex space-x-4 items-center">
            <span className="flex text-base space-x-2 text-black ">
              <h1 className="text-green-500">{product.type[0].options}</h1>
              <h1>{formatWithComma(product.type[0].price)}</h1>
            </span>
            <span className="bg-rose-600 text-white font-semibold px-1">
              Save 30%
            </span>
          </span>
          <span></span>
        </span>
        <Horizontal />
        <div>
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
        <Horizontal />
        <div className="flex space-x-10 mb-6">
          <span className={colorCategories}>
            Category | <span className="text-black">{product.category}</span>
          </span>
          <span className={colorCategories}>
            Brand | <span className="text-black">{product.brand}</span>
          </span>
          <span>
            <span>
              {product.specs ? (
                <Specs product={product.specs} categoryItem={product.category} />
              ) : null}
            </span>
          </span>
          <span
            className={`
              ${
                product.quantity > 0
                  ? "text-green-400 font-semibold"
                  : "text-rose-400 font-semibold"
              }`}
          >
            <span className={colorCategories}>Status |</span>{" "}
            {product.quantity > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>

        {isProductInCart ? (
          <>
            <p className="flex items-center gap-1 text-stone-500">
              <MdCheckCircle size={18} className="text-sky-500" />
              <span>Product added to your cart</span>
            </p>
            <div>
              <button className="md:max-w-[200px] sm:w-full mt-4">
                <Button
                  label="View Cart"
                  outline={true}
                  onClick={() => router.push("/cart")}
                />
              </button>
            </div>
          </>
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
                onClick={() => handleAddProductToType(cartProduct)}
              />
            </div>
          </>
        )}

        {/* <div className="flex justify-between space-x-2 items-center sm:flex-row-reverse md:flex-row">
              <Rating sx={{ fontSize: "1rem" }} readOnly />
              <span className={productRating}>
                reviews{" "}
                <strong className="text-rose-500">
                  {product.reviews?.length}
                </strong>
              </span>
        </div>*/}
      </div>
    </div>
  );
};

export default ProductDetails;
