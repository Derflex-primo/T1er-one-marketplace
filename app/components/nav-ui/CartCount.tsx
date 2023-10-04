import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiShoppingBagOpenThin } from "react-icons/pi";

const CartCount = () => {
  const router = useRouter();
  const { cartTotalQty } = useCart();

  const [scrolled, setScrolled] = useState(false);

  function throttle(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;
  
    return function(...args: any[]) {
      if (!timeout) {
        timeout = setTimeout(() => {
          func(...args);
          timeout = null;
        }, wait);
      }
    };
  }
  
  useEffect(() => {
    const handleScroll = throttle(() => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    }, 100);  // throttle to run once every 100ms
  
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
      <div className={`text-3xl ${scrolled ? 'text-white' : ''} transition-all ease-in-out duration-75`}>
        <PiShoppingBagOpenThin />
      </div>
      {cartTotalQty > 0 && ( // Show the span only if cartTotalQty > 0
        <span
          className={`
            absolute 
            top-[-5px] 
            right-[-6px]
            bg-stone-800
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
  );
};

export default CartCount;

