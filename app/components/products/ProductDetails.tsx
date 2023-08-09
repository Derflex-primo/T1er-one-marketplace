"use client";

import { product } from "@/utils/product";
import { Rating } from "@mui/material";
import { productRating } from "./ProductCard";
import { formatUSDWithComma } from "@/utils/formatter";
import React, { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import SetColors from "./SetColors";
import SetQuantity from "./SetQuantity";
import Button from "./Button";
import ProductImage from "./ProductImage";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: any;
}

export type CartProductsType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[100%] my-2" />;
};
export const colorCategories = "font-medium text-stone-600";
const productDetails = "grid grid-cols-1 md:grid-cols-2 gap-12";
const productShowRating =
  product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
  product.reviews.length;

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToType, cartProducts } = useCart(); //handles add to cart from CartContextProvider
  const [isProductInCart, setIsProductInCart] = useState(false);
  console.log(cartProducts);
  const [expanded, setExpanded] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductsType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
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
  }, [cartProducts]);

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

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
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-sm">
        <span className="text-2xl font-medium text-stone-800">
          {product.name}
        </span>

        <span className="flex flex-wrap justify-between items-center">
          <span className="flex space-x-4 items-center">
            <span className="text-base  text-black ">
              {formatUSDWithComma(product.price)}
            </span>
            <span className="bg-green-300 px-1">Save 30%</span>
          </span>
          <span>
            <div className="flex justify-between space-x-2 items-center sm:flex-row-reverse md:flex-row">
              <Rating
                sx={{ fontSize: "1rem" }}
                value={productShowRating}
                readOnly
              />
              <span className={productRating}>
                reviews{" "}
                <strong className="text-rose-500">
                  {product.reviews.length}
                </strong>
              </span>
            </div>
          </span>
        </span>
        <Horizontal />
        <div>
          <p className="text-stone-500 text-justify ">
            {expanded ? product.description : product.description.slice(0, 468)}
            {!expanded && "...."}
          </p>
          <button className="hover:underline " onClick={toggleDescription}>
            {expanded ? "See less" : "See more"}
          </button>
        </div>
        <Horizontal />
        <div className="flex space-x-10 mb-6">
          <span className={colorCategories}>
            Category | <span className="text-black">{product.category}</span>
          </span>
          <span className={colorCategories}>
            Brand | <span className="text-black">{product.brand}</span>
          </span>
          <span
            className={`
              ${
                product.inStock
                  ? "text-green-400 font-semibold"
                  : "text-rose-400 font-semibold"
              }`}
          >
            <span className={colorCategories}>Status |</span>{" "}
            {product.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        {isProductInCart ? (
          <>
            <p className="flex items-center mb-2 gap-1 text-stone-500">
              <MdCheckCircle size={20} className="text-sky-400" />
              <span>Product added to your cart</span>
            </p>
            <div>
              <button>
                <Button
                  label="View Cart"
                  outline
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
            <div>
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
            </div>
            <div className="md:max-w-[200px] sm:w-full">
              <Button
                label="Add to cart"
                onClick={() => handleAddProductToType(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
