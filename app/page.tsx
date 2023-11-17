"use client";

import { useProducts } from "@/hooks/useProducts";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard, {
  productsWrap,
} from "./components/products-ui/ProductCard";
import ProductCardSkeleton from "./components/skelton-ui/ProductCardSkeleton";
import React from "react";

const MemoizedHomeBanner = React.memo(HomeBanner);
const MemoizedProductCard = React.memo(ProductCard);

const Page = () => {
  const { products, isLoading } = useProducts();

  return (
    <Container>
      <MemoizedHomeBanner />
      <div className={productsWrap}>
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => <ProductCardSkeleton key={index} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <MemoizedProductCard key={product.id} data={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </Container>
  );
};

export default Page;

 
