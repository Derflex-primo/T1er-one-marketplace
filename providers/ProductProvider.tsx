"use client";
import { ProductContextProvider } from "@/hooks/useProducts";

interface ProductProviderProps {
  children: React.ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  return (
    <ProductContextProvider>
      {children}
    </ProductContextProvider>
  );
}

export default ProductProvider;
