import React from "react";
import { inputUi } from "../AddProducts";
import { containerDisplay } from "../SpecsCategories";

export const CordsSpecs = () => {
  const cordFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Length",
    "Color",
    "Connector Type",
    "Connector Material",
    "Cable Type",
    "Shielding (Yes/No)",
    "Flexible (Yes/No)",
    "Tangle-Free (Yes/No)",
    "Compatible Devices",
    "Warranty",
    "Cable Thickness",
    "Jacket Material",
    "Conductor Material",
    "Connector Gender",
    "Connector Plating",
    "Temperature Rating",
    "Voltage Rating",
    "Current Rating",
    "Certification (Yes/No)",
    "RoHS Compliance (Yes/No)",
    "UL Certification (Yes/No)",
    "CE Certification (Yes/No)",
    "Packaging Contents",
    "Country of Origin",
    "Manufacturer's Warranty - Parts",
    "Manufacturer's Warranty - Labour",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Cord Specifications</h2>
      <div className={containerDisplay}>
        {cordFields.sort().map((field, index) => (
          <div className={"flex flex-col mb-4"} key={index}>
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
