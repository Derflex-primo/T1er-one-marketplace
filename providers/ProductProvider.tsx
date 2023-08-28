"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductTypes, _InitProductsProps } from "@/types";
import { getProductsFromFirebase } from '@/lib/db/firebaseUtils';

type ProductContextType = {
  products: ProductTypes[] ,
};

interface ProductProviderProps {
    children: React.ReactNode;
  }
  

const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsFromFirebase = await getProductsFromFirebase();
        setProducts(productsFromFirebase);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const value = {
    products,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
