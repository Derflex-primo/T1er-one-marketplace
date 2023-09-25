import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, SpecsProps } from "@/types";

export interface DesktopSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: SpecsProps) => void;
}

export const DesktopSpecs: React.FC<DesktopSpecsProps> = ({ specs, onSpecsChange }) => {
  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    const newSpecs = {
      ...specs,
      [name]: value,
    };

    onSpecsChange(newSpecs);
  };
  const desktopFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Processor",
    "Processor Speed",
    "Processor Cores",
    "Memory (RAM) Type",
    "Memory (RAM) Size",
    "Storage Type",
    "Storage Capacity",
    "Graphics Card",
    "Graphics Card Memory",
    "Operating System",
    "Monitor Size",
    "Monitor Resolution",
    "Monitor Refresh Rate",
    "Connectivity Ports",
    "USB Ports",
    "Audio Ports",
    "Ethernet Ports",
    "Wireless Connectivity (Wi-Fi)",
    "Bluetooth",
    "Optical Drive (Yes/No)",
    "Power Supply",
    "Power Consumption",
    "Dimensions (Height, Width, Depth)",
    "Weight",
    "Country of Origin",
    "Certifications",
    "Package Contents",
    "Manufacturer Website",
    "Product Manual",
    "Warranty Information",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Desktop Specifications</h2>
      <div className={containerDisplay}>
        {desktopFields.map((field, index) => (
          <div className={"flex flex-col mb-4"} key={index}>
            <label>{field}:</label>
            <input
              type="text"
              name={field}
              value={specs[field] || ""}
              onChange={handleInputChange}
              className={inputUi}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
