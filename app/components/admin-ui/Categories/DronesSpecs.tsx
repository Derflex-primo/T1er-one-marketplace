import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const DronesSpecs = () => {
  const droneSpecifications = [
    "Model",
    "Brand",
    "Type",
    "Weight",
    "Maximum Flight Time",
    "Maximum Speed",
    "Operating Range",
    "Camera Resolution",
    "Video Resolution",
    "Gimbal Stabilization",
    "GPS",
    "Battery Type",
    "Battery Life",
    "Charging Time",
    "Controller Type",
    "Controller Range",
    "Obstacle Avoidance System",
    "Return to Home (RTH) Function",
    "Follow Me Mode",
    "Live Streaming Capability",
    "App Compatibility",
    "Remote Control Frequency",
    "Dimensions (L x W x H)",
    "Foldable Design",
    "Remote Control Type",
    "Remote Control Frequency",
    "Max Ascent Speed",
    "Max Descent Speed",
    "Max Altitude",
    "Max Transmission Distance",
    "Wind Resistance",
    "Operating Temperature",
    "Storage Temperature",
    "Internal Storage",
    "MicroSD Card Slot",
    "Intelligent Flight Modes",
    "Camera Sensor Size",
    "Camera Lens Type",
    "Camera ISO Range",
    "Camera Shutter Speed",
    "Camera Field of View",
    "Storage Capacity",
    "Price",
    "Availability",
    "Warranty Information",
    "Manufacturer Website",
    "User Manual",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Drone Specifications</h2>
      <div className={containerDisplay}>
        {droneSpecifications.map((spec, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{spec}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
