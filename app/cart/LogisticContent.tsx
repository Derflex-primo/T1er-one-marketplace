import React, { ChangeEvent, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiChevronDown } from "react-icons/fi";
import { formatUSDWithComma, logisticsPartnersPH } from "@/lib/utils/formats";

const LogisticContent = () => {
  const [selectedLogistics, setSelectedLogistics] = useState(logisticsPartnersPH[0].label);
  const [shippingFee, setShippingFee] = useState(0);
  const [open, setOpen] = useState(false);

  const calculateShippingFee = (logistics: string): number => {
    // Your calculation logic here
    return 100;
  };

  const handleLogisticsChange = (value: string) => {
    setSelectedLogistics(value);
    const fee = calculateShippingFee(value);
    setShippingFee(fee);
  };

  return (
    <DropdownMenu.Root onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="flex flex-row items-center  z-30 px-4 py-3 border rounded-xl dark:ring-stone-50 outline-none font-semibold ">
        <span>{selectedLogistics}</span>
        <FiChevronDown className={`h-5 w-5 ml-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        sideOffset={5}
        className="cursor-pointer p-3 bg-white z-30 overflow-hidden border-[0.5px] rounded-2xl border-b-none  md:w-56 shadow-2xl"
      >
        {logisticsPartnersPH.map((option) => (
          <DropdownMenu.Item
            key={option.value}
            onSelect={() => handleLogisticsChange(option.label)}
            className={`rounded-lg px-4 py-3 border-non focus:outline-none font-semibold  outline-none  hover:bg-stone-100 ${selectedLogistics === option.value ? "bg-stone-100" : ""}`}
          >
            {option.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default LogisticContent;
