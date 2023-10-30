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
   onClick={onClick}
   disabled={disabled} 
   className={`
   disabled:opacity-70
   disabled:cursor-not-allowed
   w-full
   gap-2
   inline-flex 
   justify-center 
   items-center 
   text-base 
   font-semibold 
   text-center 
   text-white 
   bg-rose-600 
   rounded-xl 
   hover:bg-rose-500 
   focus:ring-4 
   focus:outline-none 
  focus:ring-rose-400 
   transition ease-in-out delay-100
   ${outline? "dark:bg-rose-600" : "bg-rose-600"}
   ${outline? "text-stone-100" : "text-white"}
   ${small? "text-sm font-light" : "text-md "}
   ${small? "py-1 px-2" : "py-3 px-4"}
   ${custom? custom : ""}
   `}>
    {Icon && <Icon size={24} />}
    {label}
  </button>)
};

export default Button;
