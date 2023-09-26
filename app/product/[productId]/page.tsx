"use client";

import Container from "@/app/components/Container";
import ProductDetails from "@/app/components/products-ui/ProductDetails";
import ListRating from "@/app/components/products-ui/ListRating";
import { IParams } from "@/types";
import { useProducts } from "@/hooks/useProducts";
import { ProductDetailsSkeleton } from "@/app/components/skelton-ui/ProductDetailsSkeleton";

// ADD MORE PRODUCTS

const Product = ({ params }: { params: IParams }) => {
  const { products } = useProducts();
  const product = products.find((item) => item.id === params.productId);

  if (!product) {
    return  <ProductDetailsSkeleton />
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

export default Product;
