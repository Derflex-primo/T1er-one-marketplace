"use client";

import Container from "@/app/components/Container"
import ProductDetails from "@/app/components/products-ui/ProductDetails"
import ListRating from "@/app/components/products-ui/ListRating"
import { IParams } from "@/types";
import { useProducts } from "@/hooks/useProducts";


// ADD MORE PRODUCTS

const Product = ({ params }: { params: IParams }) => {
  const { products } = useProducts();
  const product = products.find((item) => item.id === params.productId)

  if (!product) {
    return <div>Product not found</div>;  // Or redirect to a 404 page
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}  />
        <div className="flex flex-col  mt-8 gap-32">
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;

