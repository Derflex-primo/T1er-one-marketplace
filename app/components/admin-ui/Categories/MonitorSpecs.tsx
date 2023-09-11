import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const MonitorSpecs = () => {
  const monitorFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Screen Size",
    "Screen Type",
    "Panel Technology",
    "Resolution",
    "Aspect Ratio",
    "Refresh Rate",
    "Response Time",
    "Brightness",
    "Contrast Ratio",
    "Viewing Angles",
    "Color Support",
    "Backlight Technology",
    "Flicker-Free Technology (Yes/No)",
    "Adaptive Sync (Yes/No)",
    "Connectivity Ports",
    "USB Ports",
    "Audio Output",
    "VESA Mount Compatibility (Yes/No)",
    "Adjustable Stand (Yes/No)",
    "Tilt Adjustment",
    "Swivel Adjustment",
    "Height Adjustment",
    "Pivot Adjustment (Portrait Mode)",
    "Dimensions (Height, Width, Depth)",
    "Weight",
    "Color Options",
    "Power Consumption",
    "Energy Star Certified (Yes/No)",
    "Warranty Information",
    "Additional Features",
    "Manufacturer Website",
    "Product Manual",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Monitor Specifications</h2>
      <div className={containerDisplay}>
        {monitorFields.map((field, index) => (
          <div className={"flex flex-col mb-4"} key={index}>
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
