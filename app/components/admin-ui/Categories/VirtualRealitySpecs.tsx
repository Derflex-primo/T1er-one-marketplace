import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface VirtualRealitySpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const VirtualRealitySpecs: React.FC<VirtualRealitySpecsProps> = ({
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
  const vrHeadsetSpecifications = [
    "Brand",
    "Model",
    "Type",
    "Display Resolution",
    "Field of View (FOV)",
    "Refresh Rate",
    "Tracking Sensors",
    "Tracking Area",
    "Audio Output",
    "Connectivity",
    "Controller Type",
    "Platform Compatibility",
    "Weight",
    "Built-in Mic",
    "Adjustable Straps",
    "Built-in Speakers",
    "Interpupillary Distance (IPD) Adjustment",
    "Lens Type",
    "Headset Tracking",
    "Controller Tracking",
    "Battery Life",
    "Charging Time",
    "Included Accessories",
    "Price",
    "Availability",
    "Warranty Information",
    "Manufacturer Website",
    "User Manual",
    "Additional Features",
    "Supported Games/Apps",
    "Minimum System Requirements",
    "Dimensions (L x W x H)",
    "Weight with Accessories",
    "Audio Passthrough",
    "Microphone Type",
    "Eye Relief Adjustment",
    "IPD Range",
    "Sweat-Resistant Design",
    "Headband Type",
    "Lens Adjustment",
    "Audio Jack",
    "Sensor Types",
    "Hand Tracking",
    "Eye Tracking",
    "Controller Battery Life",
    "Gesture Control",
    "Content Store",
    "Health and Safety Features",
    "Field of View Adjustment",
    "Cross-Platform Play",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Virtual Reality Headset Specifications</h2>
      <div className={containerDisplay}>
        {vrHeadsetSpecifications.map((spec, index) => (
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
