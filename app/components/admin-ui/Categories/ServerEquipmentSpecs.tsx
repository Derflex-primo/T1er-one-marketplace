import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const ServerEquipmentSpecs = () => {
  const serverEquipmentFields = [
    "Equipment Type",
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Form Factor",
    "Rack Units (U)",
    "Processor Type",
    "Processor Speed",
    "Number of Processors",
    "Processor Cores",
    "Memory (RAM) Size",
    "Memory Type",
    "Storage Type",
    "Storage Capacity",
    "Network Interfaces",
    "Ethernet Ports",
    "Expansion Slots",
    "RAID Support (Yes/No)",
    "Power Supply Type",
    "Redundant Power Supplies (Yes/No)",
    "Operating System Compatibility",
    "Management Interface",
    "Built-in KVM (Yes/No)",
    "Dimensions (Height x Width x Depth)",
    "Weight",
    "Mounting Kit Included (Yes/No)",
    "Warranty Information",
    "Manufacturer Website",
    "Product Manual",
    "Price",
    "Availability",
    "Service and Support",
    "Environmental Compliance",
    "Certifications",
    "Security Features",
    "Remote Management",
    "Scalability",
    "Cooling System",
    "Operating Temperature",
    "Operating Humidity",
    "Front Panel Ports",
    "Rear Panel Ports",
    "Chassis Material",
    "Chassis Color",
    "Package Contents",
    "User Manual",
    "Installation Guide",
    "Rack Rails Included (Yes/No)",
    "Server Management Software Included (Yes/No)",
    "Chassis Lock (Yes/No)",
    "Hot-Swap Bays (Yes/No)",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Server Equipment Specifications</h2>
      <div className={containerDisplay}>
        {serverEquipmentFields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
 
