import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, SpecsProps } from "@/types";

export interface RouterSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: SpecsProps) => void;
}

export const RouterSpecs: React.FC<RouterSpecsProps> = ({
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
  const routerFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Wireless Standard",
    "Wireless Frequency Bands",
    "Wireless Data Transfer Rates",
    "Wireless Range",
    "Number of Antennas",
    "Number of LAN Ports",
    "Number of WAN Ports",
    "Ethernet Speed",
    "USB Ports",
    "Quality of Service (QoS)",
    "Security Features",
    "Guest Network (Yes/No)",
    "Parental Controls (Yes/No)",
    "VPN Support (Yes/No)",
    "MU-MIMO (Yes/No)",
    "Beamforming (Yes/No)",
    "IPv6 Support (Yes/No)",
    "Voice Assistant Compatibility",
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
    "Operating Temperature",
    "Operating Humidity",
    "Package Contents",
    "Package Dimensions",
    "Package Weight",
    "Environmental Compliance",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Router Specifications</h2>
      <div className={containerDisplay}>
        {routerFields.map((field, index) => (
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
