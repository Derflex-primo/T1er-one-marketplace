"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductTypes } from "@/types";
import { getProductsFromFirebase } from '@/lib/db/firebaseUtils';

export type ProductContextType = {
  products: ProductTypes[],
};

export const ProductContext = createContext<ProductContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const ProductContextProvider: React.FC<Props> = (props) => {
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

  return <ProductContext.Provider value={value} {...props} />;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

