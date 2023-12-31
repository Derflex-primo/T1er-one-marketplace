import React from "react";
import { inputUi } from "../AddProducts";
import { containerDisplay } from "../SpecsCategories";
import { ItemSpecsRefProps, SpecsProps } from "@/types";

export interface CordsSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: SpecsProps) => void;
}

export const CordsSpecs: React.FC<CordsSpecsProps> = ({ specs, onSpecsChange }) => {
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
  const cordFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Length",
    "Color",
    "Connector Type",
    "Connector Material",
    "Cable Type",
    "Shielding (Yes/No)",
    "Flexible (Yes/No)",
    "Tangle-Free (Yes/No)",
    "Compatible Devices",
    "Warranty",
    "Cable Thickness",
    "Jacket Material",
    "Conductor Material",
    "Connector Gender",
    "Connector Plating",
    "Temperature Rating",
    "Voltage Rating",
    "Current Rating",
    "Certification (Yes/No)",
    "RoHS Compliance (Yes/No)",
    "UL Certification (Yes/No)",
    "CE Certification (Yes/No)",
    "Packaging Contents",
    "Country of Origin",
    "Manufacturer's Warranty - Parts",
    "Manufacturer's Warranty - Labour",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Cord Specifications</h2>
      <div className={containerDisplay}>
        {cordFields.map((field, index) => (
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
