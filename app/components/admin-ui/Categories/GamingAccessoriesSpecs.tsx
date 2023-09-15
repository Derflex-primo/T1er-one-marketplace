import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface GamingAccessoriesSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const GamingAccessoriesSpecs: React.FC<GamingAccessoriesSpecsProps> = ({
  specs,
  onSpecsChange,
}) => {
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
  const gamingAccessoriesFields = [
    "Accessory Type",
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Compatibility",
    "Connectivity Type",
    "Wireless (Yes/No)",
    "Wired (Yes/No)",
    "Cable Length",
    "Color Options",
    "Dimensions (Height x Width x Depth)",
    "Weight",
    "Power Source",
    "Battery Life",
    "Charging Time",
    "Charging Method",
    "Supported Platforms",
    "Compatible Games",
    "Special Features",
    "Manufacturer Website",
    "Product Manual",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Gaming Accessories Specifications</h2>
      <div className={containerDisplay}>
        {gamingAccessoriesFields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
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
