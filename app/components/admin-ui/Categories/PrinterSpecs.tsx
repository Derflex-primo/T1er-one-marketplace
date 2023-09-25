import React from "react";
import { inputUi } from "../AddProducts";
import { containerDisplay } from "../SpecsCategories";
import { ItemSpecsRefProps, SpecsProps } from "@/types";

export interface PrinterSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: SpecsProps) => void;
}

export const PrinterSpecs: React.FC<PrinterSpecsProps> = ({
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
  const printerFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Printer Type",
    "Printing Technology",
    "Print Speed (Black & White)",
    "Print Speed (Color)",
    "Maximum Print Resolution",
    "Duplex Printing (Yes/No)",
    "Paper Size Support",
    "Paper Tray Capacity",
    "Input Interfaces",
    "Mobile Printing (Yes/No)",
    "Network Ready (Yes/No)",
    "Wireless Printing (Yes/No)",
    "Scanner (Yes/No)",
    "Scanner Type",
    "Scanner Maximum Resolution",
    "Copier (Yes/No)",
    "Copier Speed",
    "Fax (Yes/No)",
    "Fax Speed",
    "Automatic Document Feeder (Yes/No)",
    "Touchscreen Display (Yes/No)",
    "Dimensions (Height, Width, Depth)",
    "Weight",
    "Color Options",
    "Compatibility",
    "Warranty Information",
    "Additional Features",
    "Manufacturer Website",
    "Product Manual",
    "Power Source",
    "Power Consumption",
    "Package Contents",
    "Package Dimensions",
    "Package Weight",
    "Environmental Compliance",
    "Print Resolution (Black & White)",
    "Print Resolution (Color)",
    "Duty Cycle",
    "Operating Temperature",
    "Operating Humidity",
    "Print Language",
    "Maximum Paper Thickness",
    "Media Types Supported",
    "Mobile App Compatibility",
    "Memory (RAM)",
    "Processor",
    "Standard Connectivity",
    "Software Included",
    "Printer Language Simulation",
    "Display Size",
    "Monthly Duty Cycle (Max)",
    "Recommended Monthly Volume",
    "Print Margin Bottom (A4)",
    "Print Margin Left (A4)",
    "Print Margin Right (A4)",
    "Print Margin Top (A4)",
    "Maximum Copies",
    "Automatic Redial",
    "Fax Forwarding (Yes/No)",
    "Fax Delayed Sending (Yes/No)",
    "Fax Dual Access (Yes/No)",
    "Fax Polling (Yes/No)",
    "Fax Speed Dialing",
    "Maximum Transmission Speed",
    "Fax Broadcasting (Yes/No)",
    "Broadcast Transmission (Max Locations)",
    "Delayed Transmission",
    "Error Correction Mode (ECM)",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Printer Specifications</h2>
      <div className={containerDisplay}>
        {printerFields.map((field, index) => (
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
