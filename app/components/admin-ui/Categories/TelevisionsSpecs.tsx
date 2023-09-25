import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, SpecsProps } from "@/types";

export interface TelevisionsSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: SpecsProps) => void;
}

export const TelevisionsSpecs: React.FC<TelevisionsSpecsProps> = ({
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
  const televisionSpecifications = [
    "Brand",
    "Model",
    "Screen Size",
    "Display Technology",
    "Resolution",
    "HDR Support",
    "Refresh Rate",
    "Smart TV Features",
    "Processor",
    "Operating System",
    "Built-in Apps",
    "Audio System",
    "HDMI Ports",
    "USB Ports",
    "Ethernet Port",
    "Wireless Connectivity",
    "Bluetooth Version",
    "Voice Assistant Compatibility",
    "Remote Control Type",
    "Wall Mountable",
    "VESA Mount Pattern",
    "Dimensions (With Stand)",
    "Weight (With Stand)",
    "Dimensions (Without Stand)",
    "Weight (Without Stand)",
    "Stand Included",
    "Energy Efficiency Rating",
    "Power Consumption (On/Standby)",
    "Warranty Information",
    "Manufacturer Website",
    "User Manual",
    "Color Options (if available)",
    "Price",
    "Availability",
    "Screen Technology (LED, OLED, QLED, etc.)",
    "Aspect Ratio",
    "Viewing Angle",
    "Panel Type (IPS, VA, etc.)",
    "Local Dimming Zones (if applicable)",
    "Color Reproduction",
    "Audio Output Power",
    "Audio Formats Supported",
    "Video Formats Supported",
    "Internet Connectivity",
    "Remote Control Features (Voice, Motion, etc.)",
    "Cable Management",
    "HDR Formats Supported (e.g., HDR10, Dolby Vision)",
    "Gaming Mode/Low Input Lag (if applicable)",
    "Screen Mirroring Capabilities",
    "Built-in Camera (if applicable)",
    "Built-in Microphone (if applicable)",
    "Curved/Flat Screen",
    "Parental Controls",
    "Multiple Viewing Modes (e.g., Movie, Gaming, Sports)",
    "Smart Home Integration (e.g., Alexa, Google Assistant)",
    "Digital Tuner (e.g., ATSC, DVB-T2)",
    "3D Support (if applicable)",
    "Audio Output Ports (e.g., Optical, Headphone)",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Television Specifications</h2>
      <div className={containerDisplay}>
        {televisionSpecifications.map((spec, index) => (
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
