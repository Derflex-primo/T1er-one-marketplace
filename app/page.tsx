"use client";

import { useProducts } from "@/providers/ProductProvider";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";


const productsWrap = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
const page = () => {
  const { products } = useProducts()  
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <div className={productsWrap}>
         {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
        </div>
      </Container>
    </div>
  );
};

export default page;
