"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button:React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    custom,
    icon: Icon,
    onClick
}) => {
  return (
  <button 
   disabled={disabled} 
   className={`
   mt-4
   disabled:opacity-70
   disabled:cursor-not-allowed
   hover:opacity-80
   w-full
   gap-2
   inline-flex 
   justify-center 
   items-center 
   text-sm 
   font-medium 
   text-center 
   text-white 
   bg-stone-700 
   rounded-lg 
   hover:bg-stone-800 
   focus:ring-4 
   focus:outline-none 
   focus:ring-stone-300 
   dark:bg-stone-600 
   dark:hover:bg-stone-700
   dark:focus:ring-stone-800
   ${outline? "bg-white" : "bg-stone-500"}
   ${outline? "text-stone-700" : "text-white"}
   ${small? "text-sm font-light" : "text-md "}
   ${small? "py-1 px-2" : "py-3 px-4"}
   ${custom? custom : ""}
   `}>
    {Icon && <Icon size={24} />}
    {label}
  </button>)
};

export default Button;
