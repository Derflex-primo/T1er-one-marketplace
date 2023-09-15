import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface ProjectorsSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const ProjectorsSpecs: React.FC<ProjectorsSpecsProps> = ({
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
  const projectorSpecifications = [
    "Brand",
    "Model",
    "Display Technology",
    "Native Resolution",
    "Brightness (Lumens)",
    "Contrast Ratio",
    "Throw Ratio",
    "Projection Distance",
    "Screen Size (Diagonal)",
    "Aspect Ratio",
    "Lamp Life (Normal/Eco Mode)",
    "Keystone Correction",
    "Lens Type",
    "Zoom Ratio",
    "Projection Method",
    "Ceiling Mountable",
    "3D Capable",
    "Built-in Speaker",
    "Audio Output",
    "Input Ports (HDMI, VGA, etc.)",
    "Output Ports (Audio Out, etc.)",
    "Wireless Connectivity",
    "Smart Features (if applicable)",
    "Remote Control Included",
    "Operating Noise Level (dB)",
    "Power Consumption",
    "Dimensions (L x W x H)",
    "Weight",
    "Supported Video Resolutions",
    "Supported Image Formats",
    "Supported Audio Formats",
    "Built-in Storage",
    "Projection Screen Compatibility",
    "Built-in Apps (if applicable)",
    "Projection Technology (DLP, LCD, LCoS, etc.)",
    "Lens Shift (if applicable)",
    "Color Reproduction",
    "Input Lag (if applicable)",
    "Throw Distance Calculator (if available)",
    "Wireless Screen Mirroring (e.g., Miracast)",
    "Interactive Features (if applicable)",
    "Focus Adjustment",
    "Remote Control Type",
    "Price",
    "Availability",
    "Warranty Information",
    "Manufacturer Website",
    "User Manual",
    "Color Options (if available)",
    "Projection Method (Front, Rear, Ceiling)",
    "Aspect Ratio Compatibility",
    "Built-in Storage Capacity",
    "Noise Level (dB)",
    "Mounting Options",
    "Lens Zoom Type",
    "Operating Temperature Range",
    "Fan Noise Level (dB)",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Projector Specifications</h2>
      <div className={containerDisplay}>
        {projectorSpecifications.map((spec, index) => (
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
