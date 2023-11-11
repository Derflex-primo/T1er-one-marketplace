"use client";

import { useProducts } from "@/hooks/useProducts";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard, { productsWrap } from "./components/products-ui/ProductCard";
import ProductCardSkeleton from "./components/skelton-ui/ProductCardSkeleton";
import React from 'react';

const MemoizedHomeBanner = React.memo(HomeBanner);
const MemoizedProductCard = React.memo(ProductCard);

const Page = () => {
  const { products, isLoading } = useProducts();
  
  return (
    <div>
      <Container>
        <MemoizedHomeBanner />
        <div className={productsWrap}>
          {isLoading ? (
            Array(5).fill(0).map((_, index) => <ProductCardSkeleton key={index} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <MemoizedProductCard key={product.id} data={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Page;

























// PROBLEM - Na searh product su man delete ya el content andentro del input - sale dayun el fallback ui - so if online el context na input - apekta tamen el filter online - it should prevent fall back if filter is online
