import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface ModemSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const ModemSpecs: React.FC<ModemSpecsProps> = ({
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
  const modemFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Compatible Internet Providers",
    "DOCSIS Version",
    "Maximum Download Speed",
    "Maximum Upload Speed",
    "Number of Ethernet Ports",
    "Voice Support (Yes/No)",
    "IPv6 Support (Yes/No)",
    "Built-in Wi-Fi (Yes/No)",
    "Wi-Fi Standard",
    "Wi-Fi Speed",
    "Number of Wi-Fi Bands",
    "Wi-Fi Range",
    "Number of Antennas",
    "Guest Network (Yes/No)",
    "Parental Controls (Yes/No)",
    "Security Features",
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
      <h2 className="mb-4">Modem Specifications</h2>
      <div className={containerDisplay}>
        {modemFields.map((field, index) => (
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
