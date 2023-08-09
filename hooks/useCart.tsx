import { CartProductsType } from "@/app/components/products/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductsType[] | null,
    handleAddProductToType: (product: CartProductsType) => void
}

 
export const CartContext  =  createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductsType[] | null>(null)

    useEffect(() => {
     const cartItems: any = localStorage.getItem("tierOneItems");
     const effectCartProducts: CartProductsType[] | null = JSON.parse(cartItems);
     setCartProducts(effectCartProducts);
    },[])

    const handleAddProductToType = useCallback((product: CartProductsType) => {
      setCartProducts((prev) => {
        let updatedCart;

        if(prev){
            updatedCart = [...prev, product];
        }else {
            updatedCart = [product];
        }
        localStorage.setItem("tierOneItems", JSON.stringify(updatedCart));
        return updatedCart;
      })
    }, [])

    const value =  {
        cartTotalQty ,
        cartProducts,
        handleAddProductToType
    }

  return <CartContext.Provider value={value} {...props}/> 
}

 
export const useCart = () => {
   const context = useContext(CartContext);
   if(context === null) {
    throw new Error("must be used within the provider")
   }
   return context
}

