import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const DIYElectronicsSpecs = () => {
  const diyElectronicsFields = [
    "Component Type",
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Voltage Rating",
    "Current Rating",
    "Resistance",
    "Capacitance",
    "Inductance",
    "Operating Temperature Range",
    "Tolerance",
    "Package Type",
    "Dimensions (L x W x H)",
    "Weight",
    "Datasheet",
    "Price",
    "Availability",
    "Warranty Information",
    "Manufacturer Website",
    "Product Manual",
    "Application Notes",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">DIY Electronics Specifications</h2>
      <div className={containerDisplay}>
        {diyElectronicsFields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
