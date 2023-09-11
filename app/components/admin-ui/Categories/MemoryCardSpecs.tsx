import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const MemoryCardSpecs = () => {
  const memoryCardFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Capacity",
    "Card Type",
    "Speed Class",
    "Read Speed",
    "Write Speed",
    "UHS Speed Class (If Applicable)",
    "Video Speed Class (If Applicable)",
    "Operating Temperature",
    "Storage Media",
    "File System Format",
    "Dimensions (Height, Width, Depth)",
    "Weight",
    "Color Options",
    "Compatibility",
    "Warranty Information",
    "Additional Features",
    "Manufacturer Website",
    "Product Manual",
    "Shockproof (Yes/No)",
    "Waterproof (Yes/No)",
    "X-ray Proof (Yes/No)",
    "Magnet-Proof (Yes/No)",
    "Temperature-Proof (Yes/No)",
    "Operating System Compatibility",
    "Transfer Speed (Interface Dependent)",
    "Write-Protect Switch (Yes/No)",
    "Error Correction (Yes/No)",
    "File Rescue Software (Yes/No)",
    "SecureWrite Technology (Yes/No)",
    "SD Card Association Logo (Yes/No)",
    "Packaging Contents",
    "Package Dimensions",
    "Package Weight",
    "Environmental Compliance",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Memory Card Specifications</h2>
      <div className={containerDisplay}>
        {memoryCardFields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
