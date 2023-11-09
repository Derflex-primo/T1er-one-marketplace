import React, { ChangeEvent, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiChevronDown } from "react-icons/fi";
import { LogisticsPartner, formatUSDWithComma, logisticsPartnersPH } from "@/lib/utils/formats";


interface LogisticContentProps {
  selectedLogisticsPartner: LogisticsPartner;
  handleLogisticsChange: (selectedOption: LogisticsPartner) => void;
}



const LogisticContent: React.FC<LogisticContentProps> = ({ selectedLogisticsPartner, handleLogisticsChange }) => {
  const [open, setOpen] = useState(false);



  return (
    <DropdownMenu.Root onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="flex flex-row items-center  z-30 px-4 py-3 border rounded-xl dark:ring-stone-50 outline-none font-semibold ">
      <span>{selectedLogisticsPartner.label}</span>
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
            onSelect={() => handleLogisticsChange(option)}
            className={`rounded-lg px-4 py-3 border-non focus:outline-none font-semibold  outline-none  hover:bg-stone-100 ${selectedLogisticsPartner.value === option.value ? "bg-stone-100" : ""}`}
          >
            {option.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default LogisticContent;
