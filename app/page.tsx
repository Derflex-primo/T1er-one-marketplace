"use client";


import { useProducts } from "@/hooks/useProducts";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard, { productsWrap } from "./components/products-ui/ProductCard";
import ProductCardSkeleton from "./components/skelton-ui/ProductCardSkeleton";



const Page = () => {
  const { products, isLoading } = useProducts()  
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <div className={productsWrap}>
          {isLoading ? (
            Array(5).fill(0).map((_, index) => <ProductCardSkeleton key={index} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} data={product} />
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
