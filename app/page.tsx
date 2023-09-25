"use client";


import { useProducts } from "@/hooks/useProducts";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard, { productsWrap } from "./components/products-ui/ProductCard";



const Page = () => {
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

export default Page;
