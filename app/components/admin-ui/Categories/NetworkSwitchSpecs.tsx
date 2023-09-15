import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface NetworkSwitchSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const NetworkSwitchSpecs: React.FC<NetworkSwitchSpecsProps> = ({
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
  const switchFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Number of Ports",
    "Port Speed",
    "Power Over Ethernet (PoE) Support (Yes/No)",
    "Layer Support",
    "Managed or Unmanaged",
    "Rack-Mountable (Yes/No)",
    "Managed Features",
    "VLAN Support (Yes/No)",
    "QoS Support (Yes/No)",
    "Jumbo Frame Support (Yes/No)",
    "Network Management Protocol",
    "MAC Address Table Size",
    "Buffer Size",
    "Operating Temperature",
    "Operating Humidity",
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
    "RJ45 Ports",
    "SFP Ports",
    "SFP+ Ports",
    "PoE Ports",
    "PoE+ Ports",
    "PoE Budget",
    "Backplane Bandwidth",
    "Forwarding Rate",
    "Security Protocols",
    "Redundancy Features",
    "VLAN Modes",
    "Routing Features",
    "Access Control Lists (ACLs)",
    "Quality of Service (QoS) Features",
    "Link Aggregation (LAG) Support",
    "Stacking Capability (Yes/No)",
    "Stacking Ports",
    "Stacking Bandwidth",
    "IPv4/IPv6 Support (Yes/No)",
    "Energy-Efficient Ethernet (EEE) Support (Yes/No)",
    "Management Interfaces",
    "Firmware Upgrade Method",
    "SNMP Support (Yes/No)",
    "Warranty Duration",
    "Manufacturer Support Contact",
    "Certifications",
    "Mounting Options",
    "Package Contents",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Network Switch Specifications</h2>
      <div className={containerDisplay}>
        {switchFields.map((field, index) => (
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
