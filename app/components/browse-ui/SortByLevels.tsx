import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiChevronDown } from "react-icons/fi";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

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

const SortByLevels = ({
  currentSort,
  setSort,
}: {
  currentSort: Options;
  setSort: React.Dispatch<React.SetStateAction<Options>>;
}) => {
  const [open, setOpen] = useState(false);
  const [sortSelection, setSortSelection] =
    useState<Options>("Price High to low");
  const [isClicked, setIsClicked] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 972);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 972);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DropdownMenu.Root
      onOpenChange={(open) => {
        setOpen(open);
        setIsClicked(true);
      }}
    >
      <DropdownMenu.Trigger
        className={`flex flex-row items-center z-30 px-2 py-2 md:px-4 md:py-3 border rounded-xl dark:ring-stone-50 outline-none font-semibold ${
          isClicked && !open ? "" : ""
        }`}
      >
        <span className="text-xs md:text-base  text-stone-900 ">
          {isSmallScreen ? <HiMiniArrowsUpDown size={24} /> : sortSelection}
        </span>
        <FiChevronDown
          className={`hidden md:flex h-5 w-5 ml-3 text-stone-900 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        sideOffset={12}
        className="cursor-pointer p-3 bg-white z-30 overflow-hidden border-[0.5px] rounded-2xl border-b-none  md:w-56 shadow-2xl  "
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
            className={` text-sm md:text-base rounded-lg px-2 py-2 md:px-4 md:py-3 border-non focus:outline-none font-semibold  outline-none  hover:bg-stone-100`}
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
