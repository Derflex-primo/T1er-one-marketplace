"use client";

import Container from "@/app/components/Container";
import ProductDetails from "@/app/components/products-ui/ProductDetails";
import ListRating from "@/app/components/products-ui/ListRating";
import { IParams, ProductMapType } from "@/types";
import { useProducts } from "@/hooks/useProducts";
import { ProductDetailsSkeleton } from "@/app/components/skelton-ui/ProductDetailsSkeleton";
import React from "react";

const Product = ({ params }: { params: IParams }) => {
  const { products } = useProducts();

  // Convert products to a map for quicker access.
  const productMap = React.useMemo(() => {
    return products.reduce<ProductMapType>((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }, [products]);
  const productId = params.productId;

  if (!productId) {
    return null;
  }

  const product = productMap[productId];

  if (!product) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        {product.reviews && product.reviews.length > 0 && (
          <ListRating product={product} />
        )}
      </Container>
    </div>
  );
};

export default React.memo(Product);
