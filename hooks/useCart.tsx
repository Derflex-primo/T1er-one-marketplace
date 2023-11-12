"use client";

import { CartProduct, ProductTypes } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProduct[] | null;
  handleAddProductToType: (product: ProductTypes) => void;
  handleRemoveProductToType: (cartItemId: string) => void;
  handleCartQtyIncrease: (product: ProductTypes) => void;
  handleCartQtyDecrease: (product: ProductTypes) => void;
  handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  const initializeCart = () => {
    const cartItemsString = localStorage.getItem("tierOneItems");
    let effectCartProducts: CartProduct[] | null = null;
  
    if (cartItemsString) {
      const parsedItems: ProductTypes[] = JSON.parse(cartItemsString);
  
      if (parsedItems) { // Check if parsedItems is not null
        // Map each ProductTypes object to a CartProduct object, adding a cartItemId.
        effectCartProducts = parsedItems.map((item) => ({
          ...item,
          // Only add a cartItemId if one doesn't already exist
          cartItemId: (item as any).cartItemId ?? uuidv4(),
        }));
      }
    }
  
    setCartProducts(effectCartProducts);
  };
  
  
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

  const handleAddProductToType = useCallback((product: ProductTypes) => {
    setCartProducts((prev) => {
      let updatedCart;
      const cartItem: CartProduct = {
        ...product,
        cartItemId: uuidv4(), // Add a unique cart item ID
      };
  
      if (prev) {
        updatedCart = [...prev, cartItem];
      } else {
        updatedCart = [cartItem];
      }
      console.log("handleAddProductToType is called");
  
      toast.success("Product added to cart");
      localStorage.setItem("tierOneItems", JSON.stringify(updatedCart)); // Change this to db
      return updatedCart;
    });
  }, []);
  

  const handleRemoveProductToType = useCallback((id: string) => {
    setCartProducts((prev) => {
      if (prev) {
        const updatedCart = prev.filter((item) => item.id !== id);
        toast.success("Product has been removed");
        localStorage.setItem("tierOneItems", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return null;
    });
  }, []);

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
    localStorage.setItem("tierOneItems", JSON.stringify(null));
  }, [cartProducts]);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToType,
    handleRemoveProductToType,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("must be used within the provider");
  }
  return context;
};