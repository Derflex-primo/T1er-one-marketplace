import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { PiShoppingBagOpenThin } from "react-icons/pi";

const CartCount = () => {
  const router = useRouter();
  const { cartTotalQty } = useCart();

  return (
    <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
      <div className="text-3xl">
        <PiShoppingBagOpenThin />
      </div>
      {cartTotalQty > 0 && ( // Show the span only if cartTotalQty > 0
        <span
          className="
            absolute 
            top-[-5px] 
            right-[-6px]
            bg-stone-600
            text-white
            h-4
            w-4
            rounded-full
            flex
            items-center
            justify-center
            text-xs"
        >
          {cartTotalQty}
        </span>
      )}
    </div>
  );
};

export default CartCount;

