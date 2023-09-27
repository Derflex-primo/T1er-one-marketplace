"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ProductTypes } from "@/types";
import { getProductsFromFirebase } from '@/lib/db/firebaseUtils';

export type ProductContextType = {
  products: ProductTypes[],
  isLoading: boolean
};

export const ProductContext = createContext<ProductContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const ProductContextProvider: React.FC<Props> = (props) => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // initial false

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // set to true when starting fetch
      try {
        const productsFromFirebase = await getProductsFromFirebase();
        setProducts(productsFromFirebase);
      } catch (error) {
        console.log(error);

      } finally{
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const value = useMemo(() => ({ 
    products,
    isLoading 
  }), [products, isLoading]);

  return <ProductContext.Provider value={value} {...props} />;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
