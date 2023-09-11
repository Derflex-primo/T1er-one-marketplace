import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const AccessoriesSpecs = () => {
  const accessoriesFields = [
    "Brand",
    "Model Number",
    "Product Condition",
    "Brand New (Yes/No)",
    "Type",
    "Color",
    "Material",
    "Compatibility",
    "Warranty",
    "Dimensions",
    "Weight",
    "Country of Origin",
    "Certifications",
    "Package Contents",
    "Manufacturer's Warranty - Parts",
    "Manufacturer's Warranty - Labour",
    "Additional Features",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Accessories Specifications</h2>
      <div className={containerDisplay}>
        {accessoriesFields.sort().map((field, index) => (
          <div className={"flex flex-col mb-4"} key={index}>
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
