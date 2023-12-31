"use client";

import { ProductTypes } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type PinnedContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: ProductTypes[] | null;
  handleAddPinnedProductToType: (product: ProductTypes) => void;
  handleRemoveProductToType: (product: ProductTypes) => void;
  handleCartQtyIncrease: (product: ProductTypes) => void;
  handleCartQtyDecrease: (product: ProductTypes) => void;
  handleClearCart: () => void;
};

export const PinnedContext = createContext<PinnedContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const PinnedContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<ProductTypes[] | null>(
    null
  );
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  const initializeCart = () => {
    const cartItems: any = localStorage.getItem("tierOneItems");
    const effectCartProducts: ProductTypes[] | null = JSON.parse(cartItems);
    setCartProducts(effectCartProducts);
  }

  useEffect(() => {
    initializeCart();
  }, []);

  useEffect(() => {
    if (cartProducts) {
      let totalAmount = 0;
      let totalQty = 0;

      cartProducts.forEach(item => {
        totalAmount += item.type[0].price * item.quantity;
        totalQty += item.quantity;
      });

      setCartTotalQty(totalQty);
      setCartTotalAmount(totalAmount);
    }
  }, [cartProducts]);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.type[0].price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      };
    };
    getTotals();
  }, [cartProducts]);

  const handleAddPinnedProductToType = useCallback((product: ProductTypes) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      console.log("handleAddPinnedProductToType is called");

      toast.success("Pinned");
      localStorage.setItem("tierOneItems", JSON.stringify(updatedCart)); // Change this to db
      return updatedCart;
    });
  }, []);

  const handleRemoveProductToType = useCallback(
    (product: ProductTypes) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);
        toast.success("Product has been removed");
        localStorage.setItem("tierOneItems", JSON.stringify(filteredProducts));
        return filteredProducts;
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: ProductTypes) => {
      let updatedCart;

      if (product.quantity === 99) {
        return toast.error("Oops! Reached maximum order");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("tierOneItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: ProductTypes) => {
      let updatedCart;

      if (product.quantity === 1) {
        return toast.error("Oops!");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("tierOneItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null); 
    setCartTotalQty(0);  
    setCartTotalAmount(0); 
    localStorage.setItem("tierOneItems", JSON.stringify(null));  
  }, []);
  
  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddPinnedProductToType,
    handleRemoveProductToType,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
  };

  return <PinnedContext.Provider value={value} {...props} />;
};

export const usePinned = () => {
  const context = useContext(PinnedContext);
  if (context === null) {
    throw new Error("must be used within the provider");
  }
  return context;
};