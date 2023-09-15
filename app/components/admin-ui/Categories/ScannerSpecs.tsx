import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface ScannerSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const ScannerSpecs: React.FC<ScannerSpecsProps> = ({
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
  const scannerFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Scanner Type",
    "Scanner Technology",
    "Optical Resolution",
    "Maximum Scan Size",
    "Color Depth",
    "Scan Speed (Black & White)",
    "Scan Speed (Color)",
    "Document Feeder (Yes/No)",
    "ADF Capacity",
    "Duplex Scanning (Yes/No)",
    "Film Scanning (Yes/No)",
    "Transparency Adapter (Yes/No)",
    "Interface",
    "Operating Systems Supported",
    "Compatible Media Types",
    "Supported File Formats",
    "Power Source",
    "Power Consumption",
    "Dimensions (Height, Width, Depth)",
    "Weight",
    "Color Options",
    "Compatibility",
    "Warranty Information",
    "Additional Features",
    "Manufacturer Website",
    "Product Manual",
    "Operating Temperature",
    "Operating Humidity",
    "Maximum Paper Size (ADF)",
    "Minimum Paper Size (ADF)",
    "ADF Paper Weight Range",
    "ADF Paper Types Supported",
    "ADF Scanning Speed (Black & White)",
    "ADF Scanning Speed (Color)",
    "ADF Scanning Capacity (Sheets)",
    "ADF Scanning Maximum Paper Thickness",
    "ADF Scanning Maximum Paper Length",
    "ADF Scanning Maximum Paper Width",
    "ADF Scanning Maximum Scan Size (Width x Length)",
    "ADF Scanning Supported File Formats",
    "ADF Scanning Color Depth",
    "ADF Scanning Scan-to-Email Functionality (Yes/No)",
    "ADF Scanning Scan-to-PDF Functionality (Yes/No)",
    "ADF Scanning Scan-to-Word Functionality (Yes/No)",
    "ADF Scanning Scan-to-Excel Functionality (Yes/No)",
    "ADF Scanning Scan-to-Image Functionality (Yes/No)",
    "ADF Scanning Scan-to-Cloud Functionality (Yes/No)",
    "ADF Scanning Scan-to-USB Functionality (Yes/No)",
    "ADF Scanning Automatic Color Detection (Yes/No)",
    "ADF Scanning Auto-Duplexing (Yes/No)",
    "ADF Scanning Ultrasonic Multi-Feed Detection (Yes/No)",
    "ADF Scanning Blank Page Removal (Yes/No)",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Scanner Specifications</h2>
      <div className={containerDisplay}>
        {scannerFields.map((field, index) => (
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
