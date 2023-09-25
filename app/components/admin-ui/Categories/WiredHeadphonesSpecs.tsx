import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, SpecsProps } from "@/types";

export interface WiredHeadphonesSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: SpecsProps) => void;
}

export const WiredHeadphonesSpecs: React.FC<WiredHeadphonesSpecsProps> = ({
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

  const wiredHeadphonesFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Driver Size",
    "Driver Type",
    "Frequency Response",
    "Impedance",
    "Sensitivity",
    "Total Harmonic Distortion (THD)",
    "Maximum Input Power",
    "Channels",
    "Acoustic Design",
    "Noise Cancellation (Yes/No)",
    "Noise Isolation (Yes/No)",
    "In-line Control (Yes/No)",
    "Built-in Mic (Yes/No)",
    "Volume Control (Yes/No)",
    "Mute Function (Yes/No)",
    "Cable Length",
    "Cable Type",
    "Cable Detachable (Yes/No)",
    "Plug Type",
    "Plug Material",
    "Adapter Included (Yes/No)",
    "Earcup Design",
    "Earcup Material",
    "Headband Material",
    "Ear Cushion Material",
    "Foldable Design (Yes/No)",
    "Swivel Earcups (Yes/No)",
    "Retractable Mic (Yes/No)",
    "Open-back/Closed-back",
    "Weight",
    "Dimensions",
    "Color",
    "Water Resistance Rating",
    "Carrying Case Included (Yes/No)",
    "Extra Earpads Included (Yes/No)",
    "Connectivity",
    "Manufacturer's Warranty - Parts",
    "Manufacturer's Warranty - Labour",
    "Country of Origin",
    "Certifications",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Wired Headphones Specifications</h2>
      <div className={containerDisplay}>
        {wiredHeadphonesFields.map((field, index) => (
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
