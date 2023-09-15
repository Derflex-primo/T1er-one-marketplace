import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface EReadersSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const EReadersSpecs: React.FC<EReadersSpecsProps> = ({
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

  const eReaderSpecifications = [
    "Brand",
    "Model",
    "Screen Size",
    "Screen Type",
    "Screen Resolution",
    "E-Ink Technology",
    "Backlight",
    "Touchscreen",
    "Battery Life (Reading Time)",
    "Charging Method",
    "Storage Capacity",
    "Supported File Formats",
    "Connectivity (Wi-Fi/Cellular)",
    "Built-in Cellular Connectivity",
    "Frontlight",
    "Color Temperature Adjustment",
    "Audio Playback",
    "Text-to-Speech",
    "Page Turn Buttons",
    "Waterproof Rating",
    "Dimensions (L x W x H)",
    "Weight",
    "Operating System",
    "Processor",
    "RAM",
    "Storage Expansion",
    "Library Compatibility",
    "Supported Languages",
    "Annotations and Highlighting",
    "Bookstore Compatibility",
    "Price",
    "Availability",
    "Warranty Information",
    "Manufacturer Website",
    "User Manual",
    "Color Options",
    "Built-in Storage Type (e.g., eMMC)",
    "Page Turn Speed",
    "Note-Taking Features",
    "Reading Apps Compatibility",
    "Cloud Storage",
    "Accessories Included",
    "Bluetooth Connectivity",
    "Book Borrowing and Lending",
    "Text Formatting Options",
    "Dictionary and Wikipedia Integration",
    "Social Media Sharing",
    "Book Recommendations",
    "Reading Statistics Tracking",
    "Ad-Supported or Ad-Free",
    "App Store Access",
    "Operating Temperature Range",
    "Audio Jack",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">E-Reader Specifications</h2>
      <div className={containerDisplay}>
        {eReaderSpecifications.map((spec, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{spec}:</label>
            <input
              type="text"
              name={spec}
              value={specs[spec] || ""}
              onChange={handleInputChange}
              className={inputUi}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
