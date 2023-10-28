import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiChevronDown } from "react-icons/fi";

export type Options =
  | "Price High to low"
  | "Price Low to high"
  | "Top Discount"
  | "Gadjet A - Z"
  | "Gadjet Z - A";

const options: { [x: string]: Options } = {
  priceHighToLow: "Price High to low",
  priceLowToHigh: "Price Low to high",
  topDiscount: "Top Discount",
  "gadjet-Z": "Gadjet A - Z",
  "gadjet-A": "Gadjet Z - A",
};

const SortByLevels = ({ currentSort, setSort }: { currentSort: Options; setSort: React.Dispatch<React.SetStateAction<Options>> }) => {
    const [open, setOpen] = useState(false);
    const [sortSelection, setSortSelection] = useState<Options>("Price High to low");
    const [isClicked, setIsClicked] = useState(false);
  
    return (
      <DropdownMenu.Root onOpenChange={(open) => {
        setOpen(open);
        setIsClicked(true);
      }}>
        <DropdownMenu.Trigger className={`flex flex-row items-center  z-30 px-4 py-3 bg-stone-100 rounded-xl dark:ring-stone-50 outline-none ${isClicked && !open ? "bg-stone-200" : ""}`}>
          <span className="text-stone-900 ">{sortSelection}</span>
          <FiChevronDown
            className={`h-5 w-5 text-stone-900 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          align="end"
          sideOffset={12}
          className="cursor-pointer bg-white  z-30 overflow-hidden rounded-[8px] border-b-none  md:w-44 "
        >
          {Object.keys(options).map((key) => (
            <DropdownMenu.Item
            onSelect={() => {
              setSort(options[key]);
              setSortSelection(options[key]);   
              setIsClicked(false);
            }}          
              key={key}
              disabled={sortSelection === options[key]}
              className={` rounded-none px-4 py-3 border-b bg-stone-100 hover:bg-stone-200 focus:outline-none`}
              aria-label={`Sort by ${options[key]}`}
            >
              {options[key]}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  };
  
  export default SortByLevels;
  
