"use client";

import React, { useState } from "react";
import { SpecsProps } from "@/types";
import { colorCategories } from "./ProductDetails";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Michroma } from "next/font/google";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";

// FIX THIS SPECS GET MAP IN EACH VALUE

interface _Specs {
  product: SpecsProps;
  categoryItem: string;
}

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

export const styleSpecs = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: "absolute" as "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1230,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "16px",
};

const Specs: React.FC<_Specs> = ({ product, categoryItem }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function isLink(value: string) {
    const regex = /^(http|https):\/\//;
    return regex.test(value);
  }

  const priorityOrder = [
    "Product condition",
    "Model Number",
    "Release Date",
    "Series",
  ];

  const sortedProductEntries = Object.entries(product).sort(
    // Sorting prioA - prioB
    ([keyA], [keyB]) => {
      const indexA = priorityOrder.indexOf(keyA);
      const indexB = priorityOrder.indexOf(keyB);

      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    }
  );

  return (
    <div>
      <span className={colorCategories}>Specs | </span>
      <button
        onClick={handleOpen}
        className="font-medium text-blue-500 hover:underline underline-offset-2"
      >
        Browse
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        keepMounted
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleSpecs}>
          <Typography
            component="div"
            id="modal-modal-title"
            sx={{
              display: "flex",
              alignItems: "baseline",
              flexDirection: "row",
              textAlign: "start",
              fontWeight: 1000,
              marginLeft: "24px",
              pt: "18px",
              pb: "14px",
            }}
          >
            <span
              className={`text-stone-500 text-sm   capitalize pr-2 items-center ${michroma.className}`}
            >
              {categoryItem}
            </span>
            <span className={`text-sm ${michroma.className}`}>Specs</span>
          </Typography>

          <Button
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              minWidth: "auto",
              paddingRight: "12px",
              paddingTop: "10px",
              "&:hover": {
                backgroundColor: "transparent",
                opacity: 0.8,
              },
            }}
            onClick={handleClose}
          >
            <IoCloseSharp
              className="text-black hover:text-red-500 "
              size={19}
            />
          </Button>

          <Typography component="div">
            <div className="mb-[22px] pt-4 grid grid-cols-2 gap-4 max-h-[650px] overflow-y-auto border-t border ">
              {sortedProductEntries.map(([key, value]) => (
                <div className="flex flex-col pl-[25px] text-xs" key={key}>
                  <span className="font-semibold">{key}</span>
                  {isLink(value) ? (
                    <a href={value} target="_blank" className="text-sky-500" rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Specs;
