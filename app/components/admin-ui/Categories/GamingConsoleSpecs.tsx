import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const GamingConsoleSpecs = () => {
  const gamingConsoleFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Console Type",
    "CPU",
    "GPU",
    "Memory",
    "Storage Capacity",
    "Optical Drive",
    "Resolution Support",
    "Audio Output",
    "Wireless Connectivity",
    "Wired Connectivity",
    "Ports",
    "Controller Type",
    "Game Library",
    "Online Services",
    "Streaming Support",
    "Backward Compatibility (Yes/No)",
    "Dimensions (Height x Width x Depth)",
    "Weight",
    "Color Options",
    "Power Source",
    "Power Consumption",
    "Operating Temperature",
    "Operating Humidity",
    "Warranty Information",
    "Additional Features",
    "Manufacturer Website",
    "Product Manual",
    "Wi-Fi (Yes/No)",
    "Bluetooth (Yes/No)",
    "Virtual Reality (VR) Support (Yes/No)",
    "4K Gaming Support (Yes/No)",
    "HDR Support (Yes/No)",
    "USB Ports",
    "Ethernet Port (Yes/No)",
    "HDMI Port (Yes/No)",
    "Controller Included (Yes/No)",
    "Controller Battery Life",
    "Built-in Storage Type",
    "External Storage Support (Yes/No)",
    "External Storage Compatibility",
    "Online Multiplayer Support (Yes/No)",
    "Local Multiplayer Support (Yes/No)",
    "Cloud Gaming Service (Yes/No)",
    "Voice Assistant Compatibility (Yes/No)",
    "Voice Chat Support (Yes/No)",
    "Cross-Platform Play Support (Yes/No)",
    "Digital Game Store (Yes/No)",
    "Subscription Service (Yes/No)",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Gaming Console Specifications</h2>
      <div className={containerDisplay}>
        {gamingConsoleFields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
