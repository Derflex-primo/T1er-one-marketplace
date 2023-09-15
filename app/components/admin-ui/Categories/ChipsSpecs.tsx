import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface ChipsSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const ChipsSpecs: React.FC<ChipsSpecsProps> = ({
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
  const chipFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Type",
    "Chipset Manufacturer",
    "Architecture",
    "Processor Cores",
    "Clock Speed",
    "Manufacturing Process",
    "Graphics Processing Unit (GPU)",
    "GPU Cores",
    "Memory Type",
    "Memory Size",
    "Max Memory Speed",
    "Cache",
    "Socket Type",
    "TDP (Thermal Design Power)",
    "Integrated Wi-Fi (Yes/No)",
    "Integrated Bluetooth (Yes/No)",
    "Integrated Graphics (Yes/No)",
    "Virtualization Support (Yes/No)",
    "Operating Temperature",
    "Dimensions",
    "Country of Origin",
    "Certifications",
    "Package Contents",
    "Manufacturer's Warranty - Parts",
    "Manufacturer's Warranty - Labour",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Chip Specifications</h2>
      <div className={containerDisplay}>
        {chipFields.map((field, index) => (
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
