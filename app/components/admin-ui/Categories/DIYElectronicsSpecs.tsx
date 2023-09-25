import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, SpecsProps } from "@/types";

export interface DIYElectronicsSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: SpecsProps) => void;
}

export const DIYElectronicsSpecs: React.FC<DIYElectronicsSpecsProps> = ({
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
  const diyElectronicsFields = [
    "Component Type",
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Voltage Rating",
    "Current Rating",
    "Resistance",
    "Capacitance",
    "Inductance",
    "Operating Temperature Range",
    "Tolerance",
    "Package Type",
    "Dimensions (L x W x H)",
    "Weight",
    "Datasheet",
    "Price",
    "Availability",
    "Warranty Information",
    "Manufacturer Website",
    "Product Manual",
    "Application Notes",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">DIY Electronics Specifications</h2>
      <div className={containerDisplay}>
        {diyElectronicsFields.map((field, index) => (
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
