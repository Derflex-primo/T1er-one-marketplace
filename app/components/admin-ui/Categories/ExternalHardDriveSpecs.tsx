import React from "react";
import { inputUi } from "../AddProducts";
import { containerDisplay } from "../SpecsCategories";

export const ExternalHardDriveSpecs = () => {
  const externalHardDriveFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Capacity",
    "Interface",
    "Transfer Speed",
    "Rotation Speed",
    "Power Source",
    "Dimensions (Height, Width, Depth)",
    "Weight",
    "Color Options",
    "Compatibility",
    "Included Cables",
    "Warranty Information",
    "Additional Features",
    "Manufacturer Website",
    "Product Manual",
    "Encryption (Yes/No)",
    "Shock Resistance (Yes/No)",
    "Operating Temperature",
    "Storage Media",
    "Backup Software Included (Yes/No)",
    "Data Encryption Method",
    "File System Format",
    "Platform Compatibility",
    "External Power Adapter (Yes/No)",
    "Security Slot",
    "Drive Type",
    "Spindle Speed (RPM)",
    "Noise Level",
    "Operating System Compatibility",
    "Data Transfer Rate",
    "System Requirements",
    "Dimensions (With Packaging)",
    "Weight (With Packaging)",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">External Hard Drive Specifications</h2>
      <div className={containerDisplay}>
        {externalHardDriveFields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
