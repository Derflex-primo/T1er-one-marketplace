import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface SoftwareSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const SoftwareSpecs: React.FC<SoftwareSpecsProps> = ({
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
  const softwareFields = [
    "Software Name",
    "Version",
    "License Type",
    "Platform Compatibility",
    "Supported Operating Systems",
    "System Requirements",
    "Installation Method",
    "Language Support",
    "User Interface",
    "Features",
    "Release Date",
    "Manufacturer Website",
    "Product Manual",
    "Pricing",
    "Updates and Maintenance",
    "Technical Support",
    "Security Features",
    "File Format Support",
    "Integration with Other Software",
    "User Reviews and Ratings",
    "Third-Party Add-Ons",
    "Data Privacy and Compliance",
    "Data Backup and Recovery",
    "User Licensing Options",
    "Training and Tutorials",
    "Customization Options",
    "Cloud Integration (Yes/No)",
    "Free Trial (Yes/No)",
    "Subscription Plans",
    "One-Time Purchase Option (Yes/No)",
    "Multi-User License (Yes/No)",
    "Mobile App Availability (Yes/No)",
    "Software Documentation",
    "Customer Support Channels",
    "Software Updates Frequency",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Software Specifications</h2>
      <div className={containerDisplay}>
        {softwareFields.map((field, index) => (
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
