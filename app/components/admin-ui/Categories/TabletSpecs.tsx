import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface TabletSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const TabletSpecs: React.FC<TabletSpecsProps> = ({
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
  const tabletFields = [
    "Brand",
    "Model",
    "Product Condition",
    "Brand New (Yes/No)",
    "Operating System",
    "Screen Size",
    "Screen Resolution",
    "Processor",
    "Processor Speed",
    "RAM (Memory)",
    "Storage Capacity",
    "Expandable Storage (Yes/No)",
    "Front Camera",
    "Rear Camera",
    "Battery Capacity",
    "Battery Life",
    "Wireless Connectivity (Wi-Fi)",
    "Bluetooth",
    "Ports and Slots",
    "Dimensions (Height, Width, Depth)",
    "Weight",
    "Color Options",
    "Accessories Included",
    "Warranty Information",
    "Additional Features",
    "Display Type",
    "Touchscreen (Yes/No)",
    "Graphics Chip",
    "Graphics Memory",
    "SIM Card Slot (Yes/No)",
    "SIM Card Type",
    "Network Compatibility",
    "GPS (Yes/No)",
    "Sensors",
    "Audio Features",
    "Video Playback",
    "Document Viewer",
    "Supported File Formats",
    "In the Box",
    "Manufacturer Website",
    "Product Manual",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Tablet Specifications</h2>
      <div className={containerDisplay}>
        {tabletFields.map((field, index) => (
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
