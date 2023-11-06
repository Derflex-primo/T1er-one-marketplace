import { usePinned } from "@/hooks/usePinned";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle, AiOutlinePushpin } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import {
  formatModel,
  formatPinnedStr,
  formatUSDWithComma,
} from "@/lib/utils/formats";
import Button from "../products-ui/Button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { TfiTrash } from "react-icons/tfi"

 

// WHEN THE PRODUCT WAS HOVER SHOW DELETE ICON

const style = {
  position: "absolute" as "absolute",
  top: "15%",
  right: "2.5%",
  transform: "translate(0%, 0%)",
  maxHeight: "90%",
  overflowY: "auto",
  width: 330,
  bgcolor: "background.paper",
  boxShadow: 6,
  pt: 3,
  mt: 3,
  borderRadius: "16px",
  border: "0.8px",
};

const modalBackdropStyle = {
  "& .MuiBackdrop-root": {
    backgroundColor: "transparent",
  },
};

const Pinned = () => {
  const {
    cartProducts,
    handleClearCart,
    handleRemoveProductToType,
    cartTotalAmount,
    cartTotalQty,
  } = usePinned();

  const { handleAddProductToType } = useCart();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const router = useRouter();

  const addPinnedToCart = () => {
    cartProducts?.forEach((product) => {
      handleAddProductToType(product);
    });
    handleClearCart();
    router.push(`/cart`);
  };

  const completePurchaseAndClose = () => {
    addPinnedToCart();
    handleClose();
  };

  return (
    <div>
      <button className={`flex items-center cursor-pointer space-x-1 ${cartTotalQty > 0 ? "text-rose-600" : ""} `} onClick={handleOpen}>
        <span>
          <AiOutlinePushpin size={18} />
        </span>
        <span>Pinned</span>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
        sx={modalBackdropStyle}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography component="div" id="modal-modal-title">
              <div className=" pb-4 border-b-[0.8px]">
                <div className="flex px-6  justify-between items-center ">
                  <div className="flex items-center  space-x-3">
                    <span className="text-lg font-semibold select-none">
                      Your pinned
                    </span>
                    <span>
                      <AiOutlineInfoCircle size={16} />
                    </span>
                  </div>
                  <div
                    onClick={() => handleClose()}
                    className="cursor-pointer "
                  >
                    <IoCloseSharp className="text-black" size={19} />
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <div className="px-6">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-stone-900 font-semibold select-none">
                      {`${cartProducts?.length || 0}`}
                      {` `}
                      {cartProducts?.length && cartProducts?.length > 1
                        ? "items"
                        : "item"}
                    </div>
                    <div
                      onClick={() => handleClearCart()}
                      className="text-sm cursor-pointer text-stone-900 font-semibold"
                    >
                      Clear all
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="px-4 pt-3 mb-3">
                {cartProducts?.map((product) => (
                  <div
                    key={product.id}
                    className="mt-2 cursor-pointer hover:bg-stone-100 rounded-xl transition ease-in-out duration-150 group"
                  >
                    <div className="p-2 flex flex-row justify-between   items-center space-x-4 ">
                      <div className="flex flex-row   items-center space-x-4 ">
                        <div className="p-1  bg-white border-[0.8px] shadow-inner rounded-xl">
                          <Image
                            src={product.selectedImg?.image || ""}
                            alt={product.name || "product image"}
                            width={56}
                            height={56}
                          />
                        </div>
                        <div className="flex flex-col content-center gap-1">
                          <span className="text-sm font-semibold  ">
                            {formatPinnedStr(product.name)}
                          </span>
                          <span className="flex flex-row items-center space-x-2">
                            <span className="text-sm">
                              {product.specs &&
                                Object.values(
                                  formatModel(product.specs?.Model)
                                )}
                            </span>
                            <div
                              className="space-x-2 h-4 w-4 rounded-full"
                              style={{
                                backgroundColor: product.selectedImg?.colorCode,
                              }}
                            ></div>
                          </span>
                        </div>
                      </div>
                      <div
                        className="pl-8 text-sm group-hover:hidden"
                        onClick={() => handleRemoveProductToType(product)}
                      >
                        {formatUSDWithComma(product.type[0].price)}
                      </div>
                      <TfiTrash onClick={() => handleRemoveProductToType(product)} className="hidden group-hover:block mr-2" /> 
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-3 mb-4 border-t-[0.8px]">
                <div className="font-semibold text-sm flex justify-between items-center p-2 select-none">
                  <div>Total price</div>
                  <div>{formatUSDWithComma(cartTotalAmount)}</div>
                </div>
                <div className="pt-8">
                  <Button
                    label="Complete purchase"
                    outline={true}
                    onClick={completePurchaseAndClose}
                  />
                </div>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Pinned;
