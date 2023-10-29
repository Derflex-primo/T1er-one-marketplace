import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

const CartCount = () => {
  const { cartTotalQty } = useCart();

  const [scrolled, setScrolled] = useState(false);

  const changedBackground = () => {
    if (window.scrollY >= 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changedBackground);

    return () => {
      window.removeEventListener("scroll", changedBackground);
    };
  }, []);

  return (
    <Link href={`/cart`}>
    <div className="relative cursor-pointer p-1">
      <div className={`text-3xl ${scrolled ? 'text-white' : ''} `}>
        <MdOutlineShoppingCart  size={26}/>
      </div>
      {cartTotalQty > 0 && ( // Show the span only if cartTotalQty > 0
        <span
          className={`
            absolute 
            top-[-5px] 
            right-[-6px]
            bg-rose-600
            text-white
            h-4
            w-4
            rounded-full
            flex
            items-center
            justify-center
            text-xs 
            ${scrolled ? 'text-white' : ''} transition-all ease-in-out duration-75
          `}
        >
          {cartTotalQty}
        </span>
      )}
    </div>
    </Link>
  );
};

export default CartCount;

